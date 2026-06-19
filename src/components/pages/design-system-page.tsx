import {
  BranchCards,
  ImageBand,
  PetCards,
  ReviewAndForm,
  TokenBoard,
} from "@/components/pages/design-system-sections";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function DesignSystemPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-hd-base text-hd-ink">
      <div className="border-b border-hd-line bg-hd-card/90 px-4 py-4 md:px-10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
          <a className="font-health text-2xl text-hd-ink" href="/design-system">
            Healthdog UI
          </a>
          <Button asChild size="sm" variant="healthSecondary">
            <a href="/">
              헬스독 홈 보기
              <Search className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
      <ImageBand />
      <TokenBoard />
      <BranchCards />
      <PetCards />
      <ReviewAndForm />
    </main>
  );
}
