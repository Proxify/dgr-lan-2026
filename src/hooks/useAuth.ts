'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface DiscordMembershipStatus {
  isMember: boolean;
  isLoading: boolean;
  guildName: string | null;
  user: {
    id: string;
    username: string;
    avatar: string | null;
  } | null;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  discordStatus: DiscordMembershipStatus;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    discordStatus: {
      isMember: false,
      isLoading: false,
      guildName: null,
      user: null,
    },
  });

  const supabase = createClient();

  const checkDiscordMembership = useCallback(async () => {
    setAuthState((prev) => ({
      ...prev,
      discordStatus: { ...prev.discordStatus, isLoading: true },
    }));

    try {
      const response = await fetch('/api/discord/check-membership');
      const data = await response.json();

      setAuthState((prev) => ({
        ...prev,
        discordStatus: {
          isMember: data.isMember || false,
          isLoading: false,
          guildName: data.guildName || null,
          user: data.user || null,
        },
      }));
    } catch (error) {
      console.error('Error checking Discord membership:', error);
      setAuthState((prev) => ({
        ...prev,
        discordStatus: {
          isMember: false,
          isLoading: false,
          guildName: null,
          user: null,
        },
      }));
    }
  }, []);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error);
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      setAuthState((prev) => ({
        ...prev,
        session,
        user: session?.user ?? null,
        isLoading: false,
      }));

      if (session?.user) {
        checkDiscordMembership();
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState((prev) => ({
          ...prev,
          session,
          user: session?.user ?? null,
        }));

        if (session?.user) {
          checkDiscordMembership();
        } else {
          setAuthState((prev) => ({
            ...prev,
            discordStatus: {
              isMember: false,
              isLoading: false,
              guildName: null,
              user: null,
            },
          }));
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, checkDiscordMembership]);

  const signInWithDiscord = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'identify guilds',
      },
    });

    if (error) {
      console.error('Error signing in with Discord:', error);
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return {
    ...authState,
    signInWithDiscord,
    signOut,
    checkDiscordMembership,
  };
}
