import { Button } from "@/components/ui/button";
import { type BranchSlug, branches, pets, reviews } from "@/healthdog-data";
import { ArrowRight } from "lucide-react";
import {
  BranchCard,
  BranchFilter,
  BranchReviewLinks,
  GeneratedBand,
  PetCard,
  ReviewGallery,
  ReviewHighlights,
  SectionIntro,
} from "./ui";

export { BranchDetailPage } from "./detail-pages";

export function getBranchSlug(value: string | null): BranchSlug | undefined {
  return branches.find((branch) => branch.slug === value)?.slug;
}

export function AboutPage(): JSX.Element {
  return (
    <main>
      <section className="bg-hd-base px-4 py-16 md:px-10 md:py-24">
        <SectionIntro
          eyebrow="About Healthdog"
          title="아이를 처음 만나는 순간의 조심스러운 안심감을 준비합니다"
          body="헬스독은 큰 약속보다 확인 가능한 상담, 지점별 아이 상태 확인, 보호자에게 필요한 안내를 우선합니다."
        />
        <GeneratedBand
          alt="헬스독 6개 지점 네트워크"
          desktop="branch-network-desktop.png"
          desktopAspect="md:aspect-[1662/946]"
          mobile="branch-network-mobile.png"
          mobileAspect="aspect-[1036/1519]"
        />
      </section>
      <section className="bg-hd-cream px-4 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-3">
          {[
            {
              title: "상담 전 상태 확인",
              body: "방문 전, 아이의 건강·월령·성격을 먼저 확인해 안내합니다.",
            },
            {
              title: "지점 중심 안내",
              body: "전국 6개 지점에서 직접 보고, 가까운 곳에서 상담할 수 있습니다.",
            },
            {
              title: "과장 없는 조건 상담",
              body: "추가금 없이, 분양 조건을 숨기지 않고 정확히 안내합니다.",
            },
          ].map((card) => (
            <div
              className="rounded-2xl border border-hd-line bg-hd-card p-8 shadow-[0_10px_30px_rgba(57,49,37,0.06)]"
              key={card.title}
            >
              <h2 className="text-2xl font-semibold text-hd-ink">{card.title}</h2>
              <p className="mt-4 text-base leading-8 text-hd-muted">{card.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-hd-base px-4 py-16 md:px-10 md:py-24">
        <GeneratedBand
          alt="헬스독 건강관리 기준 안내"
          desktop="health-standard-desktop.png"
          desktopAspect="md:aspect-[1586/992]"
          mobile="health-standard-mobile.png"
          mobileAspect="aspect-[1036/1519]"
        />
      </section>
    </main>
  );
}

export function PetsPage({
  activeBranch,
}: { readonly activeBranch?: BranchSlug | undefined }): JSX.Element {
  const visiblePets = activeBranch ? pets.filter((pet) => pet.branch === activeBranch) : pets;
  return (
    <main className="bg-hd-base px-4 py-16 md:px-10 md:py-24">
      <SectionIntro
        eyebrow="Pets"
        title="아이들 보기"
        body="받은 사진을 중심으로 보여드리며, 월령과 세부 상태는 지점 상담에서 확인합니다."
      />
      <GeneratedBand
        alt="헬스독에서 상담 가능한 아이들 콜라주"
        className="mb-10"
        desktop="pets-collage-desktop.png"
        desktopAspect="md:aspect-[1993/789]"
        mobile="pets-collage-mobile.png"
        mobileAspect="aspect-[1132/1389]"
      />
      <BranchFilter activeBranch={activeBranch} />
      <div className="mx-auto grid max-w-[1400px] gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-8 text-hd-muted">
        조건은 아이와 지점 상황에 따라 상담으로 확인합니다.
      </p>
    </main>
  );
}

export function ReviewsPage(): JSX.Element {
  const highlightReviews = reviews.filter((review) =>
    ["ic-r01", "ic-p08", "bs-p01"].includes(review.id),
  );
  return (
    <main className="bg-hd-base pb-16 md:pb-24">
      <div className="px-4 pb-10 pt-16 md:px-10 md:pt-24">
        <SectionIntro
          eyebrow="Reviews"
          title="분양 후기"
          body="헬스독 6개 지점에 쌓인 네이버 실제 방문자 후기입니다. 사진을 누르면 해당 지점 네이버 플레이스 원문 리뷰로 이동합니다."
        />
        <ReviewHighlights reviews={highlightReviews} />
      </div>
      <ReviewGallery reviews={reviews} />
      <BranchReviewLinks />
    </main>
  );
}

export function BranchesPage(): JSX.Element {
  return (
    <main>
      <section className="bg-hd-cream px-4 py-16 md:px-10 md:py-24">
        <SectionIntro
          eyebrow="Branches"
          title="6개 지점 안내"
          body="전화, 채널, 원문 링크는 확인 가능한 범위에서 연결하고 불확실한 세부 운영 정보는 상담 전 확인으로 표시합니다."
        />
        <GeneratedBand
          alt="헬스독 6개 지점 네트워크"
          desktop="branch-network-desktop.png"
          desktopAspect="md:aspect-[1662/946]"
          mobile="branch-network-mobile.png"
          mobileAspect="aspect-[1036/1519]"
        />
        <div className="mx-auto mt-12 grid max-w-[1400px] gap-6 md:grid-cols-3">
          {branches.map((branch) => (
            <BranchCard branch={branch} key={branch.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}

export function NotFoundPage(): JSX.Element {
  return (
    <main className="bg-hd-base px-4 py-24 text-center">
      <h1 className="font-health text-4xl text-hd-ink">페이지를 찾을 수 없습니다</h1>
      <Button asChild className="mt-8" variant="health">
        <a href="/">
          메인으로 이동
          <ArrowRight className="h-4 w-4" />
        </a>
      </Button>
    </main>
  );
}
