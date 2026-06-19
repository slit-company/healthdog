import { branches, pets, reviews } from "@/healthdog-data";
import {
  BranchCard,
  CtaRow,
  GeneratedBand,
  PetCard,
  ReviewGallery,
  ReviewHighlights,
  SectionIntro,
  TrustStats,
} from "./ui";

export function HomePage(): JSX.Element {
  const highlightReviews = reviews.filter((review) =>
    ["ic-r01", "ic-p08", "bs-p01"].includes(review.id),
  );
  return (
    <main>
      <section className="bg-hd-base px-4 pb-14 pt-6 md:px-10 md:pb-24">
        <GeneratedBand
          alt="건강한 만남을 준비하는 헬스독 메인 히어로"
          desktop="main-hero-desktop.png"
          desktopAspect="md:aspect-[1993/789]"
          mobile="main-hero-mobile.png"
          mobileAspect="aspect-[1132/1389]"
        />
        <CtaRow />
      </section>
      <TrustStats />
      <section className="bg-hd-cream px-4 py-16 md:px-10 md:py-24">
        <SectionIntro eyebrow="Branch network" title="가까운 6개 지점에서 먼저 상담합니다" />
        <GeneratedBand
          alt="창원, 수원, 부산, 평택, 인천김포, 송파 6개 헬스독 지점 네트워크"
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
      <section className="bg-hd-base px-4 py-16 md:px-10 md:py-24">
        <SectionIntro eyebrow="Pets" title="사진 중심으로 보고, 조건은 상담으로 확인합니다" />
        <GeneratedBand
          alt="헬스독에서 상담 가능한 아이들 콜라주"
          desktop="pets-collage-desktop.png"
          desktopAspect="md:aspect-[1993/789]"
          mobile="pets-collage-mobile.png"
          mobileAspect="aspect-[1132/1389]"
        />
        <div className="mx-auto mt-12 grid max-w-[1400px] gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </section>
      <section className="bg-hd-base py-16 md:py-24">
        <div className="px-4 md:px-10">
          <SectionIntro
            eyebrow="Reviews"
            title="네이버 플레이스 후기 모음"
            body="네이버 플레이스에 쌓인 실제 방문자 후기 중 대표 후기를 모았습니다."
          />
          <ReviewHighlights reviews={highlightReviews} />
        </div>
        <ReviewGallery reviews={reviews.slice(0, 15)} />
        <div className="mt-8 flex justify-center px-4">
          <a
            className="inline-flex items-center gap-2 rounded-full border border-hd-line bg-hd-card px-6 py-3 text-sm font-medium text-hd-ink shadow-sm transition hover:border-hd-sageDeep/40 hover:shadow-md"
            href="/reviews"
          >
            후기 전체 보기
          </a>
        </div>
      </section>
    </main>
  );
}
