import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isNaicRoute } from "@/config/routes";

type SeoConfig = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage: string;
  ogImageAlt?: string;
  siteName: string;
  twitterSite?: string;
  twitterCard?: string;
};

const SITE_URL = "https://rakantutor.org";

const RAKAN_TUTOR_BASE: SeoConfig = {
  title: "Rakan Tutor | AI Education for Youth",
  description:
    "Rakan Tutor provides hybrid AI programs, hands-on workshops, and an accessible digital learning platform for ASEAN youth.",
  ogImage: "/rakan_tutor_hero.png",
  ogImageAlt: "Rakan Tutor community learning AI",
  siteName: "Rakan Tutor",
  twitterSite: "@RakanTutor",
  twitterCard: "summary_large_image",
};

const NAIC_BASE: SeoConfig = {
  title: "NAIC '26 | National AI Competition 2026",
  description:
    "National AI Competition 2026 (NAIC '26), organized by Rakan Tutor & Sunway University. Join Malaysia's largest youth AI challenge.",
  ogImage: "/og-image.svg",
  ogImageAlt: "National AI Competition 2026",
  siteName: "NAIC '26",
  twitterSite: "@RakanTutor",
  twitterCard: "summary_large_image",
};

const ROUTE_OVERRIDES: Record<string, Partial<SeoConfig>> = {
  "/": {
    title: "Rakan Tutor | AI Education for Youth",
    description:
      "AI education for ASEAN youth through workshops, a digital learning platform, and community partnerships.",
  },
  "/about": {
    title: "Rakan Tutor | About",
    description:
      "Learn about Rakan Tutor's mission, vision, and volunteer-driven team empowering youth through AI education.",
  },
  "/history": {
    title: "Rakan Tutor | Our History",
    description:
      "How Rakan Tutor grew from pandemic-era tutoring to AI upskilling for youth across ASEAN.",
  },
  "/impact": {
    title: "Rakan Tutor | Impact Report",
    description:
      "Read the 2021-2024 Rakan Tutor program impact report and outcomes for youth AI education.",
  },
  "/news": {
    title: "Rakan Tutor | News & Media",
    description: "Press coverage and media features about Rakan Tutor's work.",
  },
  "/contact": {
    title: "Contact Rakan Tutor",
    description:
      "Contact Rakan Tutor to partner, volunteer, or bring AI education to your community.",
  },
  "/terms": {
    title: "Terms & Conditions | Rakan Tutor",
    description:
      "Read Rakan Tutor's Terms and Conditions for using our website and educational services.",
  },
  "/privacy": {
    title: "Privacy Policy | Rakan Tutor",
    description:
      "Learn how Rakan Tutor collects, uses, and protects your personal information.",
  },
  "/naic": {
    title: "NAIC '26 | National AI Competition 2026",
    description:
      "Join the National AI Competition 2026 across Innovation, Engineering, GenAI, Computing, and Architecture tracks.",
  },
  "/naic/register": {
    title: "Register | NAIC '26",
    description:
      "Register your team for NAIC '26 and compete in Malaysia's largest youth AI competition.",
  },
  "/naic/faq": {
    title: "FAQ | NAIC '26",
    description:
      "Answers on eligibility, registration, submissions, and judging for NAIC '26.",
  },
  "/naic/tracks": {
    title: "Tracks | NAIC '26",
    description:
      "Explore NAIC '26 tracks: Innovation, Engineering, GenAI, Computing, and Architecture.",
  },
  "/naic/contact": {
    title: "Contact | NAIC '26",
    description: "Contact the NAIC '26 organizing team for competition inquiries.",
  },
  "/naic/terms": {
    title: "Terms & Conditions | NAIC '26",
    description:
      "Official NAIC '26 terms, eligibility rules, participation guidelines, and judging policies.",
  },
  "/naic/privacy": {
    title: "Privacy Policy | NAIC '26",
    description:
      "NAIC '26 privacy policy outlining how personal data is collected and protected.",
  },
};

const normalizePath = (pathname: string) => {
  if (!pathname) return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
};

const resolveUrl = (value: string) => {
  if (!value) return value;
  if (value.startsWith("http")) return value;
  return `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;
};

const ensureMeta = (attribute: "name" | "property", key: string, content: string) => {
  if (!content) return;
  let meta = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
};

const ensureLink = (rel: string, href: string) => {
  if (!href) return;
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

const Seo = () => {
  const location = useLocation();

  useEffect(() => {
    const normalizedPath = normalizePath(location.pathname);
    const base = isNaicRoute(normalizedPath) ? NAIC_BASE : RAKAN_TUTOR_BASE;
    const overrides = ROUTE_OVERRIDES[normalizedPath] ?? {};
    const data: SeoConfig = { ...base, ...overrides };

    const canonical = `${SITE_URL}${normalizedPath === "/" ? "" : normalizedPath}`;
    const ogImage = resolveUrl(data.ogImage);
    const ogTitle = data.ogTitle ?? data.title;
    const ogDescription = data.ogDescription ?? data.description;

    document.title = data.title;

    ensureMeta("name", "description", data.description);
    ensureMeta("property", "og:title", ogTitle);
    ensureMeta("property", "og:description", ogDescription);
    ensureMeta("property", "og:type", "website");
    ensureMeta("property", "og:image", ogImage);
    ensureMeta("property", "og:image:alt", data.ogImageAlt ?? ogTitle);
    ensureMeta("property", "og:url", canonical);
    ensureMeta("property", "og:site_name", data.siteName);

    ensureMeta("name", "twitter:card", data.twitterCard ?? "summary_large_image");
    ensureMeta("name", "twitter:site", data.twitterSite ?? "@RakanTutor");
    ensureMeta("name", "twitter:title", ogTitle);
    ensureMeta("name", "twitter:description", ogDescription);
    ensureMeta("name", "twitter:image", ogImage);
    ensureMeta("name", "twitter:image:alt", data.ogImageAlt ?? ogTitle);

    ensureLink("canonical", canonical);
  }, [location.pathname]);

  return null;
};

export default Seo;
