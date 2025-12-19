import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const DGR_GUILD_ID = process.env.DISCORD_GUILD_ID || '243941270467248129';

// Skip guild check for development or if user previously verified
const SKIP_GUILD_CHECK = process.env.SKIP_GUILD_CHECK === 'true';

interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated', isMember: false },
        { status: 401 }
      );
    }

    const discordUserId = user.user_metadata?.provider_id || user.id;
    const discordUsername = user.user_metadata?.full_name || user.user_metadata?.name || 'Unknown';
    const discordAvatar = user.user_metadata?.avatar_url || null;

    // Check if user already has an RSVP (previously verified member)
    const { data: existingRsvp } = await supabase
      .from('rsvp_responses')
      .select('id')
      .eq('discord_user_id', discordUserId)
      .single();

    // If user has existing RSVP, they're a verified member
    if (existingRsvp) {
      return NextResponse.json({
        isMember: true,
        guildName: 'DGR Gaming',
        user: {
          id: discordUserId,
          username: discordUsername,
          avatar: discordAvatar,
        },
      });
    }

    // Skip guild check if configured (useful for development/testing)
    if (SKIP_GUILD_CHECK) {
      console.log('Guild check skipped via SKIP_GUILD_CHECK env var');
      return NextResponse.json({
        isMember: true,
        guildName: 'DGR Gaming (check skipped)',
        user: {
          id: discordUserId,
          username: discordUsername,
          avatar: discordAvatar,
        },
      });
    }

    // Get the Discord provider token
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session?.provider_token) {
      console.log('No provider_token available - user may need to re-authenticate');
      // If no token but user is authenticated via Discord, trust them for this private event
      if (user.app_metadata?.provider === 'discord') {
        return NextResponse.json({
          isMember: true,
          guildName: 'DGR Gaming',
          user: {
            id: discordUserId,
            username: discordUsername,
            avatar: discordAvatar,
          },
        });
      }
      return NextResponse.json(
        { error: 'No Discord token available', isMember: false },
        { status: 401 }
      );
    }

    // Fetch user's guilds from Discord API
    const response = await fetch('https://discord.com/api/v10/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${session.provider_token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Discord API error:', response.status, errorText);

      // If rate limited or API error, trust Discord-authenticated users for this private event
      if (response.status === 429 || response.status >= 500) {
        if (user.app_metadata?.provider === 'discord') {
          console.log('Discord API unavailable, trusting Discord-authenticated user');
          return NextResponse.json({
            isMember: true,
            guildName: 'DGR Gaming',
            user: {
              id: discordUserId,
              username: discordUsername,
              avatar: discordAvatar,
            },
          });
        }
      }

      return NextResponse.json(
        { error: 'Failed to fetch Discord guilds', isMember: false },
        { status: 500 }
      );
    }

    const guilds: DiscordGuild[] = await response.json();
    const isMember = guilds.some((guild) => guild.id === DGR_GUILD_ID);

    // Get the DGR guild info if member
    const dgrGuild = guilds.find((guild) => guild.id === DGR_GUILD_ID);

    return NextResponse.json({
      isMember,
      guildName: dgrGuild?.name || null,
      user: {
        id: discordUserId,
        username: discordUsername,
        avatar: discordAvatar,
      },
    });
  } catch (error) {
    console.error('Error checking Discord membership:', error);
    return NextResponse.json(
      { error: 'Internal server error', isMember: false },
      { status: 500 }
    );
  }
}
