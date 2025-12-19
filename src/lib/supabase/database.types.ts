export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      rsvp_responses: {
        Row: {
          id: string;
          discord_user_id: string;
          discord_username: string;
          discord_avatar: string | null;
          name: string;
          attending: 'yes' | 'no' | 'maybe';
          arrival_time: string | null;
          equipment: string[];
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          discord_user_id: string;
          discord_username: string;
          discord_avatar?: string | null;
          name: string;
          attending: 'yes' | 'no' | 'maybe';
          arrival_time?: string | null;
          equipment?: string[];
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          discord_user_id?: string;
          discord_username?: string;
          discord_avatar?: string | null;
          name?: string;
          attending?: 'yes' | 'no' | 'maybe';
          arrival_time?: string | null;
          equipment?: string[];
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type RSVPRow = Database['public']['Tables']['rsvp_responses']['Row'];
export type RSVPInsert = Database['public']['Tables']['rsvp_responses']['Insert'];
