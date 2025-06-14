-- Allow user to select their own profile
create policy "Select own profile"
  on profiles
  for select
  using ( auth.uid() = id );

-- Allow user to update password reset timestamp on their own record
create policy "Update own profile"
  on profiles
  for update
  using ( auth.uid() = id );
