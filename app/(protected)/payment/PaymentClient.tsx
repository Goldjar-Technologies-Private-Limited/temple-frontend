"use client";

import { useEffect, useState, type ChangeEvent, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DONATION_FREQUENCIES as frequencies,
  DONATION_AMOUNTS as amounts,
} from "@/data/donations";

type DonationType = "one-time" | "auto";
type PaymentMethod = "upi" | "card" | "netbanking";

const sectionTitle = "mb-3 mt-6 text-base text-[#3d332c] sm:text-lg lg:mt-7";

const optionButton =
  "flex min-h-[67px] min-w-0 items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all sm:min-h-[76px] sm:px-4 lg:min-h-[84px]";

const paymentButton =
  "flex min-h-[62px] min-w-0 items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all sm:min-h-[68px] sm:px-4";

function SectionTitle({ children }: { children: ReactNode }) {
  return <h3 className={sectionTitle}>{children}</h3>;
}

function DonationTypeButton({
  active,
  icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${optionButton} ${active ? "border-[#a71919] bg-[#fff1e7] text-[#a71919]" : "border-[#eadbc5] bg-[#fffdf8] text-[#443932] hover:border-[#d6b77d]"}`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-base font-bold sm:h-10 sm:w-10 ${active ? "bg-[#a71919] text-white" : "bg-[#f6ead5] text-[#a71919]"}`}
      >
        {icon}
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <strong className="break-words text-sm sm:text-base">{title}</strong>
        <span className="text-[10px] leading-snug text-[#8a8077] sm:text-xs">
          {description}
        </span>
      </span>
    </button>
  );
}

