export const siteConfig = {
  name: "Barakah Agency",
  tagline: "Ethical Marketing Excellence",
  description:
    "Barakah Agency specializes in ethical, halal marketing strategies that drive growth with integrity.",
  url: "https://barakahagency.com",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/barakahagency",
    instagram: "https://instagram.com/barakahagency",
    linkedin: "https://linkedin.com/company/barakahagency",
  },
  contact: {
    email: "hello@barakahagency.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Street, Suite 100, New York, NY 10001",
  },
  navigation: [
    { name: "Why Barakah?", href: "/why-barakah" },
    {
      name: "The Barakah System",
      href: "/system",
      items: [
        { name: "The Barakah Method", href: "/the-barakah-method", description: "Our philosophy for building ethical, scalable, impact-driven growth systems." },
        { name: "The Barakah Ecosystem", href: "/the-barakah-ecosystem", description: "Specialized brands, each built to serve unique industries – all grounded in one shared vision." }
      ]
    },
    {
      name: "The Barakah Components",
      href: "/services",
      items: [
        { name: "Our Solutions", href: "/services", description: "Where strategy, technology, and trust converge to build systems that scale with purpose." },
        { name: "Branding & Identity", href: "/services/branding", description: "Define your brand with clarity and soul – from visuals to voice – rooted in strategy and culture." },
        { name: "ZeroFrame™ Intelligence", href: "/zero-frame", description: "Real-time targeting, visitor scoring, and dynamic personas so you market smarter, not louder." },
        { name: "Performance Marketing", href: "/services/performance-marketing", description: "Full-funnel campaigns that align ethical strategy with measurable growth – built to earn trust, not just clicks." }
      ]
    },
    { name: "Case Studies", href: "/case-studies" },
    {
      name: "Learn",
      href: "/blog",
      items: [
        { name: "Blog", href: "/blog", description: "Insights, strategies, and behind-the-scenes thinking to help you grow with purpose." },
        { 
          name: "Topical Libraries", 
          href: "/ethical-marketing-hub", 
          description: "Curated collections on the most important themes shaping ethical growth today.",
          subItems: [
            { 
              name: "Ethical Marketing", 
              href: "/ethical-marketing-hub", 
              description: "Deep dive into the principles and practices of ethical marketing." 
            }
          ]
        }
      ]
    },
  ],
  services: [
    {
      id: "branding",
      name: "Branding",
      description: "Build a powerful, authentic brand identity",
      href: "/services/branding",
    },
    {
      id: "performance-marketing",
      name: "Performance Marketing",
      description: "Data-driven campaigns that deliver results",
      href: "/services/performance-marketing",
    },
  ],
  footerLinks: [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/why-barakah" },
        { name: "Barakah Method", href: "/the-barakah-method" },
        { name: "Barakah Experience", href: "/the-barakah-ecosystem" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Branding", href: "/services/branding" },
        { name: "Performance Marketing", href: "/services/performance-marketing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Ethical Marketing Hub", href: "/ethical-marketing-hub" },
        { name: "Zero Frame", href: "/zero-frame" },
      ],
    },
  ],
}
