import { ContactRail, Footer, Header } from "@/components/healthdog/chrome";
import { HomePage } from "@/components/healthdog/home-page";
import {
  AboutPage,
  BranchDetailPage,
  BranchesPage,
  NotFoundPage,
  PetsPage,
  ReviewsPage,
  getBranchSlug,
} from "@/components/healthdog/pages";
import { DesignSystemPage } from "@/components/pages/design-system-page";
import { branches } from "@/healthdog-data";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const defaultTitle = "헬스독";

const routeTitles: Record<string, string> = {
  "/": "헬스독 | 건강한 만남을 준비하는 상담",
  "/about": "헬스독 소개",
  "/pets": "헬스독 아이들 보기",
  "/reviews": "헬스독 분양 후기",
  "/branches": "헬스독 지점 안내",
  "/design-system": "헬스독 디자인 시스템 프리뷰",
};

function normalizePath(pathname: string): string {
  if (pathname === "/home") return "/";
  if (pathname === "/babies") return "/pets";
  return pathname.replace(/\/$/, "") || "/";
}

function getRouteTitle(pathname: string): string {
  const branch = branches.find((item) => pathname === `/branches/${item.slug}`);
  return branch ? `헬스독 ${branch.name}` : (routeTitles[pathname] ?? defaultTitle);
}

export function App(): JSX.Element {
  const currentPath = normalizePath(window.location.pathname);
  const searchParams = new URLSearchParams(window.location.search);
  const selectedBranch = getBranchSlug(searchParams.get("branch"));

  useEffect(() => {
    document.title = getRouteTitle(currentPath);
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
