import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { RSVPInsert } from '@/lib/supabase/database.types';

const DGR_GUILD_ID = process.env.DISCORD_GUILD_ID || '243941270467248129';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify Discord server membership
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.provider_token) {
      return NextResponse.json(
        { error: 'No Discord token available' },
        { status: 401 }
      );
    }

    const guildsResponse = await fetch('https://discord.com/api/v10/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${session.provider_token}`,
      },
    });

    if (!guildsResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to verify Discord membership' },
        { status: 500 }
      );
    }

    const guilds = await guildsResponse.json();
    const isMember = guilds.some((guild: { id: string }) => guild.id === DGR_GUILD_ID);

    if (!isMember) {
      return NextResponse.json(
        { error: 'You must be a member of the DGR Discord server to RSVP' },
        { status: 403 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { name, attending, arrivalTime, equipment, notes } = body;

    if (!name || !attending) {
      return NextResponse.json(
        { error: 'Name and attendance are required' },
        { status: 400 }
      );
    }

    const rsvpData: RSVPInsert = {
      discord_user_id: user.user_metadata?.provider_id || user.id,
      discord_username: user.user_metadata?.full_name || user.user_metadata?.name || 'Unknown',
      discord_avatar: user.user_metadata?.avatar_url || null,
      name,
      attending,
      arrival_time: arrivalTime || null,
      equipment: equipment || [],
      notes: notes || null,
    };

    // Upsert the RSVP response (update if exists, insert if not)
    const { data, error } = await supabase
      .from('rsvp_responses')
      .upsert(rsvpData, {
        onConflict: 'discord_user_id',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save RSVP' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get the user's existing RSVP
    const { data, error } = await supabase
      .from('rsvp_responses')
      .select('*')
      .eq('discord_user_id', user.user_metadata?.provider_id || user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "no rows returned" which is fine
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch RSVP' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || null });
  } catch (error) {
    console.error('Error fetching RSVP:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
