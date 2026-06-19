import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { previewBranches, previewPets, previewReviews } from "@/healthdog-preview-data";
import { ArrowRight, ExternalLink, MapPin, Phone } from "lucide-react";

const generatedAsset = (name: string): string => `/assets/healthdog/generated/${name}`;

function SectionTitle({
  eyebrow,
  title,
  body,
}: {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
}): JSX.Element {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <Badge className="mb-4" variant="healthYellow">
        {eyebrow}
      </Badge>
      <h2 className="text-balance font-health text-3xl leading-snug text-hd-ink md:text-[42px]">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-8 text-hd-muted">{body}</p>
    </div>
  );
}

export function ImageBand(): JSX.Element {
  return (
    <section className="bg-hd-base px-4 pb-14 pt-6 md:px-10 md:pb-24">
      <div className="mx-auto max-w-[1440px]">
        <picture>
          <source media="(max-width: 767px)" srcSet={generatedAsset("main-hero-mobile.png")} />
          <img
            alt="건강한 만남을 준비하는 헬스독 메인 히어로"
            className="w-full rounded-2xl border border-hd-line bg-hd-card shadow-[0_1px_0_rgba(38,49,43,0.06)]"
            src={generatedAsset("main-hero-desktop.png")}
          />
        </picture>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="health">
            <a href="/pets">
              아이들 먼저 보기
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="healthSecondary">
            <a href="/branches">
              가까운 지점 찾기
              <MapPin className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function TokenBoard(): JSX.Element {
  const swatches = [
    ["Cream", "bg-hd-cream"],
    ["Sage", "bg-hd-sage"],
    ["Green", "bg-hd-green"],
    ["Yellow", "bg-hd-yellow"],
    ["Ink", "bg-hd-ink"],
  ] as const;

  return (
    <section className="bg-hd-cream px-4 py-16 md:px-10 md:py-24">
      <SectionTitle
        body="이미지가 이미 따뜻한 톤을 갖고 있으니, 코드 UI는 낮은 채도의 표면과 조용한 버튼으로 받칩니다."
        eyebrow="Design tokens"
        title="크림과 세이지를 중심으로 조용하게"
      />
      <div className="mx-auto grid max-w-[1180px] gap-5 sm:grid-cols-5">
        {swatches.map(([label, className]) => (
          <Card
            className="overflow-hidden border-hd-line bg-hd-card shadow-[0_10px_30px_rgba(57,49,37,0.06)]"
            key={label}
          >
            <div className={`h-28 ${className}`} />
            <CardContent className="p-5">
              <p className="text-base font-semibold text-hd-ink">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function BranchCards(): JSX.Element {
  return (
    <section className="bg-hd-base px-4 py-16 md:px-10 md:py-24">
      <SectionTitle
        body="지점 정보는 사용자가 다시 표로 정리하지 않아도, 받은 링크에서 수집해서 카드에 채웁니다."
        eyebrow="Branches"
        title="6개 지점은 정보 카드로 선명하게"
      />
      <div className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-3">
        {previewBranches.map((branch) => (
          <Card
            className="border-hd-line bg-hd-card shadow-[0_10px_30px_rgba(57,49,37,0.06)] transition hover:-translate-y-0.5 hover:border-hd-sageDeep/40 hover:shadow-[0_16px_42px_rgba(57,49,37,0.10)]"
            key={branch.name}
          >
            <CardContent className="p-8 md:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge variant="health">{branch.status}</Badge>
                  <h3 className="mt-5 text-[28px] font-semibold leading-tight text-hd-ink">
                    {branch.name}
                  </h3>
                  <p className="mt-2 text-base text-hd-muted">{branch.region}</p>
                </div>
                <MapPin className="h-7 w-7 text-hd-sageDeep" />
              </div>
              <p className="mt-6 text-base leading-8 text-hd-muted">전화번호: {branch.phone}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button variant="healthOutline">플레이스</Button>
                <Button variant="healthOutline">블로그</Button>
                <Button variant="healthOutline">인스타</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function PetCards(): JSX.Element {
  return (
    <section className="bg-hd-sage px-4 py-16 md:px-10 md:py-24">
      <SectionTitle
        body="받은 아이 사진은 정사각형 중심이라 카드형 목록에 바로 잘 맞습니다. 상세 정보는 1차에서 과하게 만들지 않습니다."
        eyebrow="Pet cards"
        title="사진 중심, 정보는 상담 연결 중심"
      />
      <div className="mx-auto grid max-w-[1400px] gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {previewPets.map((pet) => (
          <Card
            className="group overflow-hidden border-hd-line bg-hd-card shadow-[0_10px_30px_rgba(57,49,37,0.06)]"
            key={pet.image}
          >
            <img
              alt={`${pet.name} 사진`}
              className="aspect-square w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              src={pet.image}
            />
            <CardContent className="p-7">
              <h3 className="text-2xl font-semibold leading-tight text-hd-ink">{pet.name}</h3>
              <p className="mt-3 text-base text-hd-muted">{pet.meta}</p>
              <p className="mt-2 text-base text-hd-muted">{pet.branch}</p>
              <Button className="mt-6 w-full" variant="healthSecondary">
                상담으로 확인
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function ReviewAndForm(): JSX.Element {
  return (
    <section className="bg-hd-base px-4 py-16 md:px-10 md:py-24">
      <SectionTitle
        body="후기는 1차에서 네이버/블로그 이동형으로 설계하고, 대표 카드만 보여줍니다."
        eyebrow="Reviews and form"
        title="후기는 가볍게, 상담은 분명하게"
      />
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_520px]">
        <div className="grid gap-6 sm:grid-cols-3">
          {previewReviews.map((review) => (
            <Card className="overflow-hidden border-hd-line bg-hd-card" key={review.image}>
              <img
                alt={review.title}
                className="aspect-[4/5] w-full object-cover"
                src={review.image}
              />
              <CardContent className="p-7">
                <Badge variant="health">{review.source}</Badge>
                <h3 className="mt-4 min-h-14 text-lg font-semibold leading-7 text-hd-ink">
                  {review.title}
                </h3>
                <Button className="mt-5 w-full" variant="healthOutline">
                  후기 보기
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-hd-line bg-hd-card shadow-[0_24px_70px_rgba(38,49,43,0.10)]">
          <CardContent className="space-y-6 p-8">
            <h3 className="font-health text-[30px] leading-tight text-hd-ink">가까운 지점 상담</h3>
            <label className="sr-only" htmlFor="healthdog-preview-branch">
              상담 지점 선택
            </label>
            <select
              className="h-[52px] w-full rounded-lg border border-hd-line bg-hd-base px-4 text-base text-hd-ink"
              id="healthdog-preview-branch"
              name="branch"
            >
              <option>상담 지점 선택</option>
              <option>수원점</option>
              <option>창원점</option>
            </select>
            <label className="sr-only" htmlFor="healthdog-preview-phone">
              연락처
            </label>
            <input
              autoComplete="tel"
              className="h-[52px] w-full rounded-lg border border-hd-line bg-hd-base px-4 text-base"
              id="healthdog-preview-phone"
              inputMode="tel"
              name="phone"
              placeholder="연락처"
            />
            <label className="sr-only" htmlFor="healthdog-preview-message">
              문의 내용
            </label>
            <textarea
              className="min-h-36 w-full rounded-lg border border-hd-line bg-hd-base px-4 py-4 text-base"
              id="healthdog-preview-message"
              name="message"
              placeholder="궁금한 아이나 방문 가능 시간을 남겨주세요."
            />
            <label className="flex gap-3 text-base leading-7 text-hd-muted">
              <input className="mt-1 h-5 w-5" name="privacyConsent" type="checkbox" />
              상담을 위한 개인정보 수집에 동의합니다.
            </label>
            <Button className="w-full" variant="health">
              상담 문의하기
              <Phone className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
