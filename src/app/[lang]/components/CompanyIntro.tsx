import Link from "next/link";
import { getStrapiMedia } from "../utils/api-helpers";

interface CompanyIntroProps {
  data: {
    heading?: string;
    description?: string;
    content?: string;
    image?: {
      data?: {
        attributes?: {
          url?: string;
          alternativeText?: string;
        };
      };
    };
    imageFit?: "cover" | "contain";
    imagePosition?: "center" | "top" | "bottom" | "left" | "right";
  };
}

const STATS = [
  { value: "11+", label: "Services Offered" },
  { value: "4", label: "Expert Departments" },
  { value: "100%", label: "Client Focused" },
];

const PILLARS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" />
      </svg>
    ),
    color: "bg-ami-teal/10 text-ami-teal",
    label: "Professional Quality",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "bg-ami-red/10 text-ami-red",
    label: "Results-Driven",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: "bg-ami-navy/10 text-ami-navy",
    label: "Academically Informed",
  },
];

export default function CompanyIntro({ data }: CompanyIntroProps) {
  const fitClass = data?.imageFit === "contain" ? "object-contain" : "object-cover";
  const positionClass =
    data?.imagePosition === "top"
      ? "object-top"
      : data?.imagePosition === "bottom"
      ? "object-bottom"
      : data?.imagePosition === "left"
      ? "object-left"
      : data?.imagePosition === "right"
      ? "object-right"
      : "object-center";

  const cmsImageUrl = data?.image?.data?.attributes?.url
    ? getStrapiMedia(data.image.data.attributes.url)
    : null;

  const imageUrl: string = cmsImageUrl || "/images/about-hero.jpg";
  const imageAlt = data?.image?.data?.attributes?.alternativeText || "About Advanced Multiple";

  return (
    <section className="section-padding bg-white" id="company-intro">
      <div className="container-ami">
        <div className="grid gap-12 lg:grid-cols-2 items-center">

          {/* ── Left: Image stack ── */}
          <div className="relative animate-fade-up">
            {/* Main image */}
            <div className="relative rounded-card overflow-hidden aspect-[4/3] bg-ami-gray-100 shadow-card-hover">
              <img
                src={imageUrl}
                alt={imageAlt}
                className={`w-full h-full ${fitClass} ${positionClass}`}
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-ami-navy/60 via-transparent to-transparent" />
            </div>

            {/* Floating stats bar */}
            <div className="absolute -bottom-6 left-4 right-4 bg-white border border-ami-gray-200 rounded-xl shadow-elevated px-5 py-4 flex justify-between items-center">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center flex-1">
                  <p className="text-xl font-bold text-ami-navy leading-tight">{stat.value}</p>
                  <p className="text-2xs text-ami-gray-400 leading-tight mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Accent corner decoration */}
            <div className="absolute -top-3 -right-3 w-20 h-20 border-t-4 border-r-4 border-ami-red rounded-tr-xl opacity-40" />
            <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-4 border-l-4 border-ami-teal rounded-bl-xl opacity-40" />
          </div>

          {/* ── Right: Content ── */}
          <div className="lg:pl-4 mt-8 lg:mt-0 animate-fade-up-delay-150">
            {/* Label */}
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-6 h-0.5 bg-ami-red rounded-full" />
              <span className="text-ami-red text-xs font-semibold uppercase tracking-widest">
                Who We Are
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ami-navy tracking-tight mb-5 leading-tight">
              {data?.heading || "Welcome to Advanced Multiple"}
            </h2>

            <div className="space-y-4 text-ami-slate leading-relaxed text-sm md:text-base mb-6">
              <p>
                {data?.description ||
                  "Advanced Multiple is a modern digital media and content production company delivering high-impact visual and communication solutions. We specialize in creating professional videos, social media content, and digital products that help individuals, organizations, and brands communicate effectively."}
              </p>
              <p>
                {data?.content ||
                  "Our work focuses on transforming ideas into engaging, audience-driven content. From short-form videos and reels to full-scale digital campaigns, we combine creativity, strategy, and technical expertise to produce content that performs across platforms."}
              </p>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-3 gap-3 mb-7 mt-6">
              {PILLARS.map((p) => (
                <div
                  key={p.label}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg border border-ami-gray-200 bg-ami-gray-warm text-center"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${p.color}`}>
                    {p.icon}
                  </div>
                  <span className="text-2xs font-medium text-ami-navy leading-tight">{p.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Link href="/about" className="btn-primary">
                Learn More
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ami-teal hover:text-ami-teal-dark transition-default"
              >
                Contact Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
