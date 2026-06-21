import { Button } from "@/components/ui/button";
import { REP_PHONE_HREF } from "@/healthdog/contact";
import { branches } from "@/healthdog-data";
import { cn } from "@/lib/utils";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
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
      {typeof document !== "undefined" &&
        createPortal(
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
  const licensedBranches = branches.filter(
    (branch) => branch.animalSalesLicenseNumber !== undefined,
  );
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
      <div className="mx-auto mt-10 max-w-[1400px] border-t border-hd-line pt-6 text-xs leading-6 text-hd-muted/90">
        {licensedBranches.length > 0 ? (
          <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {licensedBranches.map((branch) => (
              <li key={branch.slug}>
                {`${branch.name} · 대표 ${branch.representative ?? "확인 중"} · 사업자등록번호 ${branch.businessRegistrationNumber ?? "확인 중"} · 동물판매업 ${branch.animalSalesLicenseNumber ?? "확인 중"}`}
              </li>
            ))}
          </ul>
        ) : (
          <p>사업자 정보 및 동물판매업 등록번호는 지점별 확인 후 순차 고지 예정입니다.</p>
        )}
        <p className="mt-4">
          <a className="text-hd-ink underline-offset-2 hover:underline" href="/privacy">
            개인정보처리방침
          </a>
        </p>
      </div>
    </footer>
  );
}

function kakaoBranchList(
  items: readonly { readonly slug: string; readonly name: string; readonly href: string }[],
  onPick: () => void,
): JSX.Element {
  return (
    <div className="rounded-2xl border border-hd-line bg-hd-card p-2 shadow-[0_16px_42px_rgba(38,49,43,0.18)]">
      <p className="px-3 pb-1 pt-1 text-xs text-hd-muted">카톡 상담 지점 선택</p>
      {items.map((item) => (
        <a
          className="block rounded-lg px-3 py-2.5 text-sm font-medium text-hd-ink transition hover:bg-hd-sage"
          href={item.href}
          key={item.slug}
          onClick={onPick}
          rel="noopener noreferrer"
          target="_blank"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}

export function ContactRail(): JSX.Element {
  const [kakaoOpen, setKakaoOpen] = useState(false);
  const kakaoBranches = branches.flatMap((branch) =>
    branch.kakaoHref ? [{ slug: branch.slug, name: branch.name, href: branch.kakaoHref }] : [],
  );
  const closeKakao = (): void => setKakaoOpen(false);

  useEffect(() => {
    if (!kakaoOpen) return;
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setKakaoOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [kakaoOpen]);

  return (
    <>
      {kakaoOpen ? (
        <button
          aria-label="카톡 지점 목록 닫기"
          className="fixed inset-0 z-30 cursor-default"
          onClick={closeKakao}
          type="button"
        />
      ) : null}
      <nav
        aria-label="빠른 상담"
        className="fixed right-3 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2.5 md:gap-3"
      >
        <a
          className="flex h-[70px] w-[70px] flex-col items-center justify-center gap-1 rounded-full bg-hd-green text-hd-ink shadow-[0_10px_30px_rgba(92,191,111,0.30)] transition hover:-translate-y-0.5"
          href={REP_PHONE_HREF}
        >
          <Phone className="h-5 w-5" />
          <span className="text-[11px] font-semibold">전화연결</span>
        </a>
        <div className="relative">
          <button
            aria-expanded={kakaoOpen}
            className="flex h-[70px] w-[70px] flex-col items-center justify-center gap-1 rounded-full bg-[#FEE500] text-[#3c1e1e] shadow-[0_10px_30px_rgba(38,49,43,0.16)] transition hover:-translate-y-0.5"
            onClick={() => setKakaoOpen((open) => !open)}
            type="button"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-[11px] font-semibold">카톡상담</span>
          </button>
          {kakaoOpen ? (
            <div className="absolute right-full top-1/2 mr-3 w-48 -translate-y-1/2">
              {kakaoBranchList(kakaoBranches, closeKakao)}
            </div>
          ) : null}
        </div>
      </nav>
    </>
  );
}
