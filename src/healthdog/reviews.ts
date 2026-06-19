import type { BranchSlug, HealthdogReview, Review } from "./types";

const NR = (base: string) => `/assets/healthdog/source/naver-reviews/${base}`;
const NP = (branch: string, num: number, ext = "jpg") =>
  `/assets/healthdog/source/naver-place/place-${branch}/place-${branch}-${String(num).padStart(3, "0")}.${ext}`;

const PLACE_IDS: Record<BranchSlug, string> = {
  changwon: "2017077891",
  suwon: "1974831260",
  busan: "2023622711",
  "incheon-gimpo": "2026347819",
  pyeongtaek: "2073295754",
  songpa: "2096132236",
};

function r(id: string, image: string, excerpt: string, branchSlug: BranchSlug): HealthdogReview {
  return {
    id,
    title: excerpt.slice(0, 20),
    image,
    source: "네이버 플레이스 리뷰",
    branchSlug,
    excerpt,
    href: `https://pcmap.place.naver.com/place/${PLACE_IDS[branchSlug]}/review/visitor`,
  };
}

export const healthdogReviews: readonly HealthdogReview[] = [
  r("cw-r01", NR("changwon-r001.jpg"),
    "둘째로 데려오게 된 말티푸 감자에요🥔 첫째 강아지랑 너무 닮아서 더 끌렸던 거 같아요 ㅎㅎ 사장님도 친절하시고 강아지들도 안아볼 수 있어서 좋았습니다!", "changwon"),
  r("cw-r03", NR("changwon-r003.jpg"),
    "고민 많이하고 했는데 친절하게 응대해주시고 이쁜아가 잘 분양합니다!! 감사합니당 잘키우겠습니다!!❤️❤️", "changwon"),
  r("cw-r05", NR("changwon-r005.jpg"),
    "헬스독 너무 좋아요 ㅎ 너무 친절하시고 분위기도 너무좋고 이쁜 아기들도 많고.. 굿입니다 ㅎ", "changwon"),
  r("cw-p01", NP("changwon", 1),
    "오자마자 그냥 이쁘고 귀엽고 착한 애기들 밖에 없네요ㅠ 직원분들도 다 반려인분들이 고민하실때까지 계속 기다려 주시고 이쁘고 착한애기 데려갑니다 ㅎㅎ", "changwon"),
  r("cw-p06", NP("changwon", 6),
    "한생명을 분양한다는 건 쉽지않은일이지만 신중한 고민끝에 분양했어요 너무귀여워요 우리아가 잘키울게요 ❤️❤️", "changwon"),
  r("cw-p08", NP("changwon", 8),
    "사장님이 엄청 친절하세요! 여기 엄청 청결하게 아이들 잘 케어해주시고 있더라구요~ 이쁜아가 잘 데리고갑니다!", "changwon"),
  r("cw-p10", NP("changwon", 10),
    "직원분들 엄청 친절 하시고!! 분위기가 너무 따뜻하고 청결합니다!!!!!! 이쁜 저희 토리 기분좋게 입양해갑니다 잘키울게요 감사합니다❤️", "changwon"),
  r("cw-p11", NP("changwon", 11),
    "처음 강아지 분양 받았는데 완전 이쁜아가들 많고 직원분들도 너무 친절하시고 편안한 분위기에 예쁜 아가 분양받아갑니다", "changwon"),
  r("cw-p13", NP("changwon", 13),
    "설명도 잘해주시고 너무 친절하세요!! 고민 많았는데 믿고 분양받을 수 있었어요 정말 감사합니다", "changwon"),
  r("cw-p18", NP("changwon", 18),
    "고민고민끝에 드디어 입양하게 되었어요 직원분이 너무 친절하세요 감사합니다♡", "changwon"),
  r("cw-p20", NP("changwon", 20),
    "너무이뻐요 얘기 잘데리고 갑니당 건강하게 잘 키울게요", "changwon"),
  r("cw-p24", NP("changwon", 24),
    "너무 이쁜 아기 데려가요!! 직원분들 너무 친절하시고 천천히 설명도 잘해주세용ㅠㅠ😃 정말 감사합니다~!!❤️", "changwon"),
  r("cw-p25", NP("changwon", 25),
    "외모도 예쁘고 너무 마음에 듭니다!! 건강하게 자라길 바라며 예쁘게 키울게요", "changwon"),

  r("ic-r01", NR("incheon-r001.jpg"),
    "추가금없이 예쁜 아이 잘 분양받았습니다 너무 감사합니다", "incheon-gimpo"),
  r("ic-p01", NP("incheon-kimpo", 1),
    "애기 너무 예뻐요 이것저것 물어봤는데 잘 설명해주시고 서비스도 잘주셔서 기분좋게 데려갑니다", "incheon-gimpo"),
  r("ic-p03", NP("incheon-kimpo", 3),
    "정말 친절하게 설명해주시고 아이도 건강해요! 믿고 분양받을수 있어서 강추입니다!", "incheon-gimpo"),
  r("ic-p06", NP("incheon-kimpo", 6),
    "걱정했는데 마음에 드는 애기가 있어서 데리고왔어요! 용품도 많이 챙겨주셔서 잘 데리고왔는데 애기가 금방 적응해서 다행이에요☺️", "incheon-gimpo"),
  r("ic-p07", NP("incheon-kimpo", 7),
    "다른 분양샵도 예약해두고 방문했지만 사장님이 넘 친절하시고 잘 알려주셔서 바로 분양했습니다. 로디를 만나서 좋았습니다. 잘키워보겠습니다.", "incheon-gimpo"),
  r("ic-p08", NP("incheon-kimpo", 8),
    "어제 가족이 생겼어요!! 자세히 설명해주시고 카톡 답장도 빠르셔서 앞으로 후케어도 걱정 없습니다!! 사장님 짱 친절하세요~~~", "incheon-gimpo"),
  r("ic-p10", NP("incheon-kimpo", 10),
    "어제 아이랑 방문해서 고민끝에 이쁜아기 집으로 데리고갑니다! 친절하게 설명해주시고 이쁜아기 잘키울게요~ 너무 감사합니다!!ㅎㅎ", "incheon-gimpo"),
  r("ic-p12", NP("incheon-kimpo", 12),
    "보자마자 데꼬갑니당❤️❤️❤️ 너무너무 귀여워요 잘 키울게요", "incheon-gimpo"),
  r("ic-p14", NP("incheon-kimpo", 14),
    "상담도 꼼꼼하게 잘 해주시고, 첫 입양이라 걱정 많았는데 친절하게 잘 설명해주셔서 너무 좋았습니다! 너무 귀여워요!", "incheon-gimpo"),
  r("ic-p17", NP("incheon-kimpo", 17),
    "친절히 안내해 주시고 저의 댕댕이 결정하는데 많은 도움을 주셨어요. 정말 추천드립니다~^^", "incheon-gimpo"),

  r("sw-r01", NR("suwon-r001.jpg"),
    "설명도 친절하시고 애들 상태도 너무 좋아요 잘 키울게요!", "suwon"),
  r("sw-p01", NP("suwon", 1),
    "여러군데 방문!! 수원 헬스독으로 결정~~ 선생님들께서 진짜 설명잘해주시고 아이들 케어 정말 잘되있고 강추입니다!!!", "suwon"),

  r("bs-r01", NR("busan-r001.jpg"),
    "골든 리트리버를 분양 받았는데 애기가 너무 귀엽고 순하고 시설도 깨끗하고 자세하게 하나하나 다 쉽게 설명해주셔서 좋았습니다", "busan"),
  r("bs-p01", NP("busan", 1),
    "매장도 청결하고 사장님도 너무 친절하십니다 부산에 있는 샵 중에 제일 맘에 드네요 진짜 최고입니다 둘째 데리러 꼭 오겠습니다", "busan"),

  r("pt-p01", NP("pyeongtaek", 1),
    "예약후 방문했는데 유난히 큰 아이가 우리안에 있는것을 봤어요 마침 제가 찾던 말티푸 여자아이고 매우 활발하고 건강해보여서 냉큼 입양했습니다", "pyeongtaek"),

  r("sp-r01", NR("songpa-r001.jpg"),
    "구경 왔다가 색감이 너무 이쁜 골드두들에 빠져서 집으로 함께 가게 되었습니다♡ 사장님 정말 친절하시고 설명도 너무 잘 해주셔서 정말 감사합니다^^", "songpa"),
  r("sp-p01", NP("songpa", 1),
    "처음으로 강아지 키워보려고 방문했는데 아가들이 다 이쁘고 건강하더라구요 무엇보다 친절하셔서 좋았습니다 추천해요!!!", "songpa"),
] as const;

export const reviews: readonly Review[] = healthdogReviews.map((review) => ({
  id: review.id,
  title: review.title,
  image: review.image,
  source: review.source,
  branch: review.branchSlug,
  href: review.href,
  excerpt: review.excerpt,
}));
