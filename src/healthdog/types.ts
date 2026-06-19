export type HealthdogImagePair = {
  readonly desktop: string;
  readonly mobile: string;
  readonly alt: string;
};

export type BranchSlug = "changwon" | "suwon" | "busan" | "pyeongtaek" | "incheon-gimpo" | "songpa";

export type BranchChannel = {
  readonly label: string;
  readonly href: string;
};

export type HealthdogBranch = {
  readonly slug: BranchSlug;
  readonly name: string;
  readonly region: string;
  readonly status: string;
  readonly address: string;
  readonly phone: string;
  readonly note: string;
  readonly naverPlaceHref: string;
  readonly blogHref: string;
  readonly instagramHref: string;
  readonly kakaoHref?: string;
  readonly animalSalesLicenseNumber?: string;
  readonly businessRegistrationNumber?: string;
  readonly representative?: string;
  readonly realHours?: string;
};

export type Branch = HealthdogBranch & {
  readonly summary: string;
  readonly hours: string;
  readonly channels: readonly BranchChannel[];
};

export type HealthdogPet = {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly type: "강아지" | "고양이";
  readonly breed: string;
  readonly branchSlug: BranchSlug;
  readonly status: string;
  readonly note: string;
};

export type Pet = {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly type: string;
  readonly branch: BranchSlug;
  readonly status: string;
};

export type HealthdogReview = {
  readonly id: string;
  readonly title: string;
  readonly image: string;
  readonly source: string;
  readonly branchSlug: BranchSlug;
  readonly excerpt: string;
  readonly href: string;
};

export type Review = {
  readonly id: string;
  readonly title: string;
  readonly image: string;
  readonly source: string;
  readonly branch: BranchSlug;
  readonly href: string;
  readonly excerpt: string;
};

export type HealthdogFaq = {
  readonly question: string;
  readonly answer: string;
};
