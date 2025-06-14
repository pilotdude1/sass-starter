-- Enable RLS
alter table auth.users enable row level security;

-- Profiles extend built-in auth.users
create table profiles (
  id uuid references auth.users(id),
  full_name text,
  avatar_url text,
  last_password_reset timestamptz default now(),
  primary key(id)
);
