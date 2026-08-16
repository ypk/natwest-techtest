import type { Route } from "../+types/root";
import { headAssets } from "./headAssets";

export const rootLinks: Route.LinksFunction = () => [
  { rel: "icon", href: headAssets.favicon, sizes: "any" },
  { rel: "preconnect", href: headAssets.fonts.googleApiOrigin },
  {
    rel: "preconnect",
    href: headAssets.fonts.googleStaticOrigin,
    crossOrigin: "anonymous",
  },
  { rel: "preload", href: headAssets.fonts.stylesheet, as: "style" },
  { rel: "stylesheet", href: headAssets.fonts.stylesheet },
];