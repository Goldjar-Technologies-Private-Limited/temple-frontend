"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Heart,
  ShieldCheck,
  Check,
  ReceiptText,
  HandHeart,
  Landmark,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

import {
  DONATION_FILTERS as filters,
  DUMMY_DONATIONS as dummyDonations,
  type DonationStatus,
  type DonationItem as Donation,
  type DonationFilterType as FilterType,
} from "@/data/donations";

/* =========================================================
   HELPERS
========================================================= */

const HISTORY_KEY = "myDonations";

const formatPrice = (amount: number) =>
  Number(amount || 0).toLocaleString("en-IN");

function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function MyDonationsPage() {
  const router = useRouter();

  const [donations, setDonations] = useState<Donation[]>(dummyDonations);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [historyLoaded, setHistoryLoaded] = useState(false);

  /* Load saved donations from localStorage */

  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          const savedDonations = parsed as Donation[];

          // Saved donations take priority over dummy records with the same ID.
          const combined = [...savedDonations, ...dummyDonations];

          const uniqueDonations = Array.from(
            new Map(
              combined.map((donation) => [donation.id, donation]),
            ).values(),
          );

          setDonations(uniqueDonations);
        }
      }
    } catch (error) {
      console.error("Unable to load donation history:", error);
    } finally {
      setHistoryLoaded(true);
    }
  }, []);

  /* Filter donations */

  const filteredDonations = useMemo(() => {
    if (activeFilter === "all") {
      return donations;
    }

    return donations.filter((donation) => donation.status === activeFilter);
  }, [activeFilter, donations]);

  /* Calculate summary */

  const successfulDonations = useMemo(
    () => donations.filter((donation) => donation.status === "successful"),
    [donations],
  );

  const totalDonated = useMemo(
    () =>
      successfulDonations.reduce(
        (total, donation) => total + Number(donation.amount || 0),
        0,
      ),
    [successfulDonations],
  );

  const counts = useMemo(
    () => ({
      all: donations.length,
      successful: donations.filter(
        (donation) => donation.status === "successful",
      ).length,
      pending: donations.filter((donation) => donation.status === "pending")
        .length,
      failed: donations.filter((donation) => donation.status === "failed")
        .length,
    }),
    [donations],
  );

  const goToSeva = () => router.push("/seva-donation");

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fffaf1] pb-28 text-[#40372f] sm:pb-12 lg:ml-[92px] lg:w-[calc(100%-92px)]">
      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <div className="mx-auto w-full max-w-[1400px] px-3 pt-4 sm:px-5 sm:pt-6 md:px-6 lg:px-8">
        <section className="relative isolate overflow-hidden rounded-2xl border border-[#8e3025]/20 bg-gradient-to-br from-[#641010] via-[#851817] to-[#a83d25] text-white shadow-lg sm:rounded-[24px]">
          {/* Decorative circles */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-20 -z-10 h-64 w-64 rounded-full border border-white/10 bg-[#e9bd70]/10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 left-[30%] -z-10 h-48 w-48 rounded-full bg-[#e9bd70]/10 blur-3xl"
          />

          <div className="relative grid grid-cols-1 items-center gap-6 px-4 py-6 sm:px-7 sm:py-8 md:grid-cols-[minmax(0,1fr)_340px] lg:gap-8 lg:px-9 lg:py-9">
            {/* Hero text */}

            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#f0d49b]/30 bg-white/[0.08] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#f4d69d] sm:text-[10px]">
                <Heart className="h-4 w-4 shrink-0" aria-hidden="true" />
                Seva Through Giving
              </span>

              <h1 className="mt-4 max-w-[460px] font-serif text-2xl font-bold leading-tight sm:text-2xl lg:text-2xl">
                Your Donation
                <span className="block text-[#f1d49a]">History &amp; Seva</span>
              </h1>

              <p className="mt-3 max-w-[490px] text-xs leading-6 text-white/75 sm:text-sm">
                Every contribution is a step towards devotion. Track your
                donations, check payment status, and print your receipts.
              </p>

              <div className="mt-5 flex items-center gap-2 text-[10px] text-white/75 sm:text-xs">
                <ShieldAlert
                  className="h-[17px] w-[17px] shrink-0"
                  aria-hidden="true"
                />
                Your donation history in one place
              </div>
            </div>

            {/* Summary cards */}

            <div className="grid grid-cols-2 gap-3">
              <SummaryCard
                label="Total Donated"
                value={`₹${formatPrice(totalDonated)}`}
                icon="rupee"
              />

              <SummaryCard
                label="Successful Donations"
                value={String(successfulDonations.length)}
                icon="check"
              />
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="mx-auto w-full max-w-[1400px] px-3 py-7 sm:px-5 sm:py-8 md:px-6 lg:px-8 lg:py-9">
        {/* Section heading and filters */}

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-[#b78a3d]" />

              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#a77b34]">
                Your Contributions
              </p>
            </div>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#641010] sm:text-3xl">
              Donation History
            </h2>

            <p className="mt-1 text-[11px] text-[#8c7e72] sm:text-xs">
              View your donations and manage your receipts.
            </p>
          </div>

          {/* Responsive filter buttons */}

          <div className="-mx-3 overflow-x-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
            <div className="flex w-max gap-1.5 rounded-xl border border-[#eadfce] bg-white/80 p-1.5">
              {filters.map((filter) => {
                const active = activeFilter === filter.key;
                const count = counts[filter.key];

                return (
                  <button
                    key={filter.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`flex min-h-10 items-center gap-2 rounded-lg px-3.5 text-[10px] font-bold transition-all sm:px-4 ${
                      active
                        ? "bg-[#641010] text-white shadow-sm"
                        : "text-[#77685b] hover:bg-[#fff3e1] hover:text-[#641010]"
                    }`}
                  >
                    {filter.label}

                    <span
                      className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[8px] ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-[#f8ead5] text-[#9c2420]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===================================================
            DONATION CARDS
        =================================================== */}

        {!historyLoaded ? (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-2xl border border-[#eadfce] bg-white/70"
              />
            ))}
          </div>
        ) : filteredDonations.length > 0 ? (
          <section
            aria-label="Donation history"
            className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            {filteredDonations.map((donation) => (
              <DonationCard key={donation.id} donation={donation} />
            ))}
          </section>
        ) : (
          <EmptyState filter={activeFilter} onDonate={goToSeva} />
        )}

        {/* ===================================================
            INFORMATION SECTION
        =================================================== */}

        <section className="mt-9">
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#b78a3d]">
            Giving With Confidence
          </p>

          <h2 className="mt-1 font-serif text-xl font-bold text-[#641010]">
            Your seva matters
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              icon="shield"
              title="Demo Payment Flow"
              description="This project currently uses simulated payments. No real money is transferred."
            />

            <InfoCard
              icon="receipt"
              title="Printable Receipts"
              description="Open a receipt for a successful demo donation and print it or save it as PDF."
            />

            <InfoCard
              icon="heart"
              title="Temple Seva"
              description="Explore seva options and keep track of your demo donation history."
            />
          </div>
        </section>

        {/* Bottom quote */}

        <div className="mt-8 flex items-center justify-center gap-3 rounded-xl border border-[#eadbc5] bg-[#fff7e9] px-4 py-5 text-center">
          <span className="h-px w-6 shrink-0 bg-[#d5b579]" />

          <p className="font-serif text-xs italic text-[#8d6b3e] sm:text-sm">
            Every act of seva begins with a generous heart.
          </p>

          <span className="h-px w-6 shrink-0 bg-[#d5b579]" />
        </div>
      </div>

      {/* =====================================================
          MOBILE DONATION BUTTON
      ===================================================== */}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#eadfce] bg-[#fffaf1]/95 p-3 backdrop-blur-md sm:hidden">
        <button
          type="button"
          onClick={goToSeva}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#641010] to-[#a71919] px-4 text-sm font-bold text-white shadow-md transition active:scale-[0.98]"
        >
          <Heart className="h-4 w-4" aria-hidden="true" />
          Explore Seva
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </main>
  );
}

/* =========================================================
   DONATION CARD
========================================================= */

function DonationCard({ donation }: { donation: Donation }) {
  const [receiptError, setReceiptError] = useState("");

  const downloadReceipt = () => {
    setReceiptError("");

    if (donation.status !== "successful") {
      setReceiptError("Receipts are available only for successful donations.");
      return;
    }

    const receiptWindow = window.open("", "_blank");

    if (!receiptWindow) {
      setReceiptError("Allow pop-ups in your browser to open the receipt.");
      return;
    }

    const title = escapeHtml(donation.title);
    const donationId = escapeHtml(donation.id);
    const transactionId = escapeHtml(donation.transactionId);
    const paymentMethod = escapeHtml(donation.paymentMethod);
    const donorName = escapeHtml(donation.donorName);
    const donationDate = escapeHtml(donation.date);
    const amount = formatPrice(Number(donation.amount || 0));

    receiptWindow.document.open();

    receiptWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Donation Receipt - ${donationId}</title>
        <style>
          * { box-sizing: border-box; }

          body {
            margin: 0;
            padding: 32px 16px;
            background: #fffaf1;
            color: #40372f;
            font-family: Arial, sans-serif;
          }

          .receipt {
            max-width: 680px;
            margin: 0 auto;
            padding: 32px;
            background: #fffdf9;
            border: 1px solid #eadbc5;
            border-radius: 16px;
          }

          .top {
            padding-bottom: 22px;
            border-bottom: 2px solid #eadbc5;
            text-align: center;
          }

          .temple {
            color: #641010;
            font-family: Georgia, serif;
            font-size: 26px;
            font-weight: bold;
          }

          .subtitle {
            margin-top: 8px;
            color: #8c7e72;
            font-size: 12px;
          }

          .badge {
            display: inline-block;
            margin-top: 18px;
            padding: 7px 12px;
            border-radius: 30px;
            background: #eff8f0;
            color: #347243;
            font-size: 11px;
            font-weight: bold;
          }

          .amount {
            margin: 26px 0;
            padding: 24px 12px;
            border-radius: 12px;
            background: #fff3df;
            text-align: center;
          }

          .amount small {
            display: block;
            color: #8c7e72;
            font-size: 11px;
          }

          .amount strong {
            display: block;
            margin-top: 8px;
            color: #a71919;
            font-size: 32px;
          }

          .row {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            padding: 13px 0;
            border-bottom: 1px solid #f0e5d6;
            font-size: 12px;
          }

          .row span { color: #8c7e72; }

          .row strong {
            max-width: 65%;
            overflow-wrap: anywhere;
            text-align: right;
          }

          .footer {
            margin-top: 26px;
            color: #8d6b3e;
            font-family: Georgia, serif;
            font-size: 12px;
            font-style: italic;
            line-height: 1.7;
            text-align: center;
          }

          .print {
            display: block;
            margin: 24px auto 0;
            padding: 12px 22px;
            border: 0;
            border-radius: 8px;
            background: #641010;
            color: white;
            font-size: 12px;
            font-weight: bold;
            cursor: pointer;
          }

          @media print {
            body { padding: 0; background: white; }
            .receipt { border: 0; border-radius: 0; }
            .print { display: none; }
          }

          @media (max-width: 480px) {
            .receipt { padding: 22px 16px; }
            .temple { font-size: 22px; }
            .row { font-size: 11px; }
          }
        </style>
      </head>

      <body>
        <main class="receipt">
          <header class="top">
            <div class="temple">Shri Govardhannath</div>
            <div class="subtitle">Demo Temple Donation Receipt</div>
            <div class="badge">✓ DEMO PAYMENT SUCCESSFUL</div>
          </header>

          <section class="amount">
            <small>Donation Amount</small>
            <strong>₹${amount}</strong>
          </section>

          <section>
            <div class="row">
              <span>Receipt / Donation ID</span>
              <strong>${donationId}</strong>
            </div>

            <div class="row">
              <span>Transaction ID</span>
              <strong>${transactionId}</strong>
            </div>

            <div class="row">
              <span>Donor Name</span>
              <strong>${donorName}</strong>
            </div>

            <div class="row">
              <span>Donation</span>
              <strong>${title}</strong>
            </div>

            <div class="row">
              <span>Donation Date</span>
              <strong>${donationDate}</strong>
            </div>

            <div class="row">
              <span>Payment Method</span>
              <strong>${paymentMethod}</strong>
            </div>

            <div class="row">
              <span>Status</span>
              <strong>Successful (Demo)</strong>
            </div>
          </section>

          <footer class="footer">
            Thank you for your generous contribution.<br />
            May your seva bring peace and blessings.
            <br /><br />
            This is a demo receipt, not proof of a real payment.
          </footer>

          <button class="print" onclick="window.print()">
            Print / Save as PDF
          </button>
        </main>
      </body>
      </html>
    `);

    receiptWindow.document.close();
    receiptWindow.focus();
  };

  return (
    <article className="group overflow-hidden rounded-[18px] border border-[#eadfce] bg-[#fffdf9] shadow-[0_5px_20px_rgba(74,42,16,0.035)] transition-all duration-300 hover:border-[#d8bd89] hover:shadow-[0_12px_28px_rgba(74,42,16,0.075)]">
      {/* Top accent */}

      <div className="h-[3px] bg-gradient-to-r from-[#641010] via-[#b78a3d] to-[#f0d49b]" />

      {/* Card heading */}

      <div className="flex items-start justify-between gap-3 border-b border-[#f0e4d3] bg-gradient-to-br from-[#fff8eb] to-[#fffdf9] p-4 sm:p-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] border border-[#f0dfc1] bg-[#fff0d8] text-[#a71919]">
            <HandHeart className="h-5 w-5" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#b4873e]">
              Temple Donation
            </p>

            <h3 className="mt-1 break-words text-sm font-bold text-[#641010] sm:text-[15px]">
              {donation.title}
            </h3>
          </div>
        </div>

        <StatusBadge status={donation.status} />
      </div>

      {/* Amount and date */}

      <div className="p-4 sm:p-5">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#9e9083]">
              Donation Amount
            </p>

            <strong className="mt-1 block break-words text-2xl font-extrabold leading-tight text-[#a71919] sm:text-[26px]">
              ₹{formatPrice(Number(donation.amount || 0))}
            </strong>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-[#a89a8c]">
              Date
            </p>

            <p className="mt-1 text-[10px] font-semibold text-[#77685b]">
              {donation.date}
            </p>
          </div>
        </div>

        {/* Transaction details */}

        <div className="mt-4 rounded-xl border border-[#f0e5d6] bg-[#fff9ef] p-3.5">
          <p className="mb-3 text-[8px] font-bold uppercase tracking-[0.15em] text-[#a77b34]">
            Transaction Details
          </p>

          <div className="space-y-3">
            <DetailRow label="Donation ID" value={donation.id} />
            <DetailRow label="Transaction ID" value={donation.transactionId} />
            <DetailRow label="Payment Method" value={donation.paymentMethod} />
            <DetailRow label="Donor Name" value={donation.donorName} />
          </div>
        </div>

        {/* Card actions */}

        <div className="mt-4 flex min-h-[35px] items-center justify-between gap-2 border-t border-[#f0e5d6] pt-3">
          <span className="flex min-w-0 items-center gap-1.5 text-[9px] font-medium text-[#8f8175]">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#fff1dc] text-[#9d762f]">
              <Landmark className="h-3.5 w-3.5" aria-hidden="true" />
            </span>

            <span className="truncate">Shri Govardhannath</span>
          </span>

          {donation.status === "successful" && (
            <button
              type="button"
              onClick={downloadReceipt}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#ead4a9] bg-[#fff7e9] px-3 py-2 text-[10px] font-bold text-[#8f201b] transition hover:bg-[#fff0d8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a71919]"
            >
              <ReceiptText className="h-[15px] w-[15px]" aria-hidden="true" />
              Receipt
            </button>
          )}

          {donation.status === "pending" && (
            <span className="rounded-full bg-[#fff2d6] px-2.5 py-1.5 text-[9px] font-bold text-[#946112]">
              Processing
            </span>
          )}

          {donation.status === "failed" && (
            <button
              type="button"
              onClick={() => window.location.assign("/seva-donation")}
              className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-[#efd0cb] bg-[#fff1ef] px-3 py-2 text-[10px] font-bold text-[#a23a32] transition hover:bg-[#ffe5e1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a71919]"
            >
              Try Again ›
            </button>
          )}
        </div>

        {/* Receipt error */}

        {receiptError && (
          <p
            role="alert"
            className="mt-3 text-[10px] font-medium text-[#a23a32]"
          >
            {receiptError}
          </p>
        )}
      </div>
    </article>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }: { status: DonationStatus }) {
  const styles: Record<DonationStatus, string> = {
    successful: "border-[#cde4d1] bg-[#eff8f0] text-[#347243]",
    pending: "border-[#ead19d] bg-[#fff5dd] text-[#9a6514]",
    failed: "border-[#efd0cb] bg-[#fff1ef] text-[#a23a32]",
  };

  const labels: Record<DonationStatus, string> = {
    successful: "Successful",
    pending: "Pending",
    failed: "Failed",
  };

  const dotStyles: Record<DonationStatus, string> = {
    successful: "bg-[#42965a]",
    pending: "bg-[#c58c28]",
    failed: "bg-[#cf5147]",
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[8px] font-bold sm:text-[9px] ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`} />

      {labels[status]}
    </span>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: "rupee" | "check";
}) {
  return (
    <div className="relative min-w-0 overflow-hidden rounded-[15px] border border-white/15 bg-white/[0.09] p-3.5 backdrop-blur-sm sm:p-4">
      <div className="grid h-8 w-8 place-items-center rounded-lg border border-[#f1d49a]/25 bg-[#f1d49a]/10 text-[#f1d49a]">
        {icon === "rupee" ? <RupeeIcon /> : <CheckIcon />}
      </div>

      <strong className="mt-3 block break-words text-lg font-extrabold leading-tight text-white sm:text-[22px]">
        {value}
      </strong>

      <p className="mt-1.5 min-h-7 text-[9px] font-medium leading-4 text-white/70 sm:text-[10px]">
        {label}
      </p>

      <div className="mt-2.5 h-0.5 w-8 rounded-full bg-gradient-to-r from-[#f1d49a] to-white/20" />
    </div>
  );
}

/* =========================================================
   DETAIL ROW
========================================================= */

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="shrink-0 text-[9px] text-[#998b7e]">{label}</span>

      <strong className="min-w-0 break-all text-right text-[9px] font-semibold leading-4 text-[#554a41]">
        {value || "—"}
      </strong>
    </div>
  );
}

/* =========================================================
   INFORMATION CARD
========================================================= */

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: "shield" | "receipt" | "heart";
  title: string;
  description: string;
}) {
  return (
    <article className="group flex items-start gap-3.5 rounded-[16px] border border-[#eadfce] bg-[#fffdf9] p-4 transition-all duration-300 hover:border-[#d8bd89] hover:shadow-[0_8px_22px_rgba(74,42,16,0.05)]">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#f0dfc1] bg-[#fff2de] text-[#a71919]">
        {icon === "shield" && (
          <ShieldCheck className="h-[17px] w-[17px]" aria-hidden="true" />
        )}

        {icon === "receipt" && (
          <ReceiptText className="h-[15px] w-[15px]" aria-hidden="true" />
        )}

        {icon === "heart" && <Heart className="h-4 w-4" aria-hidden="true" />}
      </div>

      <div className="min-w-0">
        <h3 className="text-xs font-bold text-[#51463d]">{title}</h3>

        <p className="mt-1.5 text-[10px] leading-5 text-[#918479] sm:text-[11px]">
          {description}
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  filter,
  onDonate,
}: {
  filter: FilterType;
  onDonate: () => void;
}) {
  return (
    <section className="relative mx-auto mt-7 max-w-[460px] overflow-hidden rounded-[20px] border border-[#eadfce] bg-[#fffdf9] px-6 py-10 text-center shadow-sm sm:px-9">
      <div className="mx-auto grid h-[72px] w-[72px] place-items-center rounded-full border border-[#f0dfc1] bg-[#fff2de] text-[#a71919]">
        <HandHeart className="h-7 w-7" aria-hidden="true" />
      </div>

      <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#b78a3d]">
        Your Seva Journey
      </p>

      <h2 className="mt-2 font-serif text-xl font-bold text-[#641010]">
        No donations found
      </h2>

      <p className="mx-auto mt-2 max-w-[300px] text-[11px] leading-5 text-[#887b70]">
        {filter === "all"
          ? "Your donation history will appear here when you make a contribution."
          : `You don't have any ${filter} donations at the moment.`}
      </p>

      <button
        type="button"
        onClick={onDonate}
        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#641010] to-[#a71919] px-6 text-[11px] font-bold text-white shadow-sm transition hover:shadow-md active:scale-[0.98]"
      >
        <Heart className="h-4 w-4" aria-hidden="true" />
        Make a Donation
      </button>
    </section>
  );
}

/* =========================================================
   CURRENCY AND CHECK ICONS
========================================================= */

function RupeeIcon() {
  return (
    <span className="text-base leading-none" aria-hidden="true">
      ₹
    </span>
  );
}

function CheckIcon() {
  return <Check className="h-4 w-4" aria-hidden="true" />;
}
