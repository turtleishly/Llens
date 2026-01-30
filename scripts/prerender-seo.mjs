import fs from "node:fs/promises";
import path from "node:path";

const SITE_URL = "https://rakantutor.org";
const OUTPUT_DIR = path.resolve(process.cwd(), "dist");
const INDEX_PATH = path.join(OUTPUT_DIR, "index.html");

// Keep in sync with src/components/Seo.tsx
const RAKAN_TUTOR_BASE = {
  title: "Rakan Tutor | AI Education for Youth",
  description:
    "Rakan Tutor provides hybrid AI programs, hands-on workshops, and an accessible digital learning platform for ASEAN youth.",
  ogImage: "/rakan_tutor_hero.png",
  ogImageAlt: "Rakan Tutor community learning AI",
  siteName: "Rakan Tutor",
  twitterSite: "@RakanTutor",
  twitterCard: "summary_large_image",
};

const NAIC_BASE = {
  title: "NAIC '26 | National AI Competition 2026",
  description:
    "National AI Competition 2026 (NAIC '26), organized by Rakan Tutor & Sunway University. Join Malaysia's largest youth AI challenge.",
  ogImage: "/og-image.svg",
  ogImageAlt: "National AI Competition 2026",
  siteName: "NAIC '26",
  twitterSite: "@RakanTutor",
  twitterCard: "summary_large_image",
};

const ROUTE_OVERRIDES = {
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

const normalizePath = (pathname) => {
  if (!pathname) return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
};

const resolveUrl = (value) => {
  if (!value) return value;
  if (value.startsWith("http")) return value;
  return `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;
};

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const upsertTag = (html, pattern, replacement) => {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }
  return html.replace("</head>", `  ${replacement}\n</head>`);
};

const replaceTitle = (html, title) =>
  html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`);

const replaceMeta = (html, attr, key, content) => {
  const escapedKey = key.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const pattern = new RegExp(`<meta\\s+${attr}="${escapedKey}"[^>]*>`, "i");
  const replacement = `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`;
  return upsertTag(html, pattern, replacement);
};

const replaceLink = (html, rel, href) => {
  const escapedRel = rel.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const pattern = new RegExp(`<link\\s+rel="${escapedRel}"[^>]*>`, "i");
  const replacement = `<link rel="${rel}" href="${escapeHtml(href)}" />`;
  return upsertTag(html, pattern, replacement);
};

const buildHtml = (baseHtml, routePath) => {
  const normalizedPath = normalizePath(routePath);
  const isNaicRoute = normalizedPath.startsWith("/naic");
  const base = isNaicRoute ? NAIC_BASE : RAKAN_TUTOR_BASE;
  const overrides = ROUTE_OVERRIDES[normalizedPath] ?? {};
  const data = { ...base, ...overrides };

  const canonical = `${SITE_URL}${normalizedPath === "/" ? "" : normalizedPath}`;
  const ogImage = resolveUrl(data.ogImage);
  const ogTitle = data.ogTitle ?? data.title;
  const ogDescription = data.ogDescription ?? data.description;

  let html = baseHtml;

  html = replaceTitle(html, data.title);
  html = replaceMeta(html, "name", "description", data.description);
  html = replaceMeta(html, "property", "og:title", ogTitle);
  html = replaceMeta(html, "property", "og:description", ogDescription);
  html = replaceMeta(html, "property", "og:type", "website");
  html = replaceMeta(html, "property", "og:image", ogImage);
  html = replaceMeta(html, "property", "og:image:alt", data.ogImageAlt ?? ogTitle);
  html = replaceMeta(html, "property", "og:url", canonical);
  html = replaceMeta(html, "property", "og:site_name", data.siteName);

  html = replaceMeta(html, "name", "twitter:card", data.twitterCard);
  html = replaceMeta(html, "name", "twitter:site", data.twitterSite);
  html = replaceMeta(html, "name", "twitter:title", ogTitle);
  html = replaceMeta(html, "name", "twitter:description", ogDescription);
  html = replaceMeta(html, "name", "twitter:image", ogImage);
  html = replaceMeta(
    html,
    "name",
    "twitter:image:alt",
    data.ogImageAlt ?? ogTitle
  );

  html = replaceLink(html, "canonical", canonical);

  return html;
};

const writeRouteHtml = async (baseHtml, routePath) => {
  const normalizedPath = normalizePath(routePath);
  const outputPath =
    normalizedPath === "/"
      ? INDEX_PATH
      : path.join(OUTPUT_DIR, normalizedPath.slice(1), "index.html");
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const html = buildHtml(baseHtml, normalizedPath);
  await fs.writeFile(outputPath, html, "utf8");
};

const run = async () => {
  let baseHtml;
  try {
    baseHtml = await fs.readFile(INDEX_PATH, "utf8");
  } catch (error) {
    console.error("Unable to read dist/index.html. Did you run vite build?");
    throw error;
  }

  const routes = Object.keys(ROUTE_OVERRIDES);
  await Promise.all(routes.map((route) => writeRouteHtml(baseHtml, route)));
};

run();
