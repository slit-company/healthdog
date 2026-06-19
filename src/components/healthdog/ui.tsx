import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  type Branch,
  type BranchSlug,
  type Review,
  branches,
  generatedImage,
} from "@/healthdog-data";
import { cn } from "@/lib/utils";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";

type SectionIntroProps = {
  readonly eyebrow: string;
  readonly title: string;
  readonly body?: string;
  readonly align?: "left" | "center";
};

export function SectionIntro({
  eyebrow,
  title,
  body,
  align = "center",
}: SectionIntroProps): JSX.Element {
  return (
    <div className={cn("mb-12 max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Badge className="mb-4" variant="healthYellow">
        {eyebrow}
      </Badge>
      <h2 className="text-balance font-health text-[28px] font-medium leading-[1.35] text-hd-ink md:text-[38px]">
        {title}
      </h2>
      {body ? <p className="mt-4 text-base leading-8 text-hd-muted md:text-lg">{body}</p> : null}
    </div>
  );
}

type GeneratedBandProps = {
  readonly desktop: string;
  readonly mobile: string;
  readonly alt: string;
  readonly desktopAspect: string;
  readonly mobileAspect: string;
  readonly className?: string;
};

export function GeneratedBand({
  desktop,
  mobile,
  alt,
  desktopAspect,
  mobileAspect,
  className,
}: GeneratedBandProps): JSX.Element {
  return (
    <div className={cn("mx-auto max-w-[1440px]", className)}>
      <picture
        className={cn(
          "block overflow-hidden rounded-2xl border border-hd-line bg-hd-card shadow-[0_1px_0_rgba(38,49,43,0.06)]",
          mobileAspect,
          desktopAspect,
        )}
      >
        <source media="(max-width: 767px)" srcSet={generatedImage(mobile)} />
        <img alt={alt} className="h-full w-full object-cover" src={generatedImage(desktop)} />
      </picture>
    </div>
  );
}

export function CtaRow(): JSX.Element {
  return (
    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
      <Button asChild variant="health">
        <a href="/branches">
          지점 상담 안내
          <MapPin className="h-4 w-4" />
        </a>
      </Button>
      <Button asChild variant="healthSecondary">
        <a href="/pets">
          아이들 보러가기
          <ArrowRight className="h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}

export function BranchCard({ branch }: { readonly branch: Branch }): JSX.Element {
  return (
    <Card className="h-full border-hd-line bg-hd-card shadow-[0_10px_30px_rgba(57,49,37,0.06)] transition hover:-translate-y-0.5 hover:border-hd-sageDeep/40 hover:shadow-[0_16px_42px_rgba(57,49,37,0.10)]">
      <CardContent className="flex h-full flex-col p-8 md:p-9">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge variant="health">방문 예약 상담</Badge>
            <h3 className="mt-5 text-[28px] font-semibold leading-tight text-hd-ink">
              {branch.name}
            </h3>
            <p className="mt-2 text-base text-hd-muted">{branch.region}</p>
          </div>
          <MapPin className="h-7 w-7 text-hd-sageDeep" />
        </div>
        <p className="mt-6 text-base leading-8 text-hd-muted">{branch.summary}</p>
        <dl className="mt-6 space-y-3 text-base leading-8 text-hd-muted">
          <div>
            <dt className="inline font-semibold text-hd-ink">주소 </dt>
            <dd className="inline">{branch.address}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-hd-ink">전화 </dt>
            <dd className="inline">{branch.phone}</dd>
          </div>
        </dl>
        <div className="mt-auto flex flex-wrap gap-3 pt-7">
          <Button asChild variant="healthOutline">
            <a href={`/branches/${branch.slug}`}>상세 보기</a>
          </Button>
          {branch.channels.map((channel) => (
            <Button asChild key={channel.label} variant="healthOutline">
              <a href={channel.href} rel="noopener noreferrer" target="_blank">
                {channel.label}
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function PetCard({ pet }: { readonly pet: { id: string; name: string; image: string; type: string; branch: BranchSlug; status: string } }): JSX.Element {
  const branch = branches.find((item) => item.slug === pet.branch);
  return (
    <Card className="group overflow-hidden border-hd-line bg-hd-card shadow-[0_10px_30px_rgba(57,49,37,0.06)]">
      <div className="aspect-square overflow-hidden">
        <img
          alt={`${pet.name} ${pet.type} 사진`}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          src={pet.image}
        />
      </div>
      <CardContent className="p-7">
        <h3 className="text-2xl font-semibold leading-tight text-hd-ink">{pet.name}</h3>
        <p className="mt-3 text-base text-hd-muted">
          {pet.type} · {branch?.name ?? "지점 상담"}
        </p>
        <p className="mt-2 text-base text-hd-muted">{pet.status}</p>
        <Button asChild className="mt-6 w-full" variant="healthSecondary">
          <a
            href={branch?.naverPlaceHref ?? "/branches"}
            rel="noopener noreferrer"
            target="_blank"
          >
            지점 네이버 지도
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

export function ReviewGallery({
  reviews,
}: { readonly reviews: readonly Review[] }): JSX.Element {
  if (reviews.length === 0) {
    return (
      <p className="py-16 text-center text-base text-hd-muted">
        이 지점의 후기가 아직 등록되지 않았습니다.
      </p>
    );
  }

  return (
    <div className="px-4 md:px-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {reviews.map((review) => (
          <a
            className="group relative block aspect-square overflow-hidden"
            href={review.href}
            key={review.id}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt={review.excerpt.slice(0, 60)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              src={review.image}
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="line-clamp-3 text-sm leading-snug text-white">
                {review.excerpt}
              </p>
              <p className="mt-1 text-xs text-white/60">{review.source}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function branchReviewHref(naverPlaceHref: string): string {
  const id = naverPlaceHref.split("/").pop() ?? "";
  return `https://pcmap.place.naver.com/place/${id}/review/visitor`;
}

export function BranchReviewLinks(): JSX.Element {
  return (
    <div className="mx-auto mt-14 max-w-[1000px] px-4 text-center">
      <h3 className="font-health text-2xl text-hd-ink">지점별 후기 더 보기</h3>
      <p className="mt-3 text-base text-hd-muted">
        각 지점 버튼을 누르면 네이버 플레이스 방문자 리뷰 전체를 확인할 수 있습니다.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        {branches.map((branch) => (
          <Button asChild key={branch.slug} variant="healthOutline">
            <a
              href={branchReviewHref(branch.naverPlaceHref)}
              rel="noopener noreferrer"
              target="_blank"
            >
              {branch.name} 후기
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}

// 헬스독 공식 지표 — 네이버 플레이스(송파 본점) 기준. 값 변경 시 여기만 수정.
const brandStats = [
  { value: "45,000건+", label: "누적 분양" },
  { value: "2,158건", label: "네이버 실제 후기" },
  { value: "0.7%", label: "분양 후 클레임률" },
  { value: "24시간", label: "상담 운영" },
] as const;

export function TrustStats(): JSX.Element {
  return (
    <section className="bg-hd-base px-4 pb-16 pt-2 md:px-10 md:pb-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {brandStats.map((stat) => (
            <div
              className="rounded-2xl border border-hd-line bg-hd-card px-5 py-7 text-center shadow-[0_10px_30px_rgba(57,49,37,0.06)]"
              key={stat.label}
            >
              <div className="whitespace-nowrap font-health text-2xl font-semibold leading-none text-hd-sageDeep md:text-[2.5rem]">
                {stat.value}
              </div>
              <div className="mt-3 text-sm text-hd-muted md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm leading-7 text-hd-muted md:text-base">
          전국 연계병원 80여 곳 · 분양 전 건강검진 2회 + 분양 후 무료 1회 · 추가금 없는 정찰제
        </p>
      </div>
    </section>
  );
}

export function ReviewHighlights({
  reviews: items,
}: { readonly reviews: readonly Review[] }): JSX.Element {
  return (
    <div className="mx-auto mb-12 grid max-w-[1400px] gap-6 md:grid-cols-3">
      {items.map((review) => (
        <figure
          className="flex h-full flex-col rounded-2xl border border-hd-line bg-hd-card p-7 shadow-[0_10px_30px_rgba(57,49,37,0.06)]"
          key={review.id}
        >
          <Badge className="w-fit" variant="healthYellow">
            {review.source}
          </Badge>
          <blockquote className="mt-4 flex-1 text-base leading-8 text-hd-ink">
            “{review.excerpt}”
          </blockquote>
          <figcaption className="mt-5 text-sm font-medium text-hd-muted">
            {branches.find((branch) => branch.slug === review.branch)?.name ?? "헬스독"}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function BranchFilter({
  activeBranch,
}: { readonly activeBranch?: BranchSlug | undefined }): JSX.Element {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-3">
      <Button asChild className="min-w-[88px]" variant={activeBranch ? "healthOutline" : "health"}>
        <a href="/pets">전체</a>
      </Button>
      {branches.map((branch) => (
        <Button
          asChild
          className="min-w-[88px]"
          key={branch.slug}
          variant={activeBranch === branch.slug ? "health" : "healthOutline"}
        >
          <a href={`/pets?branch=${branch.slug}`}>{branch.name}</a>
        </Button>
      ))}
    </div>
  );
}
