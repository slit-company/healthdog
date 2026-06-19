import { generatedImage } from "./assets";
import type { HealthdogImagePair } from "./types";

export const healthdogImages = {
  mainHero: {
    desktop: generatedImage("main-hero-desktop.png"),
    mobile: generatedImage("main-hero-mobile.png"),
    alt: "보호자의 손에 안긴 강아지와 함께 건강한 만남을 준비하는 헬스독 메인 이미지",
  },
  branchNetwork: {
    desktop: generatedImage("branch-network-desktop.png"),
    mobile: generatedImage("branch-network-mobile.png"),
    alt: "창원, 수원, 부산, 평택, 인천김포, 송파 6개 헬스독 지점 네트워크 이미지",
  },
  petsCollage: {
    desktop: generatedImage("pets-collage-desktop.png"),
    mobile: generatedImage("pets-collage-mobile.png"),
    alt: "헬스독에서 기다리는 여러 강아지와 고양이를 보여주는 이미지",
  },
  healthStandard: {
    desktop: generatedImage("health-standard-desktop.png"),
    mobile: generatedImage("health-standard-mobile.png"),
    alt: "건강 확인부터 분양 후 안내까지 헬스독 안심 기준을 설명하는 이미지",
  },
  adoptionTerms: {
    desktop: generatedImage("adoption-terms-desktop.png"),
    mobile: generatedImage("adoption-terms-mobile.png"),
    alt: "분양 조건은 아이별로 신중하게 안내한다는 상담 안내 이미지",
  },
  consultation: {
    desktop: generatedImage("consultation-cta-desktop.png"),
    mobile: generatedImage("consultation-cta-mobile.png"),
    alt: "보호자와 상담자가 강아지의 성격과 컨디션을 상담하는 이미지",
  },
} as const satisfies Record<string, HealthdogImagePair>;
