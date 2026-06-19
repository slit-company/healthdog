export type PreviewPet = {
  readonly name: string;
  readonly meta: string;
  readonly branch: string;
  readonly image: string;
};

export type PreviewReview = {
  readonly title: string;
  readonly source: string;
  readonly image: string;
};

export type PreviewBranch = {
  readonly name: string;
  readonly region: string;
  readonly phone: string;
  readonly status: string;
};

const petAsset = (index: number): string =>
  `/assets/healthdog/received/pets/pet-${String(index).padStart(2, "0")}.webp`;

const reviewAsset = (index: number): string =>
  `/assets/healthdog/received/reviews/review-${String(index).padStart(2, "0")}.webp`;

export const previewBranches: readonly PreviewBranch[] = [
  { name: "창원점", region: "경남 창원", phone: "링크에서 수집", status: "상담 가능" },
  { name: "수원점", region: "경기 수원", phone: "링크에서 수집", status: "방문 예약" },
  { name: "부산점", region: "부산", phone: "링크에서 수집", status: "아이 확인" },
  { name: "평택점", region: "경기 평택", phone: "링크에서 수집", status: "상담 가능" },
  { name: "인천김포점", region: "인천/김포", phone: "링크에서 수집", status: "지점 확인" },
  { name: "송파점", region: "서울 송파", phone: "링크에서 수집", status: "방문 예약" },
] as const;

export const previewPets: readonly PreviewPet[] = [
  { name: "크림 포메", meta: "소형견 · 성격 상담", branch: "가까운 지점 연결", image: petAsset(1) },
  { name: "브라운 푸들", meta: "소형견 · 사진 확인", branch: "지점 문의", image: petAsset(2) },
  { name: "크림 말티푸", meta: "소형견 · 상담 가능", branch: "방문 예약", image: petAsset(3) },
  { name: "화이트 비숑", meta: "소형견 · 아이 확인", branch: "지점 문의", image: petAsset(4) },
] as const;

export const previewReviews: readonly PreviewReview[] = [
  { title: "네이버 후기 대표 노출", source: "네이버 리뷰", image: reviewAsset(1) },
  { title: "블로그 후기 연결 카드", source: "블로그", image: reviewAsset(2) },
  { title: "분양 인증 사진", source: "받은 후기 폴더", image: reviewAsset(3) },
] as const;
