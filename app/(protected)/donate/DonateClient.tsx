"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const frequencies = [
  { id: "daily", title: "Daily", subtitle: "Every day" },
  { id: "weekly", title: "Weekly", subtitle: "Every week" },
  { id: "monthly", title: "Monthly", subtitle: "Every month" },
];

const amounts = ["101", "501", "1001", "5001"];

type DonationType = "one-time" | "auto";
type PaymentMethod = "upi" | "card" | "netbanking";

const sectionTitle =
  "mb-2 mt-[17px] font-[Georgia,'Times_New_Roman',serif] text-base text-[#3d332c] max-[359px]:mt-[14px] min-[600px]:max-[1023px]:mt-[23px] min-[600px]:max-[1023px]:text-lg lg:mt-[25px] lg:text-lg";

const responsiveBox = "rounded-[10px] border border-[#eadbc5] bg-[#fffdf8]";

const optionButton =
  "flex min-h-[67px] items-center gap-2 rounded-[10px] border px-3 py-2 text-left transition-all max-[359px]:min-h-[62px] min-[600px]:max-[1023px]:min-h-[84px] lg:min-h-[88px] lg:rounded-xl lg:px-[17px]";

const paymentButton =
  "flex min-h-[58px] items-center gap-2.5 rounded-[9px] border px-3 py-2 text-left transition-all min-[600px]:max-[1023px]:min-h-[66px] lg:min-h-[68px] lg:rounded-[11px] lg:px-[15px]";

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
      className={`${optionButton} ${
        active
          ? "border-[#a71919] bg-[#fff1e7] text-[#a71919]"
          : "border-[#eadbc5] bg-[#fffdf8] text-[#443932] hover:-translate-y-0.5 hover:border-[#d6b77d]"
      }`}
    >
      <span
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-bold lg:h-10 lg:w-10 ${
          active ? "bg-[#a71919] text-white" : "bg-[#f6ead5] text-[#a71919]"
        }`}
      >
        {icon}
      </span>

      <span className="flex min-w-0 flex-col gap-1">
        <strong className="text-xs lg:text-[15px]">{title}</strong>
        <span className="text-[9px] leading-tight text-[#8a8077] lg:text-[11px]">
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
      className={`${paymentButton} ${
        active
          ? "border-[#a71919] bg-[#fff8f2]"
          : "border-[#eadbc5] bg-[#fffdf8]"
      } lg:hover:-translate-y-px lg:hover:border-[#d7b97f]`}
    >
      <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-[#e4f4e8] text-xs font-bold text-[#14945f] lg:h-[38px] lg:w-[38px]">
        {icon}
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <strong className="text-xs lg:text-sm">{title}</strong>
        <small className="text-[9px] text-[#8a8077] lg:text-[10px]">
          {description}
        </small>
      </span>

      <span className="text-lg text-[#a71919]">{active ? "●" : "○"}</span>
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
    <div className="mt-3 rounded-[11px] border border-[#e7cf9e] bg-[#fff8e9] p-3 lg:rounded-[13px] lg:p-[18px]">
      <div className="flex items-start gap-2.5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f2e0bf] lg:h-10 lg:w-10">
          🔄
        </div>

        <div>
          <strong className="text-sm text-[#641010] lg:text-[15px]">
            Start Auto Seva
          </strong>

          <p className="m-0 mt-1 text-[10px] leading-tight text-[#776d65] lg:text-[11px]">
            Your selected amount will be automatically debited.
          </p>
        </div>
      </div>

      <h3 className="mb-2 mt-3 text-xs text-[#4b4039] lg:text-[13px]">
        Select Frequency
      </h3>

      <div className="grid grid-cols-3 gap-2">
        {frequencies.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFrequency(item.id)}
            className={`flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-lg border px-1 py-1.5 lg:min-h-16 ${
              frequency === item.id
                ? "border-[#a71919] bg-[#a71919] text-white"
                : "border-[#eadbc5] bg-white text-[#443932]"
            }`}
          >
            <strong className="text-xs lg:text-[13px]">{item.title}</strong>

            <span
              className={`text-[9px] lg:text-[10px] ${
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
        ? "Card"
        : "Net Banking";

  return (
    <aside className="hidden lg:sticky lg:top-7 lg:block">
      <div className="rounded-[20px] border border-[#eadbc5] bg-[#fffdf8] px-6 py-7 shadow-[0_10px_30px_rgba(80,45,15,0.07)]">
        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[1.2px] text-[#c99435]">
          Donation Summary
        </span>

        <h2 className="mb-6 font-[Georgia,'Times_New_Roman',serif] text-[23px] text-[#641010]">
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

        <SummaryRow label="Payment" value={paymentName} />

        <div className="my-[22px] h-px bg-[#eadbc5]" />

        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#776d65]">Total Amount</span>

          <strong className="font-[Georgia,'Times_New_Roman',serif] text-[25px] text-[#a71919]">
            ₹{formattedAmount}
          </strong>
        </div>

        <PayButton
          type={type}
          amount={formattedAmount}
          onClick={handlePayment}
        />

        <SecureNote />

        {type === "auto" && <AutoNote />}
      </div>
    </aside>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-3.5 flex items-center justify-between gap-3 text-xs text-[#776d65]">
      <span>{label}</span>
      <strong className="text-right text-xs text-[#433932]">{value}</strong>
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
      className="mt-6 h-[55px] w-full rounded-xl bg-[#a71919] text-[15px] font-bold text-white shadow-[0_7px_18px_rgba(113,17,17,0.14)] transition-all hover:-translate-y-px hover:bg-[#7f1111] active:scale-[0.985]"
    >
      {type === "auto" ? `Start Auto Seva ₹${amount}` : `Pay ₹${amount}`}
    </button>
  );
}

function SecureNote() {
  return (
    <div className="mt-3.5 text-center text-[10px] font-semibold text-[#9b762f]">
      🔒 100% Secure Payment
    </div>
  );
}

function AutoNote() {
  return (
    <p className="m-0 mt-3 text-center text-[9px] leading-snug text-[#8a8077]">
      By continuing, you authorize the recurring payment mandate for your
      selected seva and frequency. You can cancel your Auto Seva later.
    </p>
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
  const formattedAmount = Number(finalAmount || 0).toLocaleString("en-IN");

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value.replace(/\D/g, ""));
  };

  const handlePayment = () => {
    if (!finalAmount || Number(finalAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    router.push(
      `/donation/success?seva=${encodeURIComponent(
        seva,
      )}&amount=${encodeURIComponent(
        finalAmount,
      )}&type=${type}&frequency=${frequency}&method=${paymentMethod}`,
    );
  };

  return (
    <main className="min-h-dvh bg-[#fff9ed] text-[#4b4039] lg:min-h-screen lg:pb-[60px] lg:bg-[radial-gradient(circle_at_top_right,rgba(201,148,53,0.12),transparent_30%),#fff9ed]">
      {/* HEADER */}
      <header className="flex h-[72px] items-center justify-between border-b border-[#eadbc5] bg-[#fffdf8] px-4 lg:h-[84px] lg:justify-start lg:gap-[18px] lg:px-[42px]">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Back"
          className="grid h-10 w-10 place-items-center rounded-full border border-[#eadbc5] bg-[#fffdf8] text-[29px] leading-none text-[#a71919] shadow-sm lg:h-11 lg:w-11"
        >
          ‹
        </button>

        <div className="flex-1 text-center lg:flex-none lg:text-left">
          <span className="hidden text-[10px] font-bold uppercase tracking-[1.3px] text-[#9a762f] lg:block">
            Secure Donation
          </span>

          <h1 className="font-[Georgia,'Times_New_Roman',serif] text-[23px] text-[#641010] lg:text-[26px]">
            Payment
          </h1>
        </div>

        <div className="w-10 lg:hidden" />
      </header>

      {/* DESKTOP HERO */}
      <section className="mx-auto mt-8 hidden min-h-[145px] w-[calc(100%-80px)] max-w-[1320px] items-center justify-between rounded-[22px] border border-[#eadbc5] bg-[linear-gradient(135deg,#fffdf8,#fff2dc)] px-8 py-7 shadow-[0_10px_30px_rgba(80,45,15,0.06)] lg:flex">
        <div>
          <span className="mb-2 block text-[11px] font-bold uppercase tracking-[1.4px] text-[#c99435]">
            Shri Govardhannath Haveli
          </span>

          <h1 className="font-[Georgia,'Times_New_Roman',serif] text-[34px] text-[#641010]">
            Complete Your Seva
          </h1>

          <p className="mt-2 text-sm text-[#776d65]">
            Make your offering securely and continue your seva.
          </p>
        </div>

        <div className="grid h-[84px] w-[84px] place-items-center rounded-full border border-[#dec182] bg-[#fffdf8] text-[41px]">
          🛕
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-4 pb-8 pt-3 lg:mx-auto lg:grid lg:w-[calc(100%-80px)] lg:max-w-[1320px] lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-7 lg:px-0 lg:pt-7">
        {/* MAIN */}
        <div className="min-w-0 lg:rounded-[20px] lg:border lg:border-[#eadbc5] lg:bg-[#fffdf8] lg:p-[26px] lg:shadow-[0_8px_26px_rgba(82,48,18,0.05)]">
          {/* SEVA */}
          <div
            className={`${responsiveBox} flex items-center gap-3 p-3 lg:p-[17px]`}
          >
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[10px] bg-[#f4e5c8] text-[27px] lg:h-[68px] lg:w-[68px] lg:text-[33px]">
              🛕
            </div>

            <div className="min-w-0">
              <span className="hidden text-[10px] font-bold uppercase tracking-wider text-[#9a762f] lg:block">
                Selected Seva
              </span>

              <h2 className="mb-1 truncate font-[Georgia,'Times_New_Roman',serif] text-lg text-[#332820] lg:text-[22px]">
                {seva}
              </h2>

              <p className="m-0 text-sm font-bold text-[#a71919] lg:text-base">
                ₹{formattedAmount}
              </p>
            </div>
          </div>

          {/* DONATION TYPE */}
          <SectionTitle>Choose Donation Type</SectionTitle>

          <div className="grid grid-cols-2 gap-2.5">
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
              description="Automatic recurring seva"
              onClick={() => setType("auto")}
            />
          </div>

          {/* AUTO SEVA */}
          {type === "auto" && (
            <AutoSevaBox frequency={frequency} setFrequency={setFrequency} />
          )}

          {/* AMOUNT */}
          <SectionTitle>Donation Amount</SectionTitle>

          <div className="grid grid-cols-3 gap-2 lg:grid-cols-5">
            {amounts.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setAmount(value);
                  setCustomAmount("");
                }}
                className={`h-11 rounded-lg border px-1.5 text-sm font-bold transition-colors lg:h-[52px] ${
                  amount === value
                    ? "border-[#a71919] bg-[#fff1e7] text-[#a71919]"
                    : "border-[#eadbc5] bg-[#fffdf8] text-[#433932] lg:hover:border-[#a71919]"
                }`}
              >
                ₹{Number(value).toLocaleString("en-IN")}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setAmount("custom")}
              className={`h-11 rounded-lg border px-1.5 text-sm font-bold lg:h-[52px] ${
                amount === "custom"
                  ? "border-[#a71919] bg-[#fff1e7] text-[#a71919]"
                  : "border-[#eadbc5] bg-[#fffdf8] text-[#433932] lg:hover:border-[#a71919]"
              }`}
            >
              Custom
            </button>
          </div>

          {/* CUSTOM AMOUNT */}
          {amount === "custom" && (
            <div className="mt-2 flex h-12 items-center gap-1 rounded-lg border border-[#d9c6ad] bg-white px-3 lg:h-[54px]">
              <span className="text-[17px] font-bold text-[#a71919]">₹</span>

              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter amount"
                value={customAmount}
                onChange={handleCustomAmount}
                className="w-full border-0 bg-transparent text-[15px] outline-none placeholder:text-[#9a9189]"
              />
            </div>
          )}

          {/* PAYMENT */}
          <SectionTitle>Select Payment Method</SectionTitle>

          <div className="flex flex-col gap-2.5">
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
        </div>

        {/* DESKTOP SUMMARY */}
        <Summary
          seva={seva}
          type={type}
          frequency={frequency}
          paymentMethod={paymentMethod}
          formattedAmount={formattedAmount}
          handlePayment={handlePayment}
        />

        {/* MOBILE PAYMENT */}
        <div className="lg:hidden">
          <PayButton
            type={type}
            amount={formattedAmount}
            onClick={handlePayment}
          />

          <SecureNote />

          {type === "auto" && <AutoNote />}
        </div>
      </section>
    </main>
  );
}
