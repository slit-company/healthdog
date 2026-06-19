export function generatedImage(name: string): string {
  return `/assets/healthdog/generated/${name}`;
}

export function petAsset(index: number): string {
  return `/assets/healthdog/received/pets/pet-0${index}.webp`;
}

export function reviewAsset(index: number): string {
  return `/assets/healthdog/received/reviews/review-0${index}.webp`;
}
