import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function seed() {
  console.log('Seeding database...')

  // Sign in as admin
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'admin@barakahagency.com',
    password: 'BarakahAdmin2026!'
  })

  if (error) {
    console.error('Login error:', error.message)
    // We cannot proceed without admin auth
  } else {
    console.log('Logged in successfully!')
  }

  // Seed Services
  const services = [
    {
      name: 'Brand Identity',
      slug: 'brand-identity',
      description: 'We craft authentic brand identities that resonate with your target audience.',
      icon: 'Palette',
      features: ['Logo Design', 'Typography', 'Color Palette', 'Brand Guidelines'],
      order_index: 1
    },
    {
      name: 'Web Development',
      slug: 'web-development',
      description: 'High-performance, accessible websites built with modern technologies.',
      icon: 'Code',
      features: ['Next.js / React', 'Responsive Design', 'SEO Optimization', 'Performance tuning'],
      order_index: 2
    }
  ]
  console.log('Inserting services...')
  const { error: sError } = await supabase.from('services').upsert(services, { onConflict: 'slug' })
  if (sError) console.error('Services error:', sError)
  else console.log('Services inserted!')

  // Seed Blogs
  const blogs = [
    {
      title: 'The Importance of Ethical Marketing',
      slug: 'importance-of-ethical-marketing',
      excerpt: 'Why transparency and honesty in marketing are more important than ever.',
      content: '<p>Ethical marketing is not just a buzzword; it is a fundamental shift in how businesses connect with their audiences. In an age of misinformation, transparency builds trust.</p><h2>What is Ethical Marketing?</h2><p>It involves prioritizing the customer\'s well-being over short-term profits. This means no deceptive advertising, clear pricing, and respecting user privacy.</p>',
      cover_image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop',
      category: 'Ethical Marketing',
      author_name: 'Barakah Team',
      tags: ['marketing', 'ethics', 'business'],
      published: true
    },
    {
      title: 'Building High-Performance Websites with Next.js',
      slug: 'high-performance-websites-nextjs',
      excerpt: 'Learn how we use Next.js to deliver blazing fast web experiences.',
      content: '<p>Next.js provides excellent developer experience and out-of-the-box performance optimizations.</p><h2>Server Components</h2><p>By default, components are rendered on the server, reducing the JavaScript bundle sent to the client.</p>',
      cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2940&auto=format&fit=crop',
      category: 'Web Development',
      author_name: 'Barakah Team',
      tags: ['tech', 'nextjs', 'performance'],
      published: true
    }
  ]
  console.log('Inserting blogs...')
  const { error: bError } = await supabase.from('blogs').upsert(blogs, { onConflict: 'slug' })
  if (bError) console.error('Blogs error:', bError)
  else console.log('Blogs inserted!')

  console.log('Seeding complete!')
}

seed()
