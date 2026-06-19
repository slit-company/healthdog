import { Button } from "@/components/ui/button";
import { type BranchSlug, branches } from "@/healthdog-data";
import { Phone } from "lucide-react";
import { type FormEvent, useState } from "react";

export function ConsultationForm({
  selectedBranch,
}: { readonly selectedBranch?: BranchSlug | undefined }): JSX.Element {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <form
      className="space-y-6 rounded-2xl border border-hd-line bg-hd-card p-7 shadow-[0_24px_70px_rgba(38,49,43,0.10)] md:p-8"
      method="post"
      onSubmit={handleSubmit}
    >
      <h3 className="font-health text-[30px] leading-tight text-hd-ink">가까운 지점 상담</h3>
      <div>
        <label className="mb-3 block text-base font-semibold text-hd-ink" htmlFor="branch">
          상담 지점
        </label>
        <select
          className="h-[52px] w-full rounded-lg border border-hd-line bg-hd-base px-4 text-base text-hd-ink"
          defaultValue={selectedBranch ?? ""}
          id="branch"
          name="branch"
        >
          <option value="">상담 지점 선택</option>
          {branches.map((branch) => (
            <option key={branch.slug} value={branch.slug}>
              {branch.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-3 block text-base font-semibold text-hd-ink" htmlFor="phone">
          연락처
        </label>
        <input
          autoComplete="tel"
          className="h-[52px] w-full rounded-lg border border-hd-line bg-hd-base px-4 text-base"
          id="phone"
          inputMode="tel"
          name="phone"
          placeholder="연락 가능한 번호"
        />
      </div>
      <div>
        <label className="mb-3 block text-base font-semibold text-hd-ink" htmlFor="message">
          문의 내용
        </label>
        <textarea
          className="min-h-36 w-full rounded-lg border border-hd-line bg-hd-base px-4 py-4 text-base"
          id="message"
          name="message"
          placeholder="궁금한 아이, 방문 가능 시간, 원하는 상담 방식을 남겨주세요."
        />
      </div>
      <label className="flex gap-3 text-base leading-7 text-hd-muted">
        <input className="mt-1 h-5 w-5" name="privacyConsent" required type="checkbox" />
        상담을 위한 개인정보 수집에 동의합니다.
      </label>
      <Button className="min-h-14 w-full" type="submit" variant="health">
        {isSubmitted ? "문의 내용 확인 완료" : "상담 문의하기"}
        <Phone className="h-4 w-4" />
      </Button>
      {isSubmitted ? (
        <p aria-live="polite" className="text-base font-semibold text-hd-sageDeep">
          상담 폼 연결 전까지는 화면에서만 확인됩니다.
        </p>
      ) : null}
      <p className="text-sm leading-6 text-hd-muted">
        조건과 가능 여부는 아이와 지점 상황에 따라 상담으로 확인합니다.
      </p>
    </form>
  );
}
