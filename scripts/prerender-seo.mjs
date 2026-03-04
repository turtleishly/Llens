import fs from "node:fs/promises";
import path from "node:path";

const SITE_URL = "https://llens.space";
const OUTPUT_DIR = path.resolve(process.cwd(), "dist");
const INDEX_PATH = path.join(OUTPUT_DIR, "index.html");

// Keep in sync with src/components/Seo.tsx
const LLENS_BASE = {
  title: "LLens | See Inside a Language Model",
  description:
    "LLens is an interactive, browser-based tool that lets you see exactly how a language model tokenizes text, predicts next tokens, and generates text — all running locally.",
  ogImage: "/llens-og.png",
  ogImageAlt: "LLens — interactive language model explorer",
  siteName: "LLens",
  twitterSite: "@LLens",
  twitterCard: "summary_large_image",
};

const ROUTE_OVERRIDES = {
  "/": {
    title: "LLens | See Inside a Language Model",
    description:
      "An interactive, in-browser tool for exploring tokenization, next-token prediction, and text generation with GPT-2.",
  },
  "/llens": {
    title: "LLens | Interactive Demo",
    description:
      "Try the LLens interactive demo: run GPT-2 in your browser, inspect tokens, and explore how temperature affects generation.",
  },
  "/llens/start": {
    title: "LLens | See Inside a Language Model",
    description:
      "An interactive, in-browser tool for exploring tokenization, next-token prediction, and text generation with GPT-2.",
  },
  "/llens/chapter-1": {
    title: "LLens Chapter 1 | Token Foundations",
    description:
      "Chapter 1 of LLens: learn how tokenization works and why whitespace changes meaning.",
  },
  "/llens/chapter-2": {
    title: "LLens Chapter 2 | How LLMs Generate",
    description:
      "Chapter 2 of LLens: explore next-token prediction with a guided guessing game.",
  },
  "/llens/guide": {
    title: "LLens Chapter 1 | Token Foundations",
    description:
      "Chapter 1 of LLens: learn how tokenization works and why whitespace changes meaning.",
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
  const overrides = ROUTE_OVERRIDES[normalizedPath] ?? {};
  const data = { ...LLENS_BASE, ...overrides };

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
  html = replaceMeta(html, "name", "twitter:image:alt", data.ogImageAlt ?? ogTitle);

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
