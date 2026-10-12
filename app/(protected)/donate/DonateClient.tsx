"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const frequencies = [
  { id: "daily", title: "Daily", subtitle: "Every day" },
  { id: "weekly", title: "Weekly", subtitle: "Every week" },
  { id: "monthly", title: "Monthly", subtitle: "Every month" },
];

const amounts = ["101", "501", "1001", "5001"];

type DonationType = "one-time" | "auto";
type PaymentMethod = "upi" | "card" | "netbanking";

const sectionTitle =
  "mb-3 mt-6 font-[Georgia,'Times_New_Roman',serif] text-base text-[#3d332c] sm:text-lg lg:mt-7";

const responsiveBox = "rounded-xl border border-[#eadbc5] bg-[#fffdf8]";

const optionButton =
  "flex min-h-[67px] items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all sm:min-h-[76px] sm:px-4 lg:min-h-[84px]";

const paymentButton =
  "flex min-h-[62px] items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all sm:min-h-[68px] sm:px-4";

function SectionTitle({ children }: { children: React.ReactNode }) {
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
      className={`${optionButton} ${
        active
          ? "border-[#a71919] bg-[#fff1e7] text-[#a71919]"
          : "border-[#eadbc5] bg-[#fffdf8] text-[#443932] hover:border-[#d6b77d]"
      }`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-base font-bold sm:h-10 sm:w-10 ${
          active ? "bg-[#a71919] text-white" : "bg-[#f6ead5] text-[#a71919]"
        }`}
      >
        {icon}
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <strong className="text-sm sm:text-base">{title}</strong>
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
      className={`${paymentButton} ${
        active
          ? "border-[#a71919] bg-[#fff8f2]"
          : "border-[#eadbc5] bg-[#fffdf8]"
      } hover:border-[#d7b97f]`}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e4f4e8] text-sm font-bold text-[#14945f] sm:h-10 sm:w-10">
        {icon}
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <strong className="text-sm text-[#433932] sm:text-base">{title}</strong>
        <span className="text-[10px] text-[#8a8077] sm:text-xs">
          {description}
        </span>
      </span>

      <span
        aria-hidden="true"
        className={`text-lg ${active ? "text-[#a71919]" : "text-[#b8aa9b]"}`}
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
            className={`flex min-h-[60px] min-w-0 flex-col items-center justify-center gap-1 rounded-lg border px-1 py-2 sm:min-h-[70px] ${
              frequency === item.id
                ? "border-[#a71919] bg-[#a71919] text-white"
                : "border-[#eadbc5] bg-white text-[#443932] hover:border-[#a71919]"
            }`}
          >
            <strong className="text-xs sm:text-sm">{item.title}</strong>

            <span
              className={`text-[9px] sm:text-[10px] ${
                frequency === item.id ? "text-[#f9e8df]" : "text-[#8a8077]"
              }`}
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
      <span className="text-[#776d65]">{label}</span>
      <strong className="text-right text-[#433932]">{value}</strong>
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
      className="mt-5 min-h-[52px] w-full rounded-xl bg-[#a71919] px-4 py-3 text-sm font-bold text-white shadow-[0_7px_18px_rgba(113,17,17,0.14)] transition hover:bg-[#7f1111] active:scale-[0.99] sm:text-base"
    >
      {type === "auto"
        ? `Continue to Auto Seva · ₹${amount}`
        : `Continue to Pay · ₹${amount}`}
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

function AutoNote() {
  return (
    <p className="mt-3 text-center text-[10px] leading-relaxed text-[#8a8077] sm:text-xs">
      Recurring payments require authorization through a supported payment
      provider. Review the mandate terms before confirming.
    </p>
  );
}

function Summary({
  seva,
  type,
  frequency,
  paymentMethod,
  formattedAmount,
  handlePayment,
}: {
  seva: string;
  type: DonationType;
  frequency: string;
  paymentMethod: PaymentMethod;
  formattedAmount: string;
  handlePayment: () => void;
}) {
  const paymentName =
    paymentMethod === "upi"
      ? "UPI"
      : paymentMethod === "card"
        ? "Credit / Debit Card"
        : "Net Banking";

  return (
    <aside className="rounded-xl border border-[#eadbc5] bg-[#fffdf8] p-4 shadow-[0_8px_26px_rgba(82,48,18,0.05)] sm:p-5 lg:sticky lg:top-[104px] lg:rounded-[20px] lg:p-6">
      <span className="text-[10px] font-bold uppercase tracking-[1.3px] text-[#c99435]">
        Donation Summary
      </span>

      <h2 className="mt-2 break-words font-[Georgia,'Times_New_Roman',serif] text-xl text-[#641010] sm:text-2xl">
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

        <strong className="break-words text-right font-[Georgia,'Times_New_Roman',serif] text-2xl text-[#a71919]">
          ₹{formattedAmount}
        </strong>
      </div>

      <PayButton type={type} amount={formattedAmount} onClick={handlePayment} />

      <SecureNote />

      {type === "auto" && <AutoNote />}
    </aside>
  );
}

export default function DonatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const seva = searchParams.get("seva") || "Go Seva";
  const urlAmount = searchParams.get("amount") || "1001";

  const [amount, setAmount] = useState(urlAmount);
  const [type, setType] = useState<DonationType>("one-time");
  const [frequency, setFrequency] = useState("monthly");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");

  const finalAmount = amount === "custom" ? customAmount : amount;
  const numericAmount = Number(finalAmount);
  const formattedAmount = Number.isFinite(numericAmount)
    ? numericAmount.toLocaleString("en-IN")
    : "0";

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value.replace(/\D/g, ""));
  };

  const handlePayment = () => {
    if (
      !finalAmount ||
      !Number.isSafeInteger(numericAmount) ||
      numericAmount <= 0
    ) {
      alert("Please enter a valid donation amount.");
      return;
    }

    const params = new URLSearchParams({
      seva,
      amount: finalAmount,
      type,
      frequency,
      method: paymentMethod,
    });

    // Demo navigation only. Integrate a real payment gateway
    // and verify payments on your server before accepting donations.
    router.push(`/donation/success?${params.toString()}`);
  };

  return (
    <main className="min-h-dvh overflow-x-clip bg-[#fff9ed] text-[#4b4039]">
      {/* RESPONSIVE HEADER */}
      <header className="sticky top-0 z-50 flex min-h-[72px] w-full items-center gap-3 border-b border-[#eadbc5] bg-[#fffdf8] px-4 py-3 sm:px-6 lg:min-h-[84px] lg:px-10">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#eadbc5] bg-[#fffdf8] text-[#a71919] shadow-sm transition hover:border-[#a71919] hover:bg-[#fff1e7] active:scale-95 lg:h-11 lg:w-11"
        >
          <ArrowLeft size={19} strokeWidth={1.8} />
        </button>

        <div className="min-w-0 flex-1">
          <span className="hidden text-[10px] font-bold uppercase tracking-[1.3px] text-[#9a762f] lg:block">
            Secure Donation
          </span>

          <h1 className="font-[Georgia,'Times_New_Roman',serif] text-xl text-[#641010] sm:text-2xl lg:text-[26px]">
            Payment
          </h1>
        </div>

        <span className="hidden text-xs text-[#8a8077] sm:block">
          Shri Govardhannath Haveli
        </span>
      </header>

      {/* DESKTOP HERO */}
      <section className="mx-auto hidden w-[calc(100%-80px)] max-w-[1400px] items-center justify-between rounded-[22px] border border-[#eadbc5] bg-[linear-gradient(135deg,#fffdf8,#fff2dc)] px-8 py-7 shadow-[0_10px_30px_rgba(80,45,15,0.06)] lg:mt-8 lg:flex">
        <div>
          <span className="mb-2 block text-[11px] font-bold uppercase tracking-[1.4px] text-[#c99435]">
            Shri Govardhannath Haveli
          </span>

          <h2 className="font-[Georgia,'Times_New_Roman',serif] text-3xl text-[#641010] xl:text-[34px]">
            Complete Your Seva
          </h2>

          <p className="mt-2 text-sm text-[#776d65]">
            Make your offering and review your donation details.
          </p>
        </div>

        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-[#dec182] bg-[#fffdf8] text-4xl">
          🛕
        </div>
      </section>

      {/* RESPONSIVE CONTENT */}
      <section className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-5 px-4 pb-8 pt-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-7 lg:px-10 lg:pt-7 xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* MAIN FORM */}
        <div className="min-w-0 rounded-xl border border-[#eadbc5] bg-[#fffdf8] p-4 sm:p-5 lg:rounded-[20px] lg:p-7">
          {/* SELECTED SEVA */}
          <div
            className={`${responsiveBox} flex items-center gap-3 p-3 sm:p-4`}
          >
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#f4e5c8] text-2xl sm:h-14 sm:w-14">
              🛕
            </div>

            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9a762f]">
                Selected Seva
              </span>

              <h2 className="truncate font-[Georgia,'Times_New_Roman',serif] text-lg text-[#332820] sm:text-xl">
                {seva}
              </h2>

              <p className="m-0 font-bold text-[#a71919]">₹{formattedAmount}</p>
            </div>
          </div>

          {/* DONATION TYPE */}
          <SectionTitle>Choose Donation Type</SectionTitle>

          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
            <DonationTypeButton
              active={type === "one-time"}
              icon="₹"
              title="One Time"
              description="Make a single donation"
              onClick={() => setType("one-time")}
            />

            <DonationTypeButton
              active={type === "auto"}
              icon="↻"
              title="Auto Seva"
              description="Recurring seva"
              onClick={() => setType("auto")}
            />
          </div>

          {/* AUTO SEVA */}
          {type === "auto" && (
            <AutoSevaBox frequency={frequency} setFrequency={setFrequency} />
          )}

          {/* DONATION AMOUNT */}
          <SectionTitle>Donation Amount</SectionTitle>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
            {amounts.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setAmount(value);
                  setCustomAmount("");
                }}
                aria-pressed={amount === value}
                className={`min-h-11 rounded-lg border px-2 text-sm font-bold transition-colors sm:min-h-[48px] ${
                  amount === value
                    ? "border-[#a71919] bg-[#fff1e7] text-[#a71919]"
                    : "border-[#eadbc5] bg-[#fffdf8] text-[#433932] hover:border-[#a71919]"
                }`}
              >
                ₹{Number(value).toLocaleString("en-IN")}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setAmount("custom")}
              aria-pressed={amount === "custom"}
              className={`min-h-11 rounded-lg border px-2 text-sm font-bold sm:min-h-[48px] ${
                amount === "custom"
                  ? "border-[#a71919] bg-[#fff1e7] text-[#a71919]"
                  : "border-[#eadbc5] bg-[#fffdf8] text-[#433932] hover:border-[#a71919]"
              }`}
            >
              Custom
            </button>
          </div>

          {/* CUSTOM AMOUNT */}
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

          {/* PAYMENT METHOD */}
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

          {/* MOBILE AND TABLET SUMMARY */}
          <div className="mt-6 lg:hidden">
            <Summary
              seva={seva}
              type={type}
              frequency={frequency}
              paymentMethod={paymentMethod}
              formattedAmount={formattedAmount}
              handlePayment={handlePayment}
            />
          </div>
        </div>

        {/* DESKTOP SUMMARY */}
        <div className="hidden min-w-0 lg:block">
          <Summary
            seva={seva}
            type={type}
            frequency={frequency}
            paymentMethod={paymentMethod}
            formattedAmount={formattedAmount}
            handlePayment={handlePayment}
          />
        </div>
      </section>
    </main>
  );
}
