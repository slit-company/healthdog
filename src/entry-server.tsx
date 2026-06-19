import { App } from "@/App";
import { renderToString } from "react-dom/server";

export {
  PRERENDER_ROUTES,
  SITE_NAME,
  SITE_URL,
  getJsonLd,
  getRouteMeta,
} from "@/healthdog/route-meta";

type LocationShim = {
  readonly pathname: string;
  readonly search: string;
};

export function render(route: string): string {
  const [pathname, query] = route.split("?");
  const location: LocationShim = {
    pathname: pathname ?? "/",
    search: query !== undefined ? `?${query}` : "",
  };
  Reflect.set(globalThis, "window", { location });
  return renderToString(<App />);
}
