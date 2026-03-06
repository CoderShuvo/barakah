const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const [key, val] = line.split('=');
  if (key && val) acc[key] = val;
  return acc;
}, {});

const { createClient } = require('@supabase/supabase-js');
const adminClient = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY || ''
);
async function test() {
  const { data, error } = await adminClient.auth.admin.listUsers();
  console.log("Users in Auth:", data?.users?.map(u => u.email), error);
}
test();