function PaymentButton({
  active,
  icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${paymentButton} ${active ? "border-[#a71919] bg-[#fff8f2]" : "border-[#eadbc5] bg-[#fffdf8]"} hover:border-[#d7b97f]`}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e4f4e8] text-sm font-bold text-[#14945f] sm:h-10 sm:w-10">
        {icon}
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <strong className="break-words text-sm text-[#433932] sm:text-base">
          {title}
        </strong>
        <span className="text-[10px] text-[#8a8077] sm:text-xs">
          {description}
        </span>
      </span>

      <span
        aria-hidden="true"
        className={`shrink-0 text-lg ${active ? "text-[#a71919]" : "text-[#b8aa9b]"}`}
      >
        {active ? "●" : "○"}
      </span>
    </button>
  );
}

function AutoSevaBox({
  frequency,
  setFrequency,
}: {
  frequency: string;
  setFrequency: (value: string) => void;
}) {
  return (
    <div className="mt-4 rounded-xl border border-[#e7cf9e] bg-[#fff8e9] p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f2e0bf] text-lg">
          🔄
        </div>

        <div className="min-w-0">
          <strong className="text-sm text-[#641010] sm:text-base">
            Start Auto Seva
          </strong>
          <p className="mt-1 text-xs leading-relaxed text-[#776d65] sm:text-sm">
            Choose a recurring seva frequency for your offering.
          </p>
        </div>
      </div>

      <h3 className="mb-3 mt-5 text-sm font-semibold text-[#4b4039]">
        Select Frequency
      </h3>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {frequencies.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFrequency(item.id)}
            aria-pressed={frequency === item.id}
            className={`flex min-h-[60px] min-w-0 flex-col items-center justify-center gap-1 rounded-lg border px-1 py-2 sm:min-h-[70px] ${frequency === item.id ? "border-[#a71919] bg-[#a71919] text-white" : "border-[#eadbc5] bg-white text-[#443932] hover:border-[#a71919]"}`}
          >
            <strong className="text-xs sm:text-sm">{item.title}</strong>
            <span
              className={`text-[9px] sm:text-[10px] ${frequency === item.id ? "text-[#f9e8df]" : "text-[#8a8077]"}`}
            >
              {item.subtitle}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-4 flex items-start justify-between gap-4 text-sm">
      <span className="min-w-0 text-[#776d65]">{label}</span>
      <strong className="min-w-0 break-words text-right text-[#433932]">
        {value}
      </strong>
    </div>
  );
}

function PayButton({
  type,
  amount,
  onClick,
}: {
  type: DonationType;
  amount: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-5 min-h-[52px] w-full rounded-xl bg-[#a71919] px-4 py-3 text-sm font-bold text-white shadow-[0_7px_18px_rgba(113,17,17,0.14)] transition hover:bg-[#7f1111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a71919] focus-visible:ring-offset-2 active:scale-[0.99] sm:text-base"
    >
      {type === "auto"
        ? "Review & Authorize Mandate"
        : `Continue to Pay  ₹${amount}`}
    </button>
  );
}

function SecureNote() {
  return (
    <div className="mt-4 text-center text-xs font-semibold text-[#9b762f]">
      🔒 Secure Payment
    </div>
  );
}

function AutoNote({
  accepted,
  onChange,
}: {
  accepted: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="mt-4 rounded-xl border border-[#e7cf9e] bg-[#fff8e9] p-3 sm:p-4">
      <p className="text-xs leading-relaxed text-[#776d65] sm:text-sm">
        Recurring donations require your explicit authorization through a
        supported payment provider. Please review the donation amount, payment
        frequency, and mandate terms carefully before proceeding.
      </p>

      <label className="mt-4 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#a71919]"
        />
        <span className="text-xs leading-relaxed text-[#433932] sm:text-sm">
          I confirm that I have reviewed these details and agree to proceed to
          the payment provider to review and authorize the mandate.
        </span>
      </label>
    </div>
  );
}

function Summary({
  seva,
  type,
  frequency,
  paymentMethod,
  formattedAmount,
  mandateAccepted,
  onMandateChange,
  handlePayment,
}: {
  seva: string;
  type: DonationType;
  frequency: string;
  paymentMethod: PaymentMethod;
  formattedAmount: string;
  mandateAccepted: boolean;
  onMandateChange: (checked: boolean) => void;
  handlePayment: () => void;
}) {
  const paymentName =
    paymentMethod === "upi"
      ? "UPI"
      : paymentMethod === "card"
        ? "Credit / Debit Card"
        : "Net Banking";

  return (
    <aside className="min-w-0 rounded-xl border border-[#eadbc5] bg-[#fffdf8] p-4 shadow-[0_8px_26px_rgba(82,48,18,0.05)] sm:p-5 lg:sticky lg:top-[104px] lg:rounded-[20px] lg:p-6">
      <span className="text-[10px] font-bold uppercase tracking-[1.3px] text-[#c99435]">
        Donation Summary
      </span>

      <h2 className="mt-2 break-words text-xl text-[#641010] sm:text-2xl">
        {seva}
      </h2>

      <SummaryRow
        label="Donation Type"
        value={type === "auto" ? "Auto Seva" : "One Time"}
      />

      {type === "auto" && (
        <SummaryRow
          label="Frequency"
          value={frequency.charAt(0).toUpperCase() + frequency.slice(1)}
        />
      )}

      <SummaryRow label="Payment Method" value={paymentName} />

      <div className="my-5 h-px bg-[#eadbc5]" />

      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-[#776d65]">Total Amount</span>
        <strong className="break-words text-right text-2xl text-[#a71919]">
          ₹{formattedAmount}
        </strong>
      </div>

      {type === "auto" && (
        <AutoNote accepted={mandateAccepted} onChange={onMandateChange} />
      )}

      <PayButton type={type} amount={formattedAmount} onClick={handlePayment} />

      <SecureNote />
    </aside>
  );
}

export default function DonatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const requestedSevaId = searchParams.get("seva") || "go-seva";

  const sevaNames: Record<string, string> = {
    "go-seva": "Go Seva",
    "nitya-bhog": "Nitya Bhog Seva",
    flower: "Flower Seva",
    annakut: "Annakut Seva",
    "temple-maintenance": "Temple Maintenance",
  };

  const sevaId = Object.prototype.hasOwnProperty.call(
    sevaNames,
    requestedSevaId,
  )
    ? requestedSevaId
    : "go-seva";

  const seva = sevaNames[sevaId];

  const [amount, setAmount] = useState("501");
  const [type, setType] = useState<DonationType>("one-time");
  const [frequency, setFrequency] = useState("monthly");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [mandateAccepted, setMandateAccepted] = useState(false);
  const [error, setError] = useState("");

  // Load the selected amount without putting it in the URL.
  useEffect(() => {
    try {
      const storedAmount = sessionStorage.getItem("donationAmount");

      if (!storedAmount) return;

      if (!/^\d+$/.test(storedAmount)) {
        sessionStorage.removeItem("donationAmount");
        return;
      }

      const parsedAmount = Number(storedAmount);

      if (
        !Number.isSafeInteger(parsedAmount) ||
        parsedAmount <= 0 ||
        parsedAmount > 10000000
      ) {
        sessionStorage.removeItem("donationAmount");
        return;
      }

      if (amounts.includes(storedAmount)) {
        setAmount(storedAmount);
        setCustomAmount("");
      } else {
        setAmount("custom");
        setCustomAmount(storedAmount);
      }

      sessionStorage.removeItem("donationAmount");
    } catch {
      // Keep the default amount if session storage is unavailable.
    }
  }, []);

  const finalAmount = amount === "custom" ? customAmount : amount;
  const numericAmount = Number(finalAmount);

  const formattedAmount =
    finalAmount && Number.isFinite(numericAmount)
      ? numericAmount.toLocaleString("en-IN")
      : "0";

  const handleCustomAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(event.target.value.replace(/\D/g, ""));
    setError("");
  };

  const handlePayment = () => {
    if (
      !finalAmount.trim() ||
      !Number.isSafeInteger(numericAmount) ||
      numericAmount <= 0
    ) {
      setError("Please enter a valid donation amount.");
      return;
    }

    if (numericAmount > 10000000) {
      setError("Please enter a smaller donation amount.");
      return;
    }

    if (type === "auto" && !mandateAccepted) {
      setError(
        "Please review and accept the recurring donation mandate notice before continuing.",
      );
      return;
    }

    // Keep details out of the URL.
    // The status page can read these details from sessionStorage if needed.
    try {
      sessionStorage.setItem(
        "pendingDonation",
        JSON.stringify({
          sevaId,
          seva,
          amount: String(numericAmount),
          type,
          frequency: type === "auto" ? frequency : "",
          method: paymentMethod,
        }),
      );
    } catch {
      setError("Unable to continue. Please try again.");
      return;
    }

    // This is navigation only, not a real payment.
    // Connect a payment gateway and verify the payment on your backend.
    router.push("/payment/payment-status/success");
  };

  return (
    <main className="min-h-dvh w-full min-w-0 overflow-x-clip bg-[#fff9ed] pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-8 lg:pl-[92px]">
      <section className="mx-auto grid w-full min-w-0 max-w-[1400px] grid-cols-1 items-start gap-5 px-4 pb-8 pt-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-7 lg:px-10 lg:pt-7 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 rounded-xl border border-[#eadbc5] bg-[#fffdf8] p-4 sm:p-5 lg:rounded-[20px] lg:p-7">
          <SectionTitle>Choose Donation Type</SectionTitle>

          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
            <DonationTypeButton
              active={type === "one-time"}
              icon="₹"
              title="One Time"
              description="Make a single donation"
              onClick={() => {
                setType("one-time");
                setError("");
              }}
            />

            <DonationTypeButton
              active={type === "auto"}
              icon="↻"
              title="Auto Seva"
              description="Recurring seva"
              onClick={() => {
                setType("auto");
                setError("");
              }}
            />
          </div>

          {type === "auto" && (
            <AutoSevaBox
              frequency={frequency}
              setFrequency={(value) => {
                setFrequency(value);
                setError("");
              }}
            />
          )}

          <SectionTitle>Donation Amount</SectionTitle>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
            {amounts.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setAmount(value);
                  setCustomAmount("");
                  setError("");
                }}
                aria-pressed={amount === value}
                className={`min-h-11 rounded-lg border px-2 text-sm font-bold transition-colors sm:min-h-[48px] ${amount === value ? "border-[#a71919] bg-[#fff1e7] text-[#a71919]" : "border-[#eadbc5] bg-[#fffdf8] text-[#433932] hover:border-[#a71919]"}`}
              >
                ₹{Number(value).toLocaleString("en-IN")}
              </button>
            ))}

            <button
              type="button"
              onClick={() => {
                setAmount("custom");
                setError("");
              }}
              aria-pressed={amount === "custom"}
              className={`min-h-11 rounded-lg border px-2 text-sm font-bold sm:min-h-[48px] ${amount === "custom" ? "border-[#a71919] bg-[#fff1e7] text-[#a71919]" : "border-[#eadbc5] bg-[#fffdf8] text-[#433932] hover:border-[#a71919]"}`}
            >
              Custom
            </button>
          </div>

          {amount === "custom" && (
            <div className="mt-3 flex h-12 items-center gap-2 rounded-lg border border-[#d9c6ad] bg-white px-3">
              <span className="text-lg font-bold text-[#a71919]">₹</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter amount"
                aria-label="Custom donation amount"
                value={customAmount}
                onChange={handleCustomAmount}
                className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[#9a9189]"
              />
            </div>
          )}

          <SectionTitle>Select Payment Method</SectionTitle>

          <div className="flex flex-col gap-3">
            <PaymentButton
              active={paymentMethod === "upi"}
              icon="✓"
              title="UPI"
              description="GPay, PhonePe, Paytm"
              onClick={() => setPaymentMethod("upi")}
            />

            <PaymentButton
              active={paymentMethod === "card"}
              icon="▣"
              title="Credit / Debit Card"
              description="Visa, Mastercard & more"
              onClick={() => setPaymentMethod("card")}
            />

            <PaymentButton
              active={paymentMethod === "netbanking"}
              icon="▤"
              title="Net Banking"
              description="All major banks"
              onClick={() => setPaymentMethod("netbanking")}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <div className="mt-6 lg:hidden">
            <Summary
              seva={seva}
              type={type}
              frequency={frequency}
              paymentMethod={paymentMethod}
              formattedAmount={formattedAmount}
              mandateAccepted={mandateAccepted}
              onMandateChange={(checked) => {
                setMandateAccepted(checked);
                setError("");
              }}
              handlePayment={handlePayment}
            />
          </div>
        </div>

        <div className="hidden min-w-0 lg:block">
          <Summary
            seva={seva}
            type={type}
            frequency={frequency}
            paymentMethod={paymentMethod}
            formattedAmount={formattedAmount}
            mandateAccepted={mandateAccepted}
            onMandateChange={(checked) => {
              setMandateAccepted(checked);
              setError("");
            }}
            handlePayment={handlePayment}
          />
        </div>
      </section>
    </main>
  );
}
