import { Button } from "@/components/ui/button";
import { branches } from "@/healthdog-data";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type NavItem = {
  readonly label: string;
  readonly href: string;
};

const navItems: readonly NavItem[] = [
  { label: "헬스독", href: "/about" },
  { label: "아이들", href: "/pets" },
  { label: "후기", href: "/reviews" },
  { label: "지점", href: "/branches" },
] as const;

export function Header({ currentPath }: { readonly currentPath: string }): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (href: string): boolean =>
    currentPath === href || currentPath.startsWith(`${href}/`);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-hd-line bg-hd-base/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-4 md:px-10">
        <a href="/">
          <img
            alt="Healthdog"
            className="h-14 w-auto object-contain"
            src="/healthdog_logo_nobg_cropped.png"
          />
        </a>
        <nav className="hidden items-center gap-7 text-sm text-hd-muted md:flex">
          {navItems.map((item) => (
            <a
              className={cn(
                "transition-colors hover:text-hd-ink",
                isActive(item.href) && "font-semibold text-hd-ink",
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild size="sm" variant="health">
            <a href="/branches">지점 상담 안내</a>
          </Button>
        </div>
        <Button
          aria-label="메뉴 열기"
          className="md:hidden"
          onClick={() => setIsOpen(true)}
          size="icon"
          variant="ghost"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      {createPortal(
        <div
          aria-hidden={!isOpen}
          className={cn(
            "fixed inset-0 z-[60] flex justify-end bg-hd-ink/45 transition-opacity duration-300 md:hidden",
            isOpen ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          onClick={() => setIsOpen(false)}
        >
          <nav
            className={cn(
              "flex h-full w-[82vw] max-w-[320px] flex-col bg-hd-base shadow-[0_24px_70px_rgba(38,49,43,0.16)] transition-transform duration-300 ease-out",
              isOpen ? "translate-x-0" : "translate-x-full",
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-hd-line px-5">
              <a href="/">
                <img
                  alt="Healthdog"
                  className="h-14 w-auto object-contain"
                  src="/healthdog_logo_nobg_cropped.png"
                />
              </a>
              <Button
                aria-label="메뉴 닫기"
                onClick={() => setIsOpen(false)}
                size="icon"
                variant="ghost"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="overflow-y-auto py-2">
              {navItems.map((item) => (
                <a
                  className={cn(
                    "block border-b border-hd-line px-6 py-4 text-base text-hd-ink",
                    isActive(item.href) && "font-semibold text-hd-sageDeep",
                  )}
                  href={item.href}
                  key={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>,
        document.body,
      )}
    </header>
  );
}

export function Footer(): JSX.Element {
  return (
    <footer className="border-t border-hd-line bg-hd-cream px-4 py-12 text-sm leading-7 text-hd-muted md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <img
            alt="Healthdog"
            className="h-12 w-auto object-contain"
            src="/healthdog_logo_nobg_cropped.png"
          />
          <p className="mt-4 max-w-2xl">
            헬스독은 아이와 보호자가 만나는 첫 순간을 차분하게 준비하는 상담 중심 사이트입니다.
            사업자/정책 원문은 최종 확인 후 별도 고지합니다.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {branches.map((branch) => (
            <a
              className="text-hd-ink hover:text-hd-sageDeep"
              href={`/branches/${branch.slug}`}
              key={branch.slug}
            >
              {branch.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ContactRail removed (no consultation feature)
export function ContactRail(): null {
  return null;
}
