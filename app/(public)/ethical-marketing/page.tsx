import type { Metadata } from "next";
import Link from "next/link";
import {
  EthicalMarketingHero,
  NewsletterSection,
  AuthorBio,
  NewsletterSidebarCard,
  TableOfContents,
  StarterPackCTA,
  EthicalMarketingInfographic,
  ContentBox,
  ExpertQuote,
  EditorialBanner,
  ConcentricInfographic,
  ReferencesList,
} from "@/components/blog";
import { Section } from "@/components/global";
import { Button } from "@/components/ui/button";
import { FinalCTASection } from "@/components/landing";

export const metadata: Metadata = {
  title: "Ethical Marketing Hub",
  description:
    "Free resources, guides, and insights on ethical marketing practices for purpose-driven brands.",
};

export default function EthicalMarketingHubPage() {
  return (
    <>
      <EthicalMarketingHero />

      <Section className="pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Sidebar - Left on mobile, stays sticky on desktop if possible */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="sticky top-24 space-y-12">
              <AuthorBio />
              <NewsletterSidebarCard />
            </div>
          </aside>

          {/* Main Content - Articles / Guide */}
          <div className="lg:col-span-8 space-y-16">
            {/* Intro Text */}
            <div className="prose prose-lg max-w-none text-[#5c4033] leading-relaxed space-y-8">
              <p>
                At the heart of any successful business lies a commitment to its
                community, its values, and its impact. Ethical marketing goes
                beyond merely promoting products or services; it is about
                fostering trust and building meaningful relationships that honor
                and uplift the essence of humanity. In today's world, where
                consumer trust is crucial, ethical marketing stands as a pillar
                of sustainable business practices, reflecting a{" "}
                <strong>
                  deeper commitment to preserving faith, life, family, wisdom,
                  and wealth.
                </strong>
              </p>
              <p>
                Ethical marketing is about more than just meeting regulatory
                standards. It's about doing right by your customers, your
                community, and your planet. It is rooted in the principles of
                transparency, honesty, and social responsibility, ensuring that
                every marketing action contributes positively to the greater
                good.
              </p>
            </div>

            <TableOfContents />

            <StarterPackCTA />

            {/* Section: Understanding the Real Meaning */}
            <div className="space-y-10" id="real-meaning">
              <h2 className="text-4xl md:text-5xl font-black text-[#3F1200]">
                Understanding The Real Meaning of Ethical Marketing
              </h2>
              <div className="prose prose-lg max-w-none text-[#5c4033] leading-relaxed space-y-6">
                <p>
                  To grasp the essence of ethical marketing, we must delve into
                  its true meaning and explore its roots and definitions.
                </p>

                <div className="space-y-4">
                  <p>
                    <strong>Ethical Marketing (noun):</strong> The practice of
                    promoting products or services in a way that aligns with
                    moral or values anchored in faith, ensuring honesty,
                    fairness, and social responsibility throughout the marketing
                    process.
                  </p>
                  <p>
                    <strong>To ethically market (verb):</strong> To execute
                    marketing activities that prioritize ethical considerations,
                    aiming to benefit society, respect consumer rights, and
                    promote integrity in business.
                  </p>
                  <p>
                    <strong>Ethicus (Latin origin):</strong> "Pertaining to
                    morals; relating to ethics or moral philosophy."
                  </p>
                </div>

                <p>Let's break this down further:</p>
              </div>

              <ContentBox variant="default">
                <div className="space-y-10">
                  {[
                    {
                      t: "Drive positive social impact",
                      d: "The primary goal of ethical marketing is not just to drive sales but to make a positive difference in society. This involves promoting products or services that are not only beneficial to the consumer but also contribute to the greater good. Ethical marketing ensures that every transaction enhances the well-being of the community, aligning with values such as the preservation of life and wisdom.",
                    },
                    {
                      t: "Define the target audience",
                      d: "Just like traditional marketing, ethical marketing begins with identifying the target audience. However, the emphasis here is on understanding the values and needs of these consumers. Ethical marketers seek to engage with those who prioritize social responsibility and sustainable practices, ensuring that the marketing message resonates with their ethical principles.",
                    },
                    {
                      t: "Provide valuable and honest information",
                      d: "Ethical marketing demands transparency. It involves providing accurate, truthful information about products and services, highlighting their benefits without exaggeration or deceit. This honesty builds trust and fosters a deeper connection with the audience, who are more likely to support brands that reflect their own ethical values.",
                    },
                    {
                      t: "Customers discovering your brand and product",
                      d: "After drawing the customer in with ethical messaging, it's crucial to help them understand why your product or service is the right choice. Effective ethical marketing not only addresses the consumer's needs but also demonstrates how the product contributes to a larger ethical goal. This creates a compelling narrative that encourages consumers to choose your brand not just for the product itself but for the positive impact it represents.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <h4 className="text-xl font-black text-[#00B4D8] flex gap-2">
                        <span className="">{i + 1}.</span>
                        {item.t}:
                      </h4>
                      <p className="text-[#5c4033] leading-relaxed pl-7">
                        {item.d}
                      </p>
                    </div>
                  ))}
                </div>
              </ContentBox>
            </div>

            {/* Section 1: What is Ethical Marketing */}
            <div className="space-y-10" id="what-is-ethical-marketing">
              <h2 className="text-4xl md:text-5xl font-black text-[#3F1200]">
                What Is Ethical Marketing?
              </h2>
              <div className="prose prose-lg max-w-none text-[#5c4033] leading-relaxed">
                <p>
                  Ethical marketing is a holistic approach that prioritizes
                  integrity, transparency, and respect in all marketing
                  practices. Unlike traditional marketing, which often focuses
                  solely on driving sales and maximizing profits, ethical
                  marketing aims to create long-term value for both businesses
                  and society. It embodies the values of{" "}
                  <strong>
                    preserving faith, life, family, wisdom, and wealth.
                  </strong>{" "}
                  By aligning business practices with ethical principles,
                  companies can build trust, foster loyalty, and contribute
                  positively to the world.
                </p>
              </div>

              <EthicalMarketingInfographic />

              {/* Definition Box */}
              <ContentBox title="Ethical Marketing Definition">
                <div className="prose prose-lg max-w-none text-[#5c4033] leading-relaxed">
                  <p className="font-bold text-[#00B4D8]">
                    Ethical marketing transcends mere legal compliance; it
                    reflects a dedication to doing what is right.
                  </p>
                  <p>
                    This approach emphasizes <strong>integrity</strong> by
                    upholding honesty and moral principles in all dealings, and{" "}
                    <strong>transparency</strong> by being open and clear about
                    business practices, product information, and marketing
                    messages. It also prioritizes <strong>respect</strong>,
                    valuing and honoring the dignity of all individuals and
                    communities, and <strong>sustainability</strong>, promoting
                    practices that protect and preserve the environment for
                    future generations. Additionally, it incorporates{" "}
                    <strong>social responsibility</strong>, contributing to the
                    well-being and improvement of society. This means making
                    decisions guided by a strong moral compass, even when it may
                    not be the most profitable route in the short term.
                  </p>
                </div>
              </ContentBox>

              <div className="prose prose-lg max-w-none text-[#5c4033] leading-relaxed">
                <p>
                  These concepts are commonly known as the marketing mix (the Ps
                  of marketing) and the AIDA model (attention, interest, desire,
                  action). However, ethical marketing integrates additional
                  principles that ensure all marketing practices are aligned
                  with moral values and social responsibility.
                </p>
                <p>
                  In practice, ethical marketing often primarily focuses on
                  creating{" "}
                  <strong>relevant, valuable content and experiences</strong> to
                  promote a business's products to its ideal target audience.
                  This means ensuring that all communications are truthful,
                  non-deceptive, and respectful of customer privacy and
                  preferences. Marketing is responsible for{" "}
                  <strong>attracting, converting, and retaining</strong>{" "}
                  long-term, successful customers while maintaining a commitment
                  to ethical standards. This means marketing influences all
                  areas of the sales funnel with a conscious effort to do what
                  is right, not just what is profitable.
                </p>
                <p>
                  Ethical marketing not only <strong>creates awareness</strong>{" "}
                  of the brand but also <strong>influences consumers</strong> to
                  take action and make a purchase in a way that upholds the
                  company's ethical values. It fosters trust and loyalty by
                  being honest and transparent in all interactions and by
                  contributing positively to society.
                </p>
                <p>
                  To easily analyze the fundamentals of marketing, we can break
                  it down into the 8 Ps of ethical marketing:
                </p>
              </div>
            </div>

            {/* Section 2: 8Ps */}
            <ContentBox title="8Ps Of Ethical Marketing">
              <p className="text-[#5c4033]">
                Ethical marketing goes beyond the traditional 4 P's of marketing
                by adding four additional P's that reflect a commitment to
                integrity and social responsibility. Here's a look at the 8 P's
                of Ethical Marketing:
              </p>
              <div className="space-y-8 mt-6">
                {[
                  {
                    t: "Product",
                    d: "Ensure that the products or services offered are beneficial, safe, and produced in a manner that respects human rights and the environment. Example: Organic food that promotes health and sustainable agriculture.",
                  },
                  {
                    t: "Price",
                    d: "Set prices that reflect fair value and consider the ability of consumers to pay. Avoid exploitative pricing and ensure transparency. Example: Offering fair trade products that are reasonably priced to reflect the true cost of ethical production.",
                  },
                  {
                    t: "Place",
                    d: "Distribute products in a way that is accessible and equitable, minimizing environmental impact. Consider the entire supply chain and its effects on communities. Example: Using eco-friendly packaging and supporting local businesses for distribution.",
                  },
                  {
                    t: "Promotion",
                    d: "Communicate honestly and transparently, avoiding deceptive practices. Promote products in a way that educates and empowers consumers to make informed decisions. Example: Providing clear information on product labels and marketing materials.",
                  },
                  {
                    t: "People",
                    d: "Focus on the well-being of employees, customers, and communities. Create inclusive and supportive environments that foster growth and development. Example: Implementing fair labor practices and promoting diversity and inclusion in the workplace.",
                  },
                  {
                    t: "Process",
                    d: "Ensure that business processes are ethical, efficient, and environmentally responsible. Streamline operations to reduce waste and promote sustainability. Example: Adopting green manufacturing practices and reducing carbon footprint.",
                  },
                  {
                    t: "Physical Evidence",
                    d: "Provide tangible proof of ethical practices through certifications, awards, and transparent reporting. Showcase the positive impact on society and the environment. Example: Displaying fair trade or organic certification labels on products.",
                  },
                  {
                    t: "Positioning for Ethical Excellence",
                    d: "Position the brand as a leader in ethical practices, emphasizing its commitment to values such as integrity, sustainability, and social responsibility. Example: Highlighting the brand's contributions to community development and environmental conservation.",
                  },
                ].map((p, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="text-xl font-black text-[#3F1200] flex gap-2">
                      <span className="text-[#00B4D8]">{i + 1}.</span>
                      {p.t}:
                    </h4>
                    <p className="text-[#5c4033] leading-relaxed pl-7">{p.d}</p>
                  </div>
                ))}
              </div>
            </ContentBox>

            {/* High Level box */}
            <ContentBox variant="infographic">
              <h3 className="text-2xl font-black text-[#3F1200] mb-6">
                At a high level, ethical marketing includes:
              </h3>
              <div className="space-y-8">
                {[
                  {
                    t: "Ethical Targeting",
                    d: "This involves researching the target market, understanding the ideal buyer, their buying processes and behaviors, and assessing competition while respecting privacy and avoiding manipulation. The goal is to stand out and reach niche audiences in an honest and respectful manner.",
                  },
                  {
                    t: "Ethical Branding",
                    d: "Differentiating the business and its products or services from competitors with a unique marketing design and voice that reflects ethical values. This helps to deeply connect with the ideal buyer by promoting integrity and authenticity.",
                  },
                  {
                    t: "Ethical Conversion",
                    d: "Optimizing the entire sales and marketing funnel from unknown target audience members to actual buyers, ensuring that all interactions and tactics are transparent and honest. The focus is on building trust and providing real value rather than employing deceptive practices.",
                  },
                  {
                    t: "Ethical Retention",
                    d: "Retaining existing customers by continuously providing value and maintaining ethical standards. This involves treating customers with respect, being transparent about business practices, and fostering long-term relationships that benefit both the buyer and the business.",
                  },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="text-xl font-black text-[#E76F3D] flex gap-2">
                      <span className="">{i + 1}.</span>
                      {item.t}:
                    </h4>
                    <p className="text-[#5c4033] leading-relaxed pl-7">
                      {item.d}
                    </p>
                  </div>
                ))}
              </div>
            </ContentBox>

            {/* Definitions Section */}
            <div className="space-y-12" id="expert-definitions">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-black text-[#3F1200]">
                  What Are 4 Definitions Of Ethical Marketing From Experts?
                </h2>

                <ExpertQuote
                  number="1"
                  quote="Ethical marketing is about building trust and transparency in every customer interaction, ensuring that the interests of all stakeholders are respected and upheld."
                  author="Philip Kotler"
                  company="Marketing Author and Consultant Kotler Marketing Group"
                />

                <div className="prose prose-lg max-w-none text-[#5c4033] leading-relaxed">
                  <p>
                    This emphasizes the importance of trust and transparency as
                    the cornerstones of ethical marketing. This approach ensures
                    that all stakeholders—customers, employees, suppliers, and
                    the community—are treated with respect and fairness.
                  </p>
                  <p>
                    Trust is not just a nice-to-have; it's a critical asset that
                    enhances brand loyalty and consumer confidence. By
                    committing to transparent practices, businesses can avoid
                    deceptive tactics and create a more genuine relationship
                    with their audience.
                  </p>
                  <p>
                    In today's age of information, where consumers are more
                    informed and vigilant, maintaining transparency is vital for
                    long-term success and aligns with Barakah Agency's value of
                    preserving wisdom and faith.
                  </p>
                </div>

                <ExpertQuote
                  number="2"
                  quote="Ethical marketing is the practice of promoting products or services based on truth, fairness, and responsibility, ensuring that the benefits and impacts are communicated honestly and without exaggeration."
                  author="Seth Godin"
                  company="Author and Marketing Expert, The Carbon Almanac"
                />

                <div className="prose prose-lg max-w-none text-[#5c4033] leading-relaxed">
                  <p>
                    This definition highlights the importance of truth and
                    fairness in ethical marketing. The focus is on honest
                    communication that does not exaggerate or mislead consumers
                    about the benefits and impacts of a product or service.
                  </p>
                  <p>
                    This approach helps in building a credible brand image and
                    fosters consumer trust. Ethical marketing, according to
                    Godin, is not about manipulation but about genuinely helping
                    consumers by providing valuable and truthful information.
                  </p>
                  <p>
                    This principle resonates with Barakah Agency's ethos of
                    preserving family and life by ensuring that marketing
                    practices do not exploit or harm consumers but instead
                    contribute positively to their well-being.
                  </p>
                </div>

                <ExpertQuote
                  number="3"
                  quote="Ethical marketing is the commitment to making business decisions that align with the highest standards of fairness, honesty, and integrity, promoting long-term positive relationships with customers and society."
                  author="Jay Baer"
                  company="Marketing Consultant and Author Convince and Convert"
                />

                <div className="prose prose-lg max-w-none text-[#5c4033] leading-relaxed">
                  <p>
                    Jay Baer's definition underscores the significance of
                    fairness, honesty, and integrity in every business decision.
                    This commitment to ethical standards ensures that marketing
                    practices contribute to building long-term positive
                    relationships, not just quick sales.
                  </p>
                  <p>
                    By prioritizing the well-being of customers and society,
                    businesses can cultivate a loyal customer base and a
                    positive reputation.
                  </p>
                  <p>
                    This approach aligns with Barakah Agency's focus on
                    preserving wealth and wisdom, as it promotes sustainable
                    growth and ethical practices that benefit both the business
                    and the broader community.
                  </p>
                </div>

                <div className="prose prose-lg max-w-none text-[#5c4033] leading-relaxed text-center italic py-4 border-y border-[#F0EBE8]">
                  "Trust is built through transparency and consistency. Ethical
                  marketing is simply the application of these values to all
                  your communication."
                </div>

                <ExpertQuote
                  number="4"
                  quote="Ethical marketing is not just about avoiding deceit but actively working to promote social good, ensure fair treatment, and create a positive impact on the world through every marketing effort."
                  author="Dr. Carol Adams"
                  company="Sustainability Consultant and Academic Author of Sustainable Development Goals"
                />

                <div className="prose prose-lg max-w-none text-[#5c4033] leading-relaxed">
                  <p>
                    Dr. Carol Adams emphasizes that ethical marketing goes
                    beyond merely avoiding deceitful practices. It is about
                    actively contributing to social good and ensuring fair
                    treatment for all. This definition highlights the proactive
                    role of businesses in using their marketing efforts to
                    create a positive impact on society and the environment.
                  </p>
                  <p>
                    By focusing on ethical practices, companies can drive
                    meaningful change and build a brand that stands for more
                    than just profit.
                  </p>
                  <p>
                    This approach aligns with Barakah Agency's ethos of
                    preserving faith, life, family, wisdom, and wealth, as it
                    encourages businesses to consider the broader implications
                    of their actions and strive for a positive societal impact.
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Core Concepts */}
            <div className="space-y-12" id="core-concepts">
              <h2 className="text-4xl md:text-5xl font-black text-[#3F1200]">
                8 Ethical Marketing Core Concepts
              </h2>
              <p className="text-lg text-[#5c4033] leading-relaxed">
                Ethical marketing is built on a foundation of ethical principles
                and a commitment to creating positive change in society. It goes
                beyond traditional marketing by incorporating values that ensure
                fairness, honesty, and social responsibility. Here are the core
                concepts:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    t: "Respecting Human Dignity",
                    d: "This begins with a deep respect for all individuals involved, reflecting the preservation of life and faith. This includes customers, employees, and partners. Treating everyone with dignity means valuing their rights, opinions, and contributions.",
                  },
                  {
                    t: "Promoting Fair Trade",
                    d: "This principle involves promoting and supporting fair trade practices, aligning with the preservation of wealth and wisdom. This means ensuring that products are sourced ethically, workers are paid fairly, and the production process does not exploit individuals or harm communities.",
                  },
                  {
                    t: "Transparency in Communication",
                    d: "Honesty and clarity are fundamental to ethical marketing, reflecting the preservation of wisdom. Companies should communicate openly about their products, services, and business practices. This includes providing accurate information about product origins, ingredients, and potential impacts.",
                  },
                  {
                    t: "Environmental Responsibility",
                    d: "Environmental responsibility involves taking responsibility for the environmental impact of business activities, reflecting the preservation of life and family. Companies should strive to minimize waste, reduce carbon footprints, and promote sustainable practices.",
                  },
                  {
                    t: "Social Equity",
                    d: "The principle of social equity promotes fairness and equity within society, aligning with the preservation of family and life. This means ensuring that marketing practices do not exploit or marginalize vulnerable populations and that they contribute positively to social good.",
                  },
                  {
                    t: "Ensuring Product Quality",
                    d: "Ethical marketing involves a commitment to delivering high-quality products that meet the needs and expectations of customers, reflecting the preservation of wealth and wisdom. This means prioritizing safety, reliability, and value in product design and production.",
                  },
                  {
                    t: "Ethical Data Use",
                    d: "In the age of digital marketing, ethical use of customer data is crucial, reflecting the preservation of wisdom. This means collecting and using data responsibly, protecting customer privacy, and being transparent about data practices.",
                  },
                  {
                    t: "Positioning for Ethical Excellence",
                    d: "Ethical positioning involves aligning a company's brand and marketing strategies with its ethical values, reflecting the preservation of faith, life, family, wisdom, and wealth. This means ensuring that all marketing efforts reflect the company's commitment to ethical principles.",
                  },
                ].map((concept, i) => (
                  <div
                    key={i}
                    className="space-y-3 p-6 bg-[#FBD3C1]/10 rounded-3xl border border-[#FBD3C1]/20"
                  >
                    <h4 className="text-xl font-black text-[#3F1200]">
                      {i + 1}. {concept.t}
                    </h4>
                    <p className="text-[#5c4033] text-sm leading-relaxed">
                      {concept.d}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Misconceptions */}
            <div className="space-y-12" id="misconceptions">
              <h2 className="text-4xl md:text-5xl font-black text-[#3F1200]">
                5 Common Misconceptions About Ethical Marketing
              </h2>
              <div className="space-y-8">
                {[
                  {
                    t: "Ethical Marketing Is Just About Following the Law",
                    d: "While adhering to legal standards is a fundamental aspect of ethical marketing, it's merely the starting point. True ethical marketing transcends compliance, embracing a deeper commitment to integrity, fairness, and social responsibility. This means making choices that reflect a genuine commitment to doing what is right, not just what is legally permissible.",
                  },
                  {
                    t: "Ethical Marketing Means Sacrificing Profits",
                    d: "Contrary to popular belief, ethical marketing does not entail a compromise on profitability. In fact, it often leads to enhanced financial performance in the long run. By building a reputation for honesty and fairness, businesses can cultivate deep trust and loyalty among customers. Ethical marketing might involve higher upfront costs, such as investing in fair trade materials or implementing sustainable practices, but these expenses are outweighed by long-term benefits.",
                  },
                  {
                    t: "Only Certain Industries Can Practice Ethical Marketing",
                    d: "Ethical marketing is a universal principle that can be applied across all industries, from technology and healthcare to finance and retail. Any company, regardless of its sector, can adopt ethical practices that reflect its core values and contribute positively to society.",
                  },
                  {
                    t: "Ethical Marketing Is Just a Trend",
                    d: "Ethical marketing is far from being a fleeting trend; it represents a significant and enduring shift in business practices. As consumers increasingly prioritize ethical considerations in their purchasing decisions, businesses that adopt ethical marketing practices are well-positioned to build lasting trust and loyalty.",
                  },
                  {
                    t: "Ethical Marketing Is Only for Big Companies",
                    d: "Ethical marketing is not confined to large corporations; it is equally accessible and beneficial to small businesses. In fact, small companies often have the agility and close community connections that enable them to implement and promote ethical practices effectively. Whether it's a local bakery sourcing ingredients from fair trade suppliers or a small tech startup prioritizing data privacy, ethical marketing is about the commitment to principles rather than the size of the company.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-4xl font-black text-[#E76F3D] opacity-40">
                      {i + 1}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-black text-[#3F1200]">
                        "{item.t}"
                      </h4>
                      <p className="text-[#5c4033] leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: B2B */}
            <div className="space-y-12" id="b2b-marketing">
              <EditorialBanner
                title="Ethical B2B Marketing"
                description="B2B, or business-to-business, is a type of marketing that focuses on promoting and selling products or services to other businesses and organizations. This approach prioritizes integrity, transparency, and mutual respect, ensuring that all marketing efforts align with ethical principles while building sustainable and trustworthy relationships."
              />

              <div className="prose prose-lg max-w-none text-[#5c4033] leading-relaxed space-y-8">
                <p>
                  At the basic foundations of this type of marketing it
                  emphasizes the importance of maintaining high standards of
                  integrity and transparency. Companies in this space are
                  committed to honesty in their communications, providing clear
                  and accurate information about their products and services.
                  This honesty helps build a foundation of trust with their
                  clients, who can rely on the company's representations and
                  commitments.
                </p>

                <h3 className="text-3xl font-black text-[#3F1200]">
                  What Makes a Good B2B Ethical Marketing Plan?
                </h3>
                <p>
                  A successful B2B marketing plan goes beyond focusing solely on
                  ROI. While generating revenue is crucial, incorporating
                  ethical principles into the strategy can create long-term,
                  sustainable growth.
                </p>

                <h4 className="text-2xl font-black text-[#3F1200]">
                  Convincing Decision-Makers with Ethical ROI
                </h4>
                <p>
                  Ethical marketing is a holistic approach that prioritizes
                  integrity, transparency, and respect in all marketing
                  practices. Unlike traditional marketing, which often focuses
                  solely on driving sales and maximizing profits, ethical
                  marketing aims to create long-term value for both businesses
                  and society.
                </p>

                <h4 className="text-2xl font-black text-[#3F1200]">
                  Uncovering and Addressing Pain Points
                </h4>
                <p>
                  A successful B2B marketing plan uncovers the pain points that
                  business owners or stakeholders face and addresses them with
                  ethically sound solutions.
                </p>
              </div>

              <ContentBox variant="default" className="border-[#48CAE4]">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-[#00B4D8]">
                      1. Pain Point:
                    </h4>
                    <p className="text-[#5c4033]">
                      The contractor struggles to find time for her family due
                      to her busy schedule.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-[#00B4D8]">
                      2. Problem-Causing Pain Point:
                    </h4>
                    <p className="text-[#5c4033]">
                      The business owner misses potential customers daily
                      because she is too busy with installations to answer the
                      phone, leading to lost revenue.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-[#00B4D8]">
                      3. Ethical Solution to the Problem:
                    </h4>
                    <p className="text-[#5c4033]">
                      By using a call answering service, the contractor could
                      secure ten more jobs per month, increasing her monthly
                      revenue by $30,000. This additional income would allow her
                      to hire more workers and spend more time with her family.
                    </p>
                  </div>
                </div>
              </ContentBox>
            </div>

            {/* Section: B2C */}
            <div className="space-y-12" id="b2c-marketing">
              <EditorialBanner
                title="What is B2C Ethical Marketing?"
                description="B2C marketing, or business-to-consumer marketing, focuses on promoting products or services directly to the everyday consumer. This form of marketing aims to enhance the daily lives of individuals by offering solutions that meet their personal needs and desires."
              />

              <div className="prose prose-lg max-w-none text-[#5c4033] leading-relaxed space-y-8">
                <p>
                  In the realm of ethical B2C marketing, the emphasis is on more
                  than just selling products. It involves fostering trust,
                  transparency, and respect for consumers. Companies committed
                  to ethical B2C marketing prioritize the well-being and
                  satisfaction of their customers, ensuring that their marketing
                  practices reflect honesty and integrity.
                </p>

                <h3 className="text-3xl font-black text-[#3F1200]">
                  The Best B2C Ethical Marketing Strategy
                </h3>
                <p>
                  Effective B2C marketing strategies revolve around addressing
                  consumer problems, promising immediate and ethical solutions.
                  Unlike B2B buyers who focus on long-term investments, B2C
                  consumers seek quick resolutions to their daily challenges.
                </p>

                <h4 className="text-2xl font-black text-[#3F1200]">
                  The Power of Ethical Emotional Marketing
                </h4>
                <p>
                  With B2C purchases often being more spontaneous and less
                  researched, marketers must seize the brief opportunity to
                  demonstrate their product's value. Ethical emotional marketing
                  aims to evoke genuine emotions, prompting an immediate yet
                  thoughtful response from consumers.
                </p>
              </div>

              <ContentBox variant="default" className="border-[#48CAE4]">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-[#00B4D8]">
                      1. Happiness:
                    </h4>
                    <p className="text-[#5c4033]">
                      A skincare brand ethically markets its face wash that
                      clears severe acne. The advertisement features real
                      testimonials and before-and-after images, showing users
                      regaining confidence and living more fulfilling lives
                      without resorting to misleading claims.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-[#00B4D8]">
                      2. Sadness:
                    </h4>
                    <p className="text-[#5c4033]">
                      An animal shelter ethically highlights the plight of
                      abandoned dogs. The ad features heartfelt stories and
                      images of the dogs, encouraging viewers to adopt without
                      using overly dramatic or guilt-inducing tactics.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-[#00B4D8]">
                      3. Fear:
                    </h4>
                    <p className="text-[#5c4033]">
                      A home security company ethically shares a story about a
                      family that experienced a break-in. The ad emphasizes the
                      importance of home security systems, highlighting how
                      their product can provide peace of mind and protect loved
                      ones, using real-life examples without resorting to
                      fear-mongering.
                    </p>
                  </div>
                </div>
              </ContentBox>
            </div>

            {/* Final Section: What it does */}
            <div className="space-y-12" id="what-it-does">
              <ConcentricInfographic />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {[
                  {
                    t: "Types of Ethical Marketing",
                    d: "Ethical marketing leverages various approaches to influence responsible and profitable customer actions throughout the marketing funnel. This strategy prioritizes integrity and long-term customer relationships.",
                  },
                  {
                    t: "Ethical Marketing Tactics",
                    d: "In ethical marketing, tactics are not just strategic actions but commitments to honest and respectful communication. For example, creating case studies for a product marketing strategy can take the form of transparent testimonials.",
                  },
                  {
                    t: "Ethical Marketing Channels",
                    d: "Ethical marketers choose responsible channels to disseminate their messages and content. These channels include search engines, social media, email, and more. The aim is to communicate the right message to the right audience at the right time.",
                  },
                  {
                    t: "Ethical Marketing Content",
                    d: "Content in ethical marketing is crafted to provide valuable, relevant information while adhering to moral principles. It supports specific strategies and is delivered through selected channels.",
                  },
                  {
                    t: "Ethical Marketing Collateral",
                    d: "Creating ethical marketing collateral involves developing materials that support deep-funnel messaging and sales efforts while upholding ethical standards. This includes accurate product descriptions, transparent case studies, and respectful marketing materials.",
                  },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="text-xl font-black text-[#3F1200]">
                      {i + 1}. {item.t}:
                    </h4>
                    <p className="text-[#5c4033] leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>

              <div
                className="prose prose-lg max-w-none text-[#5c4033] leading-relaxed font-medium"
                id="best-definition"
              >
                <p>
                  In summary, ethical marketing is a holistic approach that
                  drives profitable customer actions while adhering to
                  principles of fairness, transparency, and social
                  responsibility. It ensures that every aspect of marketing,
                  from strategy to execution, is aligned with the core ethical
                  values of preserving faith, life, family, wisdom, and wealth.
                </p>
              </div>

              <ReferencesList
                refs={[
                  "Ferrell, O. C., & Fraedrich, J. (2018). Business Ethics: Ethical Decision Making and Cases.",
                  "Kotler, P., & Armstrong, G. (2017). Principles of Marketing.",
                  "Crane, A., & Matten, D. (2016). Business Ethics: Managing Corporate Citizenship and Sustainability in the Age of Globalization.",
                  "Godin, S. (2018). This Is Marketing: You Can't Be Seen Until You Learn to See.",
                  "Michelli, J. (2007). The Starbucks Experience: 5 Principles for Turning Ordinary into Extraordinary.",
                  "Kotler, P., & Lee, N. (2008). Social Marketing: Influencing Behaviors for Good.",
                  "Creyer, E. H., & Ross, W. T. (1997). The Influence of Firm Behavior on Purchase Intention: Do Consumers Really Care About Business Ethics?",
                  "McDonald, G., & Norman, W. (2007). Ethics and Marketing.",
                  "American Marketing Association. (2019). Ethical Norms and Values for Marketers.",
                  "Roberts, J. (2003). What's the Big Idea?",
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      <div className="mt-20">
        <NewsletterSection />
      </div>

      <FinalCTASection />
    </>
  );
}
