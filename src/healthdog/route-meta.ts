import { type Branch, branches } from "@/healthdog-data";

export const SITE_URL = "https://healthdog.co.kr";
export const SITE_NAME = "헬스독";
const OG_IMAGE = `${SITE_URL}/healthdog_logo_nobg_cropped.png`;

export type RouteMeta = {
  readonly title: string;
  readonly description: string;
  readonly canonicalPath: string;
  readonly ogTitle: string;
  readonly ogDescription: string;
  readonly ogImage: string;
};

const HOME_DESCRIPTION =
  "헬스독은 전국 6개 지점에서 강아지 분양 상담을 안내합니다. 지점별 아이 확인과 방문 상담, 네이버 플레이스 실제 후기를 한곳에서 확인하세요.";

const HOME_META: RouteMeta = {
  title: "헬스독 | 건강한 만남을 준비하는 강아지 분양 상담",
  description: HOME_DESCRIPTION,
  canonicalPath: "/",
  ogTitle: "헬스독 | 건강한 만남을 준비하는 강아지 분양 상담",
  ogDescription: HOME_DESCRIPTION,
  ogImage: OG_IMAGE,
};

const STATIC_META: ReadonlyMap<string, RouteMeta> = new Map<string, RouteMeta>([
  ["/", HOME_META],
  [
    "/about",
    {
      title: "헬스독 소개 | 확인 가능한 분양 상담",
      description:
        "헬스독은 큰 약속보다 확인 가능한 상담을 우선합니다. 지점별 아이 상태 확인과 보호자에게 필요한 안내 방식을 소개합니다.",
      canonicalPath: "/about",
      ogTitle: "헬스독 소개",
      ogDescription: "확인 가능한 상담을 우선하는 헬스독 소개",
      ogImage: OG_IMAGE,
    },
  ],
  [
    "/pets",
    {
      title: "분양 가능한 아이들 | 헬스독",
      description:
        "헬스독 6개 지점에서 만날 수 있는 아이들을 사진 중심으로 확인하세요. 월령과 세부 상태는 가까운 지점 상담에서 안내합니다.",
      canonicalPath: "/pets",
      ogTitle: "헬스독 분양 가능한 아이들",
      ogDescription: "사진으로 먼저 보는 헬스독 아이들",
      ogImage: OG_IMAGE,
    },
  ],
  [
    "/reviews",
    {
      title: "분양 후기 | 헬스독 네이버 플레이스 실제 후기",
      description:
        "헬스독 6개 지점에 쌓인 네이버 플레이스 실제 방문자 후기. 사진을 누르면 해당 지점 원문 리뷰로 이동합니다.",
      canonicalPath: "/reviews",
      ogTitle: "헬스독 분양 후기",
      ogDescription: "네이버 플레이스 실제 방문자 후기 모음",
      ogImage: OG_IMAGE,
    },
  ],
  [
    "/branches",
    {
      title: "지점 안내 | 헬스독 6개 지점",
      description:
        "헬스독 수원·평택·송파·부산·인천김포·창원 6개 지점 안내. 주소·전화·네이버 플레이스 후기와 방문 상담 정보를 확인하세요.",
      canonicalPath: "/branches",
      ogTitle: "헬스독 지점 안내",
      ogDescription: "전국 6개 지점 분양 상담 안내",
      ogImage: OG_IMAGE,
    },
  ],
]);

function normalizePath(path: string): string {
  const stripped = path.replace(/\/+$/, "");
  return stripped === "" ? "/" : stripped;
}

function findBranch(path: string): Branch | undefined {
  return branches.find((branch) => `/branches/${branch.slug}` === path);
}

function branchMeta(branch: Branch): RouteMeta {
  return {
    title: `${branch.name} | 헬스독 ${branch.region} 강아지 분양 상담`,
    description: `헬스독 ${branch.name}(${branch.region}) 분양 상담 안내. 주소·전화·네이버 플레이스 후기와 방문 상담 정보를 확인하세요.`,
    canonicalPath: `/branches/${branch.slug}`,
    ogTitle: `헬스독 ${branch.name}`,
    ogDescription: `${branch.region} 헬스독 ${branch.name} 분양 상담 안내`,
    ogImage: OG_IMAGE,
  };
}

export function getRouteMeta(path: string): RouteMeta {
  const normalized = normalizePath(path);
  const direct = STATIC_META.get(normalized);
  if (direct !== undefined) {
    return direct;
  }
  const branch = findBranch(normalized);
  return branch !== undefined ? branchMeta(branch) : HOME_META;
}

export const PRERENDER_ROUTES: readonly string[] = [
  "/",
  "/about",
  "/pets",
  "/reviews",
  "/branches",
  ...branches.map((branch) => `/branches/${branch.slug}`),
];

type JsonLd = Record<string, unknown>;

function toDigits(phone: string): string {
  return phone.replace(/[^0-9]/g, "");
}

function isRealPhone(phone: string): boolean {
  return toDigits(phone).length >= 9;
}

function isRealAddress(address: string): boolean {
  return !address.includes("네이버 지도");
}

function branchSameAs(branch: Branch): readonly string[] {
  const links = [branch.naverPlaceHref, branch.blogHref];
  if (branch.instagramHref.includes("instagram.com")) {
    links.push(branch.instagramHref);
  }
  return Array.from(new Set(links));
}

function organizationLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: OG_IMAGE,
    sameAs: branches.map((branch) => branch.naverPlaceHref),
  };
}

function branchLd(branch: Branch): JsonLd {
  const ld: JsonLd = {
    "@context": "https://schema.org",
    "@type": "PetStore",
    name: `헬스독 ${branch.name}`,
    url: `${SITE_URL}/branches/${branch.slug}`,
    areaServed: branch.region,
    sameAs: branchSameAs(branch),
  };
  if (isRealAddress(branch.address)) {
    ld.address = {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressCountry: "KR",
    };
  }
  if (isRealPhone(branch.phone)) {
    ld.telephone = branch.phone;
  }
  return ld;
}

export function getJsonLd(path: string): readonly JsonLd[] {
  const normalized = normalizePath(path);
  const branch = findBranch(normalized);
  if (branch !== undefined) {
    return [organizationLd(), branchLd(branch)];
  }
  if (normalized === "/branches") {
    return [organizationLd(), ...branches.map(branchLd)];
  }
  return [organizationLd()];
}
