
-- Drop all existing policies on profiles table to fix infinite recursion
DROP POLICY IF EXISTS "Admins can manage all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "profiles_select_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON profiles;

-- Create new, non-recursive policies for profiles table
-- Allow users to view their own profile
CREATE POLICY "profiles_own_select_policy" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "profiles_own_update_policy" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow admin user to manage all profiles (using direct email check to avoid recursion)
CREATE POLICY "profiles_admin_policy" ON profiles
  FOR ALL USING (
    auth.jwt() ->> 'email' = 'saketh1011@gmail.com'
  );

-- Create policy for new user creation during signup
CREATE POLICY "profiles_insert_policy" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
