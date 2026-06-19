import type { HealthdogFaq } from "./types";

export const healthdogFaqs: readonly HealthdogFaq[] = [
  {
    question: "분양 조건은 어디서 확인하나요?",
    answer: "아이의 상태와 지점 상황에 따라 달라질 수 있어 가까운 지점 상담으로 안내합니다.",
  },
  {
    question: "방문 전 예약이 필요한가요?",
    answer: "아이 컨디션과 상담 가능 시간을 확인하기 위해 방문 전 지점 확인을 권장합니다.",
  },
  {
    question: "후기는 어디서 볼 수 있나요?",
    answer: "1차 사이트에서는 대표 후기 카드와 네이버 후기, 블로그 원문 링크로 연결합니다.",
  },
] as const;

export const healthdogNavItems = [
  { label: "헬스독 소개", href: "/about" },
  { label: "아이들 보기", href: "/pets" },
  { label: "분양 후기", href: "/reviews" },
  { label: "지점 안내", href: "/branches" },
  { label: "상담 하기", href: "/contact" },
] as const;
