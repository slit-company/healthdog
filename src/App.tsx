import { ContactRail, Footer, Header } from "@/components/healthdog/chrome";
import { HomePage } from "@/components/healthdog/home-page";
import {
  AboutPage,
  BranchDetailPage,
  BranchesPage,
  NotFoundPage,
  PetsPage,
  PrivacyPage,
  ReviewsPage,
  getBranchSlug,
} from "@/components/healthdog/pages";
import { DesignSystemPage } from "@/components/pages/design-system-page";
import { SITE_URL, getRouteMeta } from "@/healthdog/route-meta";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

function normalizePath(pathname: string): string {
  if (pathname === "/home") return "/";
  if (pathname === "/babies") return "/pets";
  return pathname.replace(/\/$/, "") || "/";
}

function setMetaTag(key: string, content: string): void {
  const existing = document.head.querySelector<HTMLMetaElement>(`meta[name="${key}"]`);
  const el = existing ?? document.createElement("meta");
  el.setAttribute("name", key);
  el.setAttribute("content", content);
  if (existing === null) {
    document.head.appendChild(el);
  }
}

function setCanonical(href: string): void {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const el = existing ?? document.createElement("link");
  el.setAttribute("rel", "canonical");
  el.setAttribute("href", href);
  if (existing === null) {
    document.head.appendChild(el);
  }
}

export function App(): JSX.Element {
  const currentPath = normalizePath(window.location.pathname);
  const searchParams = new URLSearchParams(window.location.search);
  const selectedBranch = getBranchSlug(searchParams.get("branch"));

  useEffect(() => {
    const meta = getRouteMeta(currentPath);
    document.title = meta.title;
    setMetaTag("description", meta.description);
    setCanonical(`${SITE_URL}${meta.canonicalPath}`);
  }, [currentPath]);

  if (currentPath === "/design-system") {
    return <DesignSystemPage />;
  }

  const branchPath = currentPath.startsWith("/branches/")
    ? getBranchSlug(currentPath.slice("/branches/".length))
    : undefined;

  let page: JSX.Element;
  switch (currentPath) {
    case "/":
      page = <HomePage />;
      break;
    case "/about":
      page = <AboutPage />;
      break;
    case "/pets":
      page = <PetsPage activeBranch={selectedBranch} />;
      break;
    case "/reviews":
      page = <ReviewsPage />;
      break;
    case "/branches":
      page = <BranchesPage />;
      break;
    case "/privacy":
      page = <PrivacyPage />;
      break;
    default:
      page = branchPath ? <BranchDetailPage branchSlug={branchPath} /> : <NotFoundPage />;
  }

  return (
    <div className={cn("min-h-screen bg-hd-base text-hd-ink antialiased")}>
      <Header currentPath={currentPath} />
      {page}
      <Footer />
      <ContactRail />
    </div>
  );
}
