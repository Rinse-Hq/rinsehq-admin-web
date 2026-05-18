"use client";

import { useState } from "react";
import {
  CreateOrderSubNav,
  type CreateOrderSubStep,
} from "@/presentation/components/orders/create-order-sub-nav";
import { CreateOrderStepper } from "@/presentation/components/orders/create-order-stepper";
import { CreateOrderToolbar } from "@/presentation/components/orders/create-order-toolbar";
import { OrderSuccessModal } from "@/presentation/components/orders/order-success-modal";
import { CustomerInfoStep } from "@/presentation/components/orders/steps/customer-info-step";
import { DeliveryInfoStep } from "@/presentation/components/orders/steps/delivery-info-step";
import { OrderDetailsStep } from "@/presentation/components/orders/steps/order-details-step";
import { OrderInfoStep } from "@/presentation/components/orders/steps/order-info-step";
import { OrderInvoiceStep } from "@/presentation/components/orders/steps/order-invoice-step";

export function CreateOrderFlow() {
  const [mainStep, setMainStep] = useState(0);
  const [subStep, setSubStep] = useState<CreateOrderSubStep>("customer");
  const [showSuccess, setShowSuccess] = useState(false);

  function goNext() {
    if (mainStep === 0) {
      if (subStep === "customer") setSubStep("order-info");
      else if (subStep === "order-info") setSubStep("delivery");
      else setMainStep(1);
      return;
    }
    if (mainStep === 1) {
      setMainStep(2);
      return;
    }
    setShowSuccess(true);
  }

  function goBack() {
    if (mainStep === 2) {
      setMainStep(1);
      return;
    }
    if (mainStep === 1) {
      setMainStep(0);
      setSubStep("delivery");
      return;
    }
    if (subStep === "delivery") setSubStep("order-info");
    else if (subStep === "order-info") setSubStep("customer");
  }

  function renderStepContent() {
    if (mainStep === 0) {
      if (subStep === "customer") {
        return <CustomerInfoStep onNext={goNext} />;
      }
      if (subStep === "order-info") {
        return <OrderInfoStep onNext={goNext} />;
      }
      return <DeliveryInfoStep onBack={goBack} onNext={goNext} />;
    }
    if (mainStep === 1) {
      return <OrderDetailsStep onBack={goBack} onNext={goNext} />;
    }
    return (
      <OrderInvoiceStep onBack={goBack} onComplete={() => setShowSuccess(true)} />
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <CreateOrderStepper currentStep={mainStep} />
          <CreateOrderToolbar onAddOrder={() => setShowSuccess(true)} />
        </div>

        <div className="flat-card flex min-h-[520px] flex-col p-6 lg:p-8">
          <div className="flex min-h-0 flex-1 flex-col gap-6 lg:flex-row">
            {mainStep === 0 ? (
              <CreateOrderSubNav
                current={subStep}
                onSelect={setSubStep}
              />
            ) : null}
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
              {renderStepContent()}
            </div>
          </div>
        </div>
      </div>

      <OrderSuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} />
    </>
  );
}
