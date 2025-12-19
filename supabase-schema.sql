-- Create the RSVP responses table
CREATE TABLE IF NOT EXISTS public.rsvp_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  discord_user_id TEXT NOT NULL UNIQUE,
  discord_username TEXT NOT NULL,
  discord_avatar TEXT,
  name TEXT NOT NULL,
  attending TEXT NOT NULL CHECK (attending IN ('yes', 'no', 'maybe')),
  arrival_time TEXT,
  equipment TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on discord_user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_rsvp_discord_user_id ON public.rsvp_responses(discord_user_id);

-- Enable Row Level Security
ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view all RSVPs (for displaying the squad list)
CREATE POLICY "Anyone can view RSVPs" ON public.rsvp_responses
  FOR SELECT USING (true);

-- Policy: Authenticated users can insert their own RSVP
CREATE POLICY "Users can insert own RSVP" ON public.rsvp_responses
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Policy: Users can update their own RSVP
CREATE POLICY "Users can update own RSVP" ON public.rsvp_responses
  FOR UPDATE USING (
    discord_user_id = (auth.jwt() -> 'user_metadata' ->> 'provider_id')::TEXT
    OR discord_user_id = auth.uid()::TEXT
  );

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to call the function on update
DROP TRIGGER IF EXISTS update_rsvp_responses_updated_at ON public.rsvp_responses;
CREATE TRIGGER update_rsvp_responses_updated_at
  BEFORE UPDATE ON public.rsvp_responses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
