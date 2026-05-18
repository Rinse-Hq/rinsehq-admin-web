import { cn } from "@/presentation/lib/utils";

const steps = [
  { id: 0, label: "Create Order" },
  { id: 1, label: "Order Details" },
  { id: 2, label: "Order invoice" },
] as const;

type CreateOrderStepperProps = {
  currentStep: number;
};

export function CreateOrderStepper({ currentStep }: CreateOrderStepperProps) {
  return (
    <ol className="flex flex-wrap items-center gap-2 sm:gap-4">
      {steps.map((step, index) => {
        const completed = currentStep > step.id;
        const active = currentStep === step.id;

        return (
          <li key={step.id} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium",
                  completed && "bg-brand-500 text-white",
                  active && !completed && "bg-brand-500 text-white",
                  !active && !completed && "bg-slate-200 text-slate-600",
                )}
              >
                {completed || (active && step.id === 0) ? (
                  <CheckIcon />
                ) : (
                  step.id + 1
                )}
              </span>
              <span
                className={cn(
                  "text-sm font-medium",
                  (active || completed) && "text-brand-600",
                  !active && !completed && "text-slate-500",
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <span className="hidden h-px w-8 bg-slate-300 sm:block sm:w-16" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12L10 17L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
