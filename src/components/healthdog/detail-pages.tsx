import { Button } from "@/components/ui/button";
import { type BranchSlug, branches } from "@/healthdog-data";
import { ExternalLink } from "lucide-react";
import { GeneratedBand, SectionIntro, telHref } from "./ui";

function reviewHref(naverPlaceHref: string): string {
  const id = naverPlaceHref.split("/").pop() ?? "";
  return `https://pcmap.place.naver.com/place/${id}/review/visitor`;
}

export function BranchDetailPage({ branchSlug }: { readonly branchSlug: BranchSlug }): JSX.Element {
  const branch =
    branches.find((item) => item.slug === branchSlug) ??
    branches.find((item) => item.slug === "suwon");

  if (branch === undefined) {
    return (
      <main className="bg-hd-base px-4 py-24 text-center">
        <h1 className="font-health text-4xl text-hd-ink">지점 정보를 찾을 수 없습니다</h1>
      </main>
    );
  }

  const phoneTel = telHref(branch.phone);
  const directLinks = [
    {
      label: "네이버 플레이스 후기",
      desc: "방문자 리뷰와 실사 사진을 직접 확인하세요.",
      href: reviewHref(branch.naverPlaceHref),
    },
    {
      label: "블로그",
      desc: "분양 가능한 아이들과 후기 글을 확인하세요.",
      href: branch.blogHref,
    },
    ...(branch.instagramHref.includes("instagram.com")
      ? [
          {
            label: "인스타그램",
            desc: "최신 아이들 사진과 소식을 확인하세요.",
            href: branch.instagramHref,
          },
        ]
      : []),
  ];

  return (
    <main className="bg-hd-base px-4 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionIntro
              align="left"
              eyebrow="Branch detail"
              title={branch.name}
              body={branch.summary}
            />
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="health">
                <a href={branch.naverPlaceHref} rel="noopener noreferrer" target="_blank">
                  네이버 지도 보기
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              {branch.kakaoHref ? (
                <Button asChild variant="healthSecondary">
                  <a href={branch.kakaoHref} rel="noopener noreferrer" target="_blank">
                    카카오 채널
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
          <GeneratedBand
            alt={`${branch.name} 매장에서 만나는 헬스독 아이들 이미지`}
            className="max-w-none"
            desktop="consultation-cta-desktop.png"
            desktopAspect="md:aspect-[2172/724]"
            mobile="consultation-cta-mobile.png"
            mobileAspect="aspect-[1132/1389]"
          />
        </div>

        <div className="mt-12 rounded-2xl border border-hd-line bg-hd-card p-8 shadow-[0_10px_30px_rgba(57,49,37,0.06)]">
          <dl className="grid gap-6 text-base leading-8 text-hd-muted sm:grid-cols-3">
            <div>
              <dt className="font-semibold text-hd-ink">주소</dt>
              <dd>{branch.address}</dd>
            </div>
            <div>
              <dt className="font-semibold text-hd-ink">전화번호</dt>
              <dd>
                {phoneTel ? (
                  <a className="hover:underline" href={phoneTel}>
                    {branch.phone}
                  </a>
                ) : (
                  branch.phone
                )}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-hd-ink">영업시간</dt>
              <dd>{branch.realHours ?? branch.hours}</dd>
            </div>
            {branch.animalSalesLicenseNumber ? (
              <div>
                <dt className="font-semibold text-hd-ink">동물판매업 등록번호</dt>
                <dd>{branch.animalSalesLicenseNumber}</dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="mt-14">
          <h2 className="font-health text-2xl text-hd-ink md:text-3xl">
            {branch.name} 아이들과 후기 직접 보기
          </h2>
          <p className="mt-3 text-base leading-8 text-hd-muted">
            분양 가능한 아이들과 실제 후기는 아래 채널에서 직접 확인하실 수 있습니다.
          </p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {directLinks.map((link) => (
              <a
                className="group rounded-2xl border border-hd-line bg-hd-card p-7 shadow-[0_10px_30px_rgba(57,49,37,0.06)] transition hover:-translate-y-0.5 hover:border-hd-sageDeep/40 hover:shadow-[0_16px_42px_rgba(57,49,37,0.10)]"
                href={link.href}
                key={link.label}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-hd-ink">{link.label}</h3>
                  <ExternalLink className="h-5 w-5 text-hd-sageDeep" />
                </div>
                <p className="mt-3 text-base leading-7 text-hd-muted">{link.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
