"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const Ear = () => (
  <svg
    width="58"
    height="99"
    viewBox="0 0 78 119"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.50061 27.7551C5.58697 20.8925 8.29572 12.8499 15.0534 8.67277C46.8959 -11.0111 79.8639 19.7768 75.0255 53.2745C72.2251 72.6622 51.6127 83.0336 43.4121 99.2554C36.3832 113.159 8.67723 126.187 6.45248 106.383"
      stroke="#3F1200"
      stroke-width="5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M50.9542 74.5005C67.138 57.1153 63.0571 16.2967 36.3199 17.5277C16.1986 18.4542 20.8913 45.7944 25.5733 55.278"
      stroke="#3F1200"
      stroke-width="5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M21.1796 41.572C42.9939 40.0526 50.4122 63.0999 36.2607 77.3023C32.5742 81.0012 25.4497 75.6263 21.1796 77.769C16.9083 79.9125 13.7095 86.6674 9.50061 81.7392"
      stroke="#3F1200"
      stroke-width="5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const Search = () => (
  <svg
    width="59"
    height="99"
    viewBox="0 0 114 114"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M104.5 57C104.5 30.7665 83.2333 9.5 57 9.5C30.7665 9.5 9.5 30.7665 9.5 57C9.5 83.2333 30.7665 104.5 57 104.5"
      stroke="#3F1200"
      stroke-width="4"
      stroke-linecap="round"
    />
    <path
      d="M95 27.0702C90.5602 27.3902 84.8735 29.1091 80.93 34.2132C73.8079 43.4321 66.6852 44.2014 61.9371 41.1284C54.8145 36.519 60.8 29.0527 52.4405 24.9952C46.9924 22.3507 46.2327 15.1546 49.2651 9.5"
      stroke="#3F1200"
      stroke-width="4"
      stroke-linejoin="round"
    />
    <path
      d="M9.5 52.25C13.1219 55.395 18.1947 58.2739 24.1715 58.2739C36.52 58.2739 38.9898 60.6333 38.9898 70.071C38.9898 79.5088 38.9898 79.5088 41.4595 86.5868C43.0659 91.191 43.6274 95.7952 40.4254 99.75"
      stroke="#3F1200"
      stroke-width="4"
      stroke-linejoin="round"
    />
    <path
      d="M94.5193 94.6618L104.5 104.5M100.264 80.968C100.264 91.5824 91.6427 100.187 81.007 100.187C70.3717 100.187 61.75 91.5824 61.75 80.968C61.75 70.3542 70.3717 61.75 81.007 61.75C91.6427 61.75 100.264 70.3542 100.264 80.968Z"
      stroke="#3F1200"
      stroke-width="4"
      stroke-linecap="round"
    />
  </svg>
);
const ShieldCheck = () => (
  <svg
    width="59"
    height="99"
    viewBox="0 0 65 103"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M31.7123 46.1733C31.7114 49.9752 34.1481 56.1241 39.3546 60.4233C47.1798 66.8847 51.0923 70.1157 51.8732 71.3084C52.7667 72.6736 52.5815 72.2727 53.0517 73.8525C53.4626 75.2333 53.4626 77.2117 53.4626 81.1689V81.547C53.4626 82.4804 53.4626 82.9473 53.5438 83.3905C53.6616 84.0346 53.9053 84.6459 54.2601 85.1865C54.5038 85.5579 54.8211 85.8862 55.4557 86.5426C58.5869 89.7826 60.152 91.4023 60.4475 92.7466C60.8788 94.7093 60.0808 96.7437 58.4563 97.8229C57.3443 98.5615 55.1431 98.5615 50.7413 98.5615H15.6484C11.0815 98.5615 8.79796 98.5615 7.66095 97.7754C6.09873 96.6953 5.3306 94.7212 5.72709 92.8055C6.01565 91.4114 7.64894 89.7403 10.9154 86.3982C11.5774 85.7209 11.9084 85.3822 12.161 84.996C12.5075 84.4664 12.7478 83.8684 12.8675 83.239C12.9547 82.7797 12.9547 82.2952 12.9547 81.3262V68.7121C12.9547 65.331 13.0485 65.4859 10.7495 62.358C-2.61121 44.1783 4.38531 26.5238 17.6442 19.6963C17.6442 11.4068 22.1502 6.94771 26.4774 4.72614C28.4809 3.69752 29.4827 3.18324 30.5975 3.88391C33.21 5.52566 33.0495 13.0615 31.7123 17.8115C37.4499 17.8115 42.122 22.5615 42.122 27.3115L51.0092 36.2839C52.6456 38.2312 54.2639 40.274 53.0251 42.9903C52.2262 44.7421 50.3181 46.2821 48.9335 47.5655C47.1446 49.2242 44.4124 49.2242 42.6236 47.5655C40.9995 46.0603 39.7992 44.8029 37.4499 45.2604C35.537 45.6328 33.6803 46.2835 31.7123 46.1733ZM31.7123 46.1733C29.078 46.0261 25.9672 44.8053 22.6636 41.5615"
      stroke="#3F1200"
      stroke-width="7.125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const Target = () => (
  <svg
    width="59"
    height="99"
    viewBox="0 0 114 114"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M71.8732 11.875C67.1944 10.3339 62.1946 9.5 57 9.5C30.7665 9.5 9.5 30.7665 9.5 57C9.5 83.2333 30.7665 104.5 57 104.5C83.2333 104.5 104.5 83.2333 104.5 57C104.5 52.0353 103.738 47.2484 102.325 42.75"
      stroke="#3F1200"
      stroke-width="7.125"
      stroke-linecap="round"
    />
    <path
      d="M80.75 57C80.75 70.1166 70.1166 80.75 57 80.75C43.8833 80.75 33.25 70.1166 33.25 57C33.25 43.8833 43.8833 33.25 57 33.25"
      stroke="#3F1200"
      stroke-width="7.125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M92.625 21.375L57 57M92.625 21.375V9.5M92.625 21.375H104.5"
      stroke="#3F1200"
      stroke-width="7.125"
      stroke-linecap="round"
    />
  </svg>
);
const RefreshCw = () => (
  <svg
    width="59"
    height="99"
    viewBox="0 0 114 114"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M90.25 57C90.25 53.0651 93.4401 49.875 97.375 49.875C101.31 49.875 104.5 53.0651 104.5 57C104.5 60.9349 101.31 64.125 97.375 64.125C93.4401 64.125 90.25 60.9349 90.25 57Z"
      stroke="#3F1200"
      stroke-width="7.125"
    />
    <path
      d="M9.5 57C9.5 53.0651 12.69 49.875 16.625 49.875C20.56 49.875 23.75 53.0651 23.75 57C23.75 60.9349 20.56 64.125 16.625 64.125C12.69 64.125 9.5 60.9349 9.5 57Z"
      stroke="#3F1200"
      stroke-width="7.125"
    />
    <path
      d="M65.1087 48.8913C63.7174 47.5 61.4783 47.5 57 47.5C52.5217 47.5 50.2826 47.5 48.8913 48.8913M65.1087 48.8913C66.5 50.2826 66.5 52.5217 66.5 57C66.5 61.4783 66.5 63.7174 65.1087 65.1087M48.8913 48.8913C47.5 50.2826 47.5 52.5217 47.5 57C47.5 61.4783 47.5 63.7174 48.8913 65.1087M48.8913 65.1087C50.2826 66.5 52.5217 66.5 57 66.5C61.4783 66.5 63.7174 66.5 65.1087 65.1087"
      stroke="#3F1200"
      stroke-width="7.125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M98.3587 10.8912C96.9674 9.5 94.7283 9.5 90.25 9.5C85.7717 9.5 83.5326 9.5 82.1413 10.8912M98.3587 10.8912C99.75 12.2825 99.75 14.5217 99.75 19C99.75 23.4783 99.75 25.7175 98.3587 27.1088M82.1413 10.8912C80.75 12.2825 80.75 14.5217 80.75 19C80.75 23.4783 80.75 25.7175 82.1413 27.1088M82.1413 27.1088C83.5326 28.5 85.7717 28.5 90.25 28.5C94.7283 28.5 96.9674 28.5 98.3587 27.1088"
      stroke="#3F1200"
      stroke-width="7.125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M31.8588 86.8913C30.4675 85.5 28.2283 85.5 23.75 85.5C19.2717 85.5 17.0325 85.5 15.6412 86.8913M31.8588 86.8913C33.25 88.2826 33.25 90.5217 33.25 95C33.25 99.4783 33.25 101.717 31.8588 103.109M15.6412 86.8913C14.25 88.2826 14.25 90.5217 14.25 95C14.25 99.4783 14.25 101.717 15.6412 103.109M15.6412 103.109C17.0325 104.5 19.2717 104.5 23.75 104.5C28.2283 104.5 30.4675 104.5 31.8588 103.109"
      stroke="#3F1200"
      stroke-width="7.125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M23.75 57H47.5"
      stroke="#3F1200"
      stroke-width="7.125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M66.5 57H90.25"
      stroke="#3F1200"
      stroke-width="7.125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M57 47.5C57 38 60.9582 19 80.75 19"
      stroke="#3F1200"
      stroke-width="7.125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M57 66.5C57 76 53.0418 95 33.25 95"
      stroke="#3F1200"
      stroke-width="7.125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const processSteps = [
  {
    id: "01",
    title: "Listen Deeply",
    description:
      "We begin by understanding your goals, audience, constraints, and market context. Every decision starts by anchoring your brand in what matters most.",
    icon: Ear,
    side: "left",
  },
  {
    id: "02",
    title: "Diagnose with Insight",
    description:
      "We assess where you are and uncover unseen opportunities using our ZeroFrame™ Data Suite – built for clarity, compliance, and growth.",
    icon: Search,
    side: "right",
  },
  {
    id: "03",
    title: "Strategize for Scale",
    description:
      "Together, we co-create a roadmap aligned with your brand identity, business goals, and long-term impact. No fluff — just focused direction.",
    icon: ShieldCheck, // Using ShieldCheck as a placeholder for the knight/strategy icon
    side: "left",
  },
  {
    id: "04",
    title: "Execute with Precision",
    description:
      "From branding and paid media to automation and community growth, we deploy the right mix of services to deliver measurable momentum.",
    icon: Target,
    side: "right",
  },
  {
    id: "05",
    title: "Refine and Sustain",
    description:
      "We track performance, optimize continuously, and advise proactively — because legacy isn't a moment. It's a mindset.",
    icon: RefreshCw,
    side: "left",
  },
];

