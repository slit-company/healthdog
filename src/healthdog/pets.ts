import { petAsset } from "./assets";
import type { HealthdogPet, Pet } from "./types";

export const healthdogPets: readonly HealthdogPet[] = [
  {
    id: "cream-pome",
    name: "크림 포메",
    image: petAsset(1),
    type: "강아지",
    breed: "포메라니안",
    branchSlug: "suwon",
    status: "상담 가능",
    note: "성격과 지점 상황은 상담으로 확인",
  },
  {
    id: "brown-poodle",
    name: "브라운 푸들",
    image: petAsset(2),
    type: "강아지",
    breed: "푸들",
    branchSlug: "changwon",
    status: "사진 확인",
    note: "가까운 지점 연결",
  },
  {
    id: "cream-maltipoo",
    name: "크림 말티푸",
    image: petAsset(3),
    type: "강아지",
    breed: "말티푸",
    branchSlug: "busan",
    status: "방문 예약",
    note: "아이별 컨디션 상담",
  },
  {
    id: "white-bichon",
    name: "화이트 비숑",
    image: petAsset(4),
    type: "강아지",
    breed: "비숑",
    branchSlug: "songpa",
    status: "아이 확인",
    note: "지점 문의",
  },
  {
    id: "soft-puppy",
    name: "소프트 크림",
    image: petAsset(5),
    type: "강아지",
    breed: "소형견",
    branchSlug: "incheon-gimpo",
    status: "상담 가능",
    note: "사진으로 먼저 확인",
  },
  {
    id: "garden-puppy",
    name: "가든 화이트",
    image: petAsset(6),
    type: "강아지",
    breed: "소형견",
    branchSlug: "pyeongtaek",
    status: "지점 문의",
    note: "방문 가능 시간 확인",
  },
] as const;

export const pets: readonly Pet[] = healthdogPets.map((pet) => ({
  id: pet.id,
  name: pet.name,
  image: pet.image,
  type: pet.breed,
  branch: pet.branchSlug,
  status: `${pet.status} · ${pet.note}`,
}));
