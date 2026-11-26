import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Helmet } from "react-helmet";
import { StaticRouter } from "react-router-dom";
import { Writable } from "node:stream";

import AppRoutes from "./AppRoutes";

export { NOT_FOUND_PATH, PRERENDER_PATHS } from "./seo/routes";

export type RenderedPage = {
  /** Markup for the inside of <div id="root"> */
  html: string;
  /** Tags react-helmet collected, ready for <head> */
  head: string;
};

/**
 * Renders one URL to static HTML. Resolves after every lazy route has loaded, so the
 * markup is the finished page and not a Suspense fallback.
 */
export function render(url: string): Promise<RenderedPage> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const sink = new Writable({
      write(chunk: Buffer, _encoding, callback) {
        chunks.push(chunk);
        callback();
      },
    });
    sink.on("finish", () => {
      const helmet = Helmet.renderStatic();
      resolve({
        html: Buffer.concat(chunks).toString("utf8"),
        head: [helmet.title, helmet.meta, helmet.link, helmet.script]
          .map((tags) => tags.toString())
          .join("\n    "),
      });
    });

    const stream = renderToPipeableStream(
      <React.StrictMode>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </React.StrictMode>,
      {
        onAllReady() {
          stream.pipe(sink);
        },
        onShellError: reject,
        onError(error) {
          reject(error instanceof Error ? error : new Error(String(error)));
        },
      },
    );
  });
}
