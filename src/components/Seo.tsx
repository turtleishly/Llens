import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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

const SITE_URL = "https://llens.space";

const LLENS_BASE: SeoConfig = {
  title: "LLens | See Inside a Language Model",
  description:
    "LLens is an interactive, browser-based tool that lets you see exactly how a language model tokenizes text, predicts next tokens, and generates text — all running locally.",
  ogImage: "/llens-og.png",
  ogImageAlt: "LLens — interactive language model explorer",
  siteName: "LLens",
  twitterSite: "@LLens",
  twitterCard: "summary_large_image",
};

const ROUTE_OVERRIDES: Record<string, Partial<SeoConfig>> = {
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
    const overrides = ROUTE_OVERRIDES[normalizedPath] ?? {};
    const data: SeoConfig = { ...LLENS_BASE, ...overrides };

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
    ensureMeta("name", "twitter:site", data.twitterSite ?? "@LLens");
    ensureMeta("name", "twitter:title", ogTitle);
    ensureMeta("name", "twitter:description", ogDescription);
    ensureMeta("name", "twitter:image", ogImage);
    ensureMeta("name", "twitter:image:alt", data.ogImageAlt ?? ogTitle);

    ensureLink("canonical", canonical);
  }, [location.pathname]);

  return null;
};

export default Seo;
