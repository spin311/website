import { Link } from "react-router-dom";
import { ReactNode } from "react";
import React from "react";

type LinkComponentProps = {
  href: string;
  children: ReactNode;
  classList?: string;
  internal?: boolean;
};

function LinkComponent({
  href,
  children,
  classList = "",
  internal = true,
}: LinkComponentProps) {
  const isInternalLink = internal && href.startsWith("/");
  return (
    <>
      {isInternalLink ? (
        <Link to={href} className={classList}>
          {children}
        </Link>
      ) : (
        <a
          href={href}
          className={classList}
          target={"_blank"}
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )}
    </>
  );
}

export default LinkComponent;
