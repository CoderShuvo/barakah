async function createAdmin() {
  const email = 'admin@barakahagency.com'
  const password = 'BarakahAdmin2026!'
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log(`Attempting to create admin user: ${email}`)

  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'apikey': supabaseAnonKey!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        data: { is_admin: true }
      })
    })

    const text = await res.text()
    console.log('Status:', res.status)
    console.log('Response:', text)
  } catch (err: any) {
    console.error('Fetch error:', err.message)
  }
}

createAdmin()
