"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    company: "Fadwa Masala",
    rating: 5,
    text: "Barakah Agency was thorough and provided good data analytics.",
    author: "Fadwa Hilili",
    role: "Owner",
    avatar: "/placeholder-avatar-1.jpg",
  },
  {
    id: 2,
    company: "Mesghali Studio",
    rating: 5,
    text: "I was very happy working with Barakah Agency and would consider working with them again in the near future.",
    author: "Ehsaan Mesghali",
    role: "Creative Director",
    avatar: "/placeholder-avatar-2.jpg",
  },
  {
    id: 3,
    company: "Halal Expo USA",
    rating: 5,
    text: "Barakah Agency's expertise and value were impressive.",
    author: "Marwan Ahmad",
    role: "Presidentr",
    avatar: "/placeholder-avatar-3.jpg",
  },
  {
    id: 4,
    company: "Honey Mama Lactation",
    rating: 5,
    text: "They genuinely care about the mission behind your business. That’s rare.",
    author: "Anonymous",
    role: "Executive",
    avatar: "/placeholder-avatar-4.jpg",
  },
  {
    id: 5,
    company: "A Squared Engineers",
    rating: 5,
    text: "Barakah Agency’s ability to perform and show results is impressive.",
    author: "Anthony Fernandez",
    role: "Principal Engineer",
    avatar: "/placeholder-avatar-5.jpg",
  },
  {
    id: 6,
    company: "Flowless",
    rating: 5,
    text: "Barakah Team was very responsive and went above and beyond to support our needs.",
    author: "Baker Bozeyeh",
    role: "CEO",
    avatar: "/placeholder-avatar-5.jpg",
  },
  {
    id: 7,
    company: "Manara West",
    rating: 5,
    text: "The team was by far the most organized organization we contracted with.",
    author: "Hasna El-Nounou",
    role: "Senior Programs Manager,",
    avatar: "/placeholder-avatar-5.jpg",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + cardsPerView >= testimonials.length ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, testimonials.length - cardsPerView) : prev - 1,
    );
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + cardsPerView,
  );

  // If we don't have enough cards to fill the view, loop from the beginning
  if (visibleTestimonials.length < cardsPerView) {
    const remaining = cardsPerView - visibleTestimonials.length;
    visibleTestimonials.push(...testimonials.slice(0, remaining));
  }

  return (
    <section className="relative py-20 md:py-32 bg-[#E76F3D] overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-white/90 mb-2 font-lato">
            • Testimonials •
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-lato">
            Trusted by Founders Building What Lasts
          </h2>
          <p className="text-white/90 text-lg max-w-3xl mx-auto font-lato">
            We build enduring partnerships rooted in strategy, performance and
            trust.
            <br />
            Here's how our clients describe the experience and the results.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-4 mb-8">
          <Button
            onClick={prevSlide}
            variant="secondary"
            size="icon"
            className="rounded-full w-12 h-12 bg-white hover:bg-white/90 text-[#f59e5f]"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.1141 10.1886H1.26235M1.26235 10.1886L10.1882 1.2627M1.26235 10.1886L10.1882 19.1145"
                stroke="black"
                stroke-width="2.52462"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
          <Button
            onClick={nextSlide}
            variant="secondary"
            size="icon"
            className="rounded-full w-12 h-12 bg-white hover:bg-white/90 text-[#f59e5f]"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.26235 10.1886H19.1141M19.1141 10.1886L10.1882 1.2627M19.1141 10.1886L10.1882 19.1145"
                stroke="black"
                stroke-width="2.52462"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto">
          {visibleTestimonials.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              className="bg-white rounded-2xl p-8 min-h-[460px] shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Header with Company Name and Rating */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#3F1200] font-lato">
                  {testimonial.company}
                </h3>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#f59e5f] text-[#f59e5f]"
                    />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-[#5c4033] leading-relaxed mb-8 flex-1 font-lato text-[21px]">
                {testimonial.text}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div
                  className="
    w-12 h-12 rounded-full
    bg-gradient-to-br from-[#f59e5f] to-[#f7a96a]
    flex items-center justify-center
    text-white font-bold text-lg
    
    shadow-[0px_24px_24px_rgba(0,0,0,0.3),_0px_7.66px_7.66px_rgba(0,0,0,0.1)]
  "
                >
                  {testimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-bold text-[#3F1200] font-lato">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-[#5c4033] font-lato">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
