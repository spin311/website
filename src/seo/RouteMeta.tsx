import React from "react";
import { Helmet } from "react-helmet";

import { useLanguage } from "../context/LanguageContext";
import { getPageMeta, SITE_NAME, type Translations } from "./routes";

/** `<` is escaped so a value can never close the script tag. */
const serializeJsonLd = (data: object) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

/**
 * Sets a page's <head> from src/seo/routes.ts. The same component runs in the prerender,
 * where its tags are written into the static HTML (react-helmet marks them with
 * data-react-helmet), and in the browser, where it replaces those tags.
 */
function RouteMeta({ path }: { path: string }) {
  const { text } = useLanguage();
  const meta = getPageMeta(path, text as Translations);

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical} />
      {meta.noindex && <meta name="robots" content="noindex" />}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.canonical} />
      <meta property="og:image" content={meta.image.url} />
      <meta property="og:image:width" content={String(meta.image.width)} />
      <meta property="og:image:height" content={String(meta.image.height)} />
      <meta property="og:image:alt" content={meta.image.alt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image.url} />
      <meta name="twitter:image:alt" content={meta.image.alt} />
      {meta.jsonLd.map((data, index) => (
        <script key={index} type="application/ld+json">
          {serializeJsonLd(data)}
        </script>
      ))}
    </Helmet>
  );
}

export default RouteMeta;
