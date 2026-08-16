import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
} from "react-router";

export function DocumentLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <DocumentHead />
      <DocumentBody>{children}</DocumentBody>
    </html>
  );
}

function DocumentHead() {
  return (
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
  );
}

function DocumentBody({ children }: { children: React.ReactNode }) {
  return (
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
    </body>
  );
}