export function AboutProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="py-32 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-32">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[#3F1200]/40 mb-4 block"
          >
            // How We Work With You //
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-[#3F1200] font-lato max-w-3xl mx-auto leading-tight"
          >
            To Build Sustainable,
            <br />
            Legacy-Aligned Growth
          </motion.h2>
        </div>

        {/* Process Content */}
        <div className="relative max-w-5xl mx-auto md:h-[1800px] h-auto">
          {/* Central Path SVG */}
          <div className="absolute inset-0 hidden md:flex justify-center pointer-events-none">
            <svg
              width="526"
              height="1952"
              viewBox="0 0 526 1952"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Static background stroke (optional) */}
              <path
                d="M82.2595 6.37256H346.285C373.443 6.37256 400.057 13.9842 423.108 28.3438L444.251 41.5145C464.854 54.349 481.913 72.1409 493.87 93.2651L499.982 104.064C512.339 125.893 518.833 150.55 518.833 175.635V222.546C518.833 245.102 513.581 267.348 503.494 287.523L496.149 302.212C482.806 328.899 461.57 350.83 435.328 365.027L420.19 373.216C398.957 384.703 375.197 390.718 351.057 390.718H259.724H180.745C132.868 390.718 88.0646 414.304 60.9659 453.774L38.0414 487.164L23.5841 514.344C9.57125 540.688 4.00939 570.708 7.6544 600.323L9.77764 617.575C12.2776 637.887 19.0408 657.442 29.624 674.96L40.5943 693.117C50.3159 709.208 63.0679 723.26 78.143 734.492L96.2693 747.998C117.505 763.821 142.662 773.538 169.02 776.101L232.373 782.26H328.819L353.859 784.093C376.209 785.728 397.878 792.511 417.171 803.912L419.508 805.292L445.104 821.044C465.141 833.375 481.737 850.569 493.351 871.031C501.634 885.625 507.218 901.593 509.835 918.169L515.475 953.889C517.702 967.988 517.838 982.338 515.88 996.477L513.638 1012.67C508.647 1048.72 490.309 1081.58 462.253 1104.76L439.661 1123.42L431.723 1129.77C413.301 1144.51 391.566 1154.54 368.398 1158.99L342.414 1163.99C333.371 1165.73 324.184 1166.61 314.976 1166.61H253.966H193.007C174.322 1166.61 155.813 1170.21 138.494 1177.22L131.615 1180C113.561 1187.31 97.1615 1198.17 83.3898 1211.95L55.3153 1240.02L40.961 1256.91C18.6323 1283.18 6.3725 1316.53 6.3725 1351.01V1373.35C6.3725 1388.96 8.89012 1404.48 13.8284 1419.29L19.1802 1435.35C31.265 1471.6 57.1468 1501.64 91.219 1518.94L104.373 1525.62C120.47 1533.8 137.949 1538.9 155.916 1540.68L230.934 1548.07H295.711H344.741C386.754 1548.07 426.71 1566.26 454.303 1597.94L473.98 1620.53C483.672 1631.66 491.613 1644.2 497.528 1657.72L506.651 1678.57C514.685 1696.94 518.833 1716.76 518.833 1736.81V1759.69C518.833 1779.62 514.731 1799.34 506.784 1817.62L495.283 1844.07C482.549 1873.36 460.519 1897.64 432.6 1913.15L428.138 1915.63C416.679 1921.99 404.411 1926.78 391.669 1929.85L344.184 1941.32C333.021 1944.01 321.577 1945.37 310.093 1945.37H205.023H128.73"
                stroke="#3F1200"
                strokeWidth="12.745"
                opacity="0.1"
              />

              {/* Animated stroke */}
              <motion.path
                d="M82.2595 6.37256H346.285C373.443 6.37256 400.057 13.9842 423.108 28.3438L444.251 41.5145C464.854 54.349 481.913 72.1409 493.87 93.2651L499.982 104.064C512.339 125.893 518.833 150.55 518.833 175.635V222.546C518.833 245.102 513.581 267.348 503.494 287.523L496.149 302.212C482.806 328.899 461.57 350.83 435.328 365.027L420.19 373.216C398.957 384.703 375.197 390.718 351.057 390.718H259.724H180.745C132.868 390.718 88.0646 414.304 60.9659 453.774L38.0414 487.164L23.5841 514.344C9.57125 540.688 4.00939 570.708 7.6544 600.323L9.77764 617.575C12.2776 637.887 19.0408 657.442 29.624 674.96L40.5943 693.117C50.3159 709.208 63.0679 723.26 78.143 734.492L96.2693 747.998C117.505 763.821 142.662 773.538 169.02 776.101L232.373 782.26H328.819L353.859 784.093C376.209 785.728 397.878 792.511 417.171 803.912L419.508 805.292L445.104 821.044C465.141 833.375 481.737 850.569 493.351 871.031C501.634 885.625 507.218 901.593 509.835 918.169L515.475 953.889C517.702 967.988 517.838 982.338 515.88 996.477L513.638 1012.67C508.647 1048.72 490.309 1081.58 462.253 1104.76L439.661 1123.42L431.723 1129.77C413.301 1144.51 391.566 1154.54 368.398 1158.99L342.414 1163.99C333.371 1165.73 324.184 1166.61 314.976 1166.61H253.966H193.007C174.322 1166.61 155.813 1170.21 138.494 1177.22L131.615 1180C113.561 1187.31 97.1615 1198.17 83.3898 1211.95L55.3153 1240.02L40.961 1256.91C18.6323 1283.18 6.3725 1316.53 6.3725 1351.01V1373.35C6.3725 1388.96 8.89012 1404.48 13.8284 1419.29L19.1802 1435.35C31.265 1471.6 57.1468 1501.64 91.219 1518.94L104.373 1525.62C120.47 1533.8 137.949 1538.9 155.916 1540.68L230.934 1548.07H295.711H344.741C386.754 1548.07 426.71 1566.26 454.303 1597.94L473.98 1620.53C483.672 1631.66 491.613 1644.2 497.528 1657.72L506.651 1678.57C514.685 1696.94 518.833 1716.76 518.833 1736.81V1759.69C518.833 1779.62 514.731 1799.34 506.784 1817.62L495.283 1844.07C482.549 1873.36 460.519 1897.64 432.6 1913.15L428.138 1915.63C416.679 1921.99 404.411 1926.78 391.669 1929.85L344.184 1941.32C333.021 1944.01 321.577 1945.37 310.093 1945.37H205.023H128.73"
                stroke="#3F1200"
                strokeWidth="12.745"
                strokeLinecap="round"
                style={{ pathLength }}
              />
            </svg>
          </div>

          {/* Cards */}
          <div className="relative md:h-full flex flex-col gap-12 md:block">
            {processSteps.map((step, idx) => {
              const isLeft = step.side === "left";
              const topOffset = idx * (100 / processSteps.length);

              return (
                <div
                  key={step.id}
                  className={cn(
                    "relative md:absolute w-full md:w-[60%] lg:w-[70%] flex",
                    isLeft
                      ? "md:left-0 justify-start"
                      : "md:right-0 justify-end",
                  )}
                  style={{
                    top:
                      typeof window !== "undefined" && window.innerWidth >= 768
                        ? `${topOffset}%`
                        : undefined,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-100px", once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative group w-full"
                  >
                    <div
                      className={cn(
                        "bg-[#FEAB6B] p-6 md:p-10 rounded-3xl md:rounded-full flex flex-col items-center md:mt-14 gap-4 shadow-lg",
                      )}
                    >
                      {/* Step Icon */}
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-2 text-center md:text-left">
                        <div className="flex-shrink-0">
                          <div className="rounded-full h-20 w-20 md:h-[120px] md:w-[120px] bg-[#E76F3D]/30 flex items-center justify-center text-[#E76F3D]">
                            <step.icon className="stroke-[1.5] text-black w-10 h-10 md:w-auto md:h-auto" />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#3F1200] font-bold text-xs md:text-sm tracking-widest uppercase mb-1">
                            // Step {step.id}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-black text-[#3F1200] leading-tight mb-2">
                            {step.title}
                          </h3>
                          <p className="text-[#5C4033] text-base md:text-lg leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
