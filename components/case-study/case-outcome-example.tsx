"use client";

import React from "react";
import { motion } from "framer-motion";

const outcomes = [
  {
    value: "62%",
    title: "Website Engagement",
    description: "Sustained performance, not short-term spikes",
  },
  {
    value: "91%",
    title: "Increase in Revenue",
    description: "Sustained performance, not short-term spikes",
  },
  {
    value: "142+",
    title: "New Brand Touchpoints",
    description: "Sustained performance, not short-term spikes",
  },
  {
    value: "28%",
    title: "Avg. Order Value",
    description: "Sustained performance, not short-term spikes",
  },
];

export function CaseOutcomeExample() {
  return (
    <section className="py-24 bg-[#F2EDE7]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="max-w-4xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#D4845E] font-bold tracking-wider text-sm md:text-base uppercase mb-4 block"
          >
            Case Outcome Example
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-[#3D1A10] mb-10 leading-tight font-lato"
          >
            The Barakah Method <span className="text-[#E76F3D]">works.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border-l-4 border-[#E76F3D] pl-8"
          >
            <p className="text-xl md:text-2xl text-[#3D1A10]/70 leading-relaxed font-medium">
              Before working with Barakah, the organization relied on fragmented
              efforts and short-term tactics. Growth lacked clarity and
              performance was difficult to sustain. Through the Barakah Method,
              we aligned positioning, systems, and execution — building a
              foundation for long-term, responsible growth.
            </p>
          </motion.div>
        </div>

        {/* Chart Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[2rem] p-8 md:p-12 mb-12 shadow-sm border border-[#3D1A10]/5"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <h3 className="text-xl md:text-2xl font-bold text-[#3D1A10]">
              Customer Growth — Before & After Barakah
            </h3>
            <div className="flex flex-wrap gap-6 text-sm font-medium text-[#3D1A10]/60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-[#3D1A10] rounded-full" />
                <span>With Barakah</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-[#FBD3C1] border-b border-dashed border-[#E76F3D] rounded-full" />
                <span>Prior Agency</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-[#B39B8D] rounded-full" />
                <span>Previous 106 days</span>
              </div>
            </div>
          </div>

          {/* SVG Chart */}
          <div className="relative w-full h-[300px] md:h-[450px]">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1000 400"
            >
              {/* Grid Lines */}
              {[40, 30, 20, 10, 0].map((val, i) => (
                <g key={val}>
                  <line
                    x1="0"
                    y1={350 - (val / 40) * 300}
                    x2="1000"
                    y2={350 - (val / 40) * 300}
                    stroke="#3D1A10"
                    strokeOpacity="0.05"
                    strokeWidth="1"
                  />
                  <text
                    x="-30"
                    y={355 - (val / 40) * 300}
                    fontSize="14"
                    fill="#3D1A10"
                    fillOpacity="0.3"
                    fontWeight="500"
                  >
                    {val}
                  </text>
                </g>
              ))}

              {/* Vertical Indicator Lines */}
              <line
                x1="450"
                y1="50"
                x2="450"
                y2="350"
                stroke="#E76F3D"
                strokeDasharray="8 8"
                strokeWidth="2"
              />

              {/* Area Fill for Black Line */}
              <path
                d="M 0 340 Q 250 320, 450 300 L 450 350 L 0 350 Z"
                fill="url(#chartGradient)"
                opacity="0.05"
              />
              <path
                d="M 450 350 Q 600 200, 800 120 T 1000 80 L 1000 350 L 450 350 Z"
                fill="url(#chartGradient)"
                opacity="0.1"
              />
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3D1A10" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3D1A10" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Line: Previous 106 days (Brown) */}
              <path
                d="M 450 350 Q 700 330, 1000 320"
                fill="none"
                stroke="#B39B8D"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Line: Prior Agency (Dashed Orange) */}
              <line
                x1="0"
                y1="300"
                x2="450"
                y2="300"
                stroke="#E76F3D"
                strokeDasharray="6 6"
                strokeOpacity="0.5"
                strokeWidth="3"
              />
              <line
                x1="450"
                y1="180"
                x2="1000"
                y2="180"
                stroke="#E76F3D"
                strokeDasharray="6 6"
                strokeOpacity="0.5"
                strokeWidth="3"
              />

              {/* Label Badges */}
              <rect
                x="60"
                y="260"
                width="120"
                height="32"
                rx="8"
                fill="#FDEEE7"
              />
              <text
                x="120"
                y="281"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#E76F3D"
                style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                Prior Agency
              </text>

              <rect
                x="480"
                y="140"
                width="160"
                height="32"
                rx="8"
                fill="#FDEEE7"
              />
              <text
                x="560"
                y="161"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#E76F3D"
                style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                Barakah Paid Media
              </text>

              {/* Line: With Barakah (Black) */}
              <path
                d="M 0 340 Q 250 320, 450 300 
                   M 450 350
                   Q 600 200, 800 120 T 1000 80"
                fill="none"
                stroke="#3D1A10"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* Joint Points */}
              <circle cx="450" cy="350" r="8" fill="#E76F3D" />
              <circle cx="780" cy="130" r="6" fill="#3D1A10" opacity="0.6" />
              <circle cx="630" cy="190" r="6" fill="#3D1A10" opacity="0.6" />
              <circle cx="1000" cy="80" r="8" fill="#3D1A10" />

              {/* Month Labels */}
              <text
                x="0"
                y="385"
                fontSize="14"
                fill="#3D1A10"
                fillOpacity="0.3"
                fontWeight="500"
              >
                Dec
              </text>
              <text
                x="150"
                y="385"
                fontSize="14"
                fill="#3D1A10"
                fillOpacity="0.3"
                fontWeight="500"
              >
                Dec
              </text>
              <text
                x="300"
                y="385"
                fontSize="14"
                fill="#3D1A10"
                fillOpacity="0.3"
                fontWeight="500"
              >
                Dec
              </text>
              <text
                x="450"
                y="385"
                textAnchor="middle"
                fontSize="14"
                fill="#E76F3D"
                fontWeight="700"
              >
                Jan ↑
              </text>
              <text
                x="650"
                y="385"
                textAnchor="middle"
                fontSize="14"
                fill="#3D1A10"
                fillOpacity="0.3"
                fontWeight="500"
              >
                Feb
              </text>
              <text
                x="850"
                y="385"
                textAnchor="middle"
                fontSize="14"
                fill="#3D1A10"
                fillOpacity="0.3"
                fontWeight="500"
              >
                Mar
              </text>
              <text
                x="1000"
                y="385"
                textAnchor="end"
                fontSize="14"
                fill="#3D1A10"
                fillOpacity="0.3"
                fontWeight="500"
              >
                Mar
              </text>
            </svg>
          </div>
        </motion.div>

        {/* Outcome Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[2rem] border-t-8 border-[#E76F3D] shadow-sm hover:shadow-md transition-shadow group h-full flex flex-col"
            >
              <span className="text-6xl md:text-7xl font-bold text-[#3D1A10] mb-6 block tracking-tighter transition-transform group-hover:scale-105 origin-left">
                {item.value}
              </span>
              <h4 className="text-2xl font-bold text-[#3D1A10] mb-4">
                {item.title}
              </h4>
              <p className="text-[#3D1A10]/60 text-lg leading-snug">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
