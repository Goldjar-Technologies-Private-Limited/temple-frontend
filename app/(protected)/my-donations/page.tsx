"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type DonationStatus =
  | "successful"
  | "pending"
  | "failed";

type Donation = {
  id: string;
  transactionId: string;
  title: string;
  date: string;
  amount: number;
  paymentMethod: string;
  status: DonationStatus;
  donorName: string;
};

type FilterType = "all" | DonationStatus;

/* =========================================================
   FILTERS
========================================================= */

const filters: {
  key: FilterType;
  label: string;
}[] = [
  {
    key: "all",
    label: "All",
  },
  {
    key: "successful",
    label: "Successful",
  },
  {
    key: "pending",
    label: "Pending",
  },
  {
    key: "failed",
    label: "Failed",
  },
];

/* =========================================================
   DUMMY DONATION DATA
========================================================= */

const dummyDonations: Donation[] = [
  {
    id: "DON001",
    transactionId: "TXN20260001",
    title: "Food Seva",
    date: "28 Sep 2026",
    amount: 500,
    paymentMethod: "UPI",
    status: "successful",
    donorName: "Krishna Sharma",
  },
  {
    id: "DON002",
    transactionId: "TXN20260002",
    title: "Education Seva",
    date: "20 Sep 2026",
    amount: 1000,
    paymentMethod: "Credit Card",
    status: "successful",
    donorName: "Krishna Sharma",
  },
  {
    id: "DON003",
    transactionId: "TXN20260003",
    title: "Medical Seva",
    date: "15 Sep 2026",
    amount: 750,
    paymentMethod: "UPI",
    status: "pending",
    donorName: "Krishna Sharma",
  },
  {
    id: "DON004",
    transactionId: "TXN20260004",
    title: "Gau Seva",
    date: "10 Sep 2026",
    amount: 250,
    paymentMethod: "UPI",
    status: "failed",
    donorName: "Krishna Sharma",
  },
  {
    id: "DON005",
    transactionId: "TXN20260005",
    title: "Annadan Seva",
    date: "05 Sep 2026",
    amount: 1100,
    paymentMethod: "Net Banking",
    status: "successful",
    donorName: "Krishna Sharma",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function MyDonationsPage() {
  const router = useRouter();

  /* =======================================================
     STATE
  ======================================================= */

  const [donations] =
    useState<Donation[]>(dummyDonations);

  const [activeFilter, setActiveFilter] =
    useState<FilterType>("all");

  /* =======================================================
     FILTER DONATIONS
  ======================================================= */

  const filteredDonations = useMemo(() => {
    if (activeFilter === "all") {
      return donations;
    }

    return donations.filter(
      (donation) =>
        donation.status === activeFilter
    );
  }, [activeFilter, donations]);

  /* =======================================================
     SUCCESSFUL DONATIONS
  ======================================================= */

  const successfulDonations = useMemo(() => {
    return donations.filter(
      (donation) =>
        donation.status === "successful"
    );
  }, [donations]);

  /* =======================================================
     TOTAL DONATED
  ======================================================= */

  const totalDonated = useMemo(() => {
    return successfulDonations.reduce(
      (total, donation) =>
        total + Number(donation.amount || 0),
      0
    );
  }, [successfulDonations]);

  /* =======================================================
     FORMAT PRICE
  ======================================================= */

  const formatPrice = (amount: number) => {
    return Number(amount || 0).toLocaleString(
      "en-IN"
    );
  };

  /* =======================================================
     MAIN UI
  ======================================================= */

  return (
    <main
      className="
        min-h-[100dvh]
        bg-[#fffaf1]
        pb-[110px]
        text-[#40372f]

        lg:ml-[92px]
        lg:w-[calc(100%-92px)]
        lg:pb-12
      "
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <header
        className="
          sticky
          top-0
          z-40
          border-b
          border-[#eadfce]
          bg-[#fffaf1]/95
          backdrop-blur-md
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-[64px]
            max-w-[1400px]
            items-center
            gap-3
            px-4

            sm:min-h-[70px]
            sm:px-6

            lg:min-h-[82px]
            lg:px-8
          "
        >
          {/* BACK BUTTON */}

<button
  type="button"
  onClick={() => router.back()}
  aria-label="Go back"
  className="
    group
    grid
    h-9
    w-9
    shrink-0
    place-items-center
    rounded-full
    border
    border-[#ead7b8]
    bg-white
    text-[#641010]
    shadow-sm
    transition-all

    hover:border-[#b8893b]
    hover:bg-[#fff8eb]
    hover:shadow-sm

    active:scale-95

    lg:h-11
    lg:w-11
  "
>
  <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
    <ArrowLeft size={19} strokeWidth={1.8} />
  </span>
</button>

          {/* TITLE */}

          <div className="min-w-0">
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#bd8b39]
              "
            >
              Shri Govardhannath
            </p>

            <h1
              className="
                truncate
                font-serif
                text-[19px]
                font-bold
                text-[#641010]

                lg:text-[25px]
              "
            >
              My Donations
            </h1>
          </div>

          {/* NEW DONATION DESKTOP */}

          <button
            type="button"
            onClick={() =>
              router.push("/seva-donation")
            }
            className="
              ml-auto
              hidden
              min-h-[42px]
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#a71919]
              px-5
              text-[11px]
              font-bold
              text-white
              shadow-[0_6px_16px_rgba(167,25,25,0.15)]
              transition

              hover:bg-[#841313]
              active:scale-[0.98]

              lg:flex
            "
          >
            <HeartIcon />

            Make a Donation
          </button>
        </div>
      </header>

      {/* ===================================================
          HERO / SUMMARY
      =================================================== */}

      <section
        className="
          border-b
          border-[#eadbc5]
          bg-[linear-gradient(135deg,#fff3dd_0%,#fffaf1_60%,#fff7ea_100%)]
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1400px]
            px-4
            py-6

            sm:px-6
            sm:py-8

            lg:px-8
            lg:py-10
          "
        >
          <div
            className="
              grid
              grid-cols-1
              gap-5

              lg:grid-cols-[minmax(0,1fr)_440px]
              lg:items-center
              lg:gap-10
            "
          >
            {/* LEFT */}

            <div>
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#ead4a9]
                  bg-white/70
                  px-3
                  py-1.5
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-[#a56f21]
                "
              >
                <HeartIcon />

                Seva Through Giving
              </span>

              <h2
                className="
                  mt-3
                  max-w-[650px]
                  font-serif
                  text-[24px]
                  font-bold
                  leading-tight
                  text-[#641010]

                  sm:text-[29px]

                  lg:text-[36px]
                "
              >
                Your contribution supports
                temple seva
              </h2>

              <p
                className="
                  mt-2
                  max-w-[610px]
                  text-[11px]
                  leading-5
                  text-[#80746a]

                  sm:text-xs

                  lg:text-[13px]
                  lg:leading-6
                "
              >
                View your donation history,
                payment status and receipts in
                one place.
              </p>
            </div>

            {/* SUMMARY */}

            <div
              className="
                grid
                grid-cols-2
                gap-3
              "
            >
              <SummaryCard
                label="Total Donated"
                value={`₹${formatPrice(
                  totalDonated
                )}`}
                icon="₹"
              />

              <SummaryCard
                label="Successful Donations"
                value={`${successfulDonations.length}`}
                icon="✓"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]
          px-3
          py-5

          sm:px-5
          sm:py-6

          lg:px-8
          lg:py-8
        "
      >
        {/* =================================================
            TITLE + FILTER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            gap-4

            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          <div>
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#b78a3d]
              "
            >
              HISTORY
            </p>

            <h2
              className="
                mt-1
                font-serif
                text-xl
                font-bold
                text-[#641010]

                lg:text-[26px]
              "
            >
              Donation History
            </h2>

            <p
              className="
                mt-1
                text-[10px]
                text-[#8c7e72]

                sm:text-[11px]
              "
            >
              Track all your temple
              contributions.
            </p>
          </div>

          {/* FILTER */}

          <div
            className="
              overflow-x-auto
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            <div
              className="
                flex
                min-w-max
                gap-1
                rounded-xl
                border
                border-[#eadfce]
                bg-[#fffdf8]
                p-1
              "
            >
              {filters.map((filter) => {
                const active =
                  activeFilter === filter.key;

                const count =
                  filter.key === "all"
                    ? donations.length
                    : donations.filter(
                        (donation) =>
                          donation.status ===
                          filter.key
                      ).length;

                return (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() =>
                      setActiveFilter(
                        filter.key
                      )
                    }
                    className={`
                      flex
                      min-h-[37px]
                      items-center
                      justify-center
                      gap-1.5
                      rounded-lg
                      px-3
                      text-[9px]
                      font-bold
                      transition

                      sm:px-4
                      sm:text-[10px]

                      ${
                        active
                          ? `
                            bg-[#a71919]
                            text-white
                            shadow-sm
                          `
                          : `
                            text-[#76695e]
                            hover:bg-[#fff3e1]
                          `
                      }
                    `}
                  >
                    {filter.label}

                    <span
                      className={`
                        grid
                        h-[18px]
                        min-w-[18px]
                        place-items-center
                        rounded-full
                        px-1
                        text-[7px]

                        ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-[#fff0da] text-[#a71919]"
                        }
                      `}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =================================================
            DONATIONS
        ================================================= */}

        {filteredDonations.length > 0 ? (
          <section
            className="
              mt-5
              grid
              grid-cols-1
              gap-4

              md:grid-cols-2

              xl:grid-cols-3
            "
          >
            {filteredDonations.map(
              (donation) => (
                <DonationCard
                  key={donation.id}
                  donation={donation}
                />
              )
            )}
          </section>
        ) : (
          <EmptyState
            filter={activeFilter}
            onDonate={() =>
              router.push("/seva-donation")
            }
          />
        )}

        {/* =================================================
            SECURE INFORMATION
        ================================================= */}

        <section
          className="
            mt-7
            grid
            grid-cols-1
            gap-3

            md:grid-cols-3

            lg:mt-9
            lg:gap-5
          "
        >
          <InfoCard
            icon="shield"
            title="Secure Payments"
            description="Donation payments are processed through secure payment services."
          />

          <InfoCard
            icon="receipt"
            title="Digital Receipts"
            description="Access your donation receipt after a successful transaction."
          />

          <InfoCard
            icon="heart"
            title="Temple Seva"
            description="Your contribution supports temple seva and devotional activities."
          />
        </section>
      </div>

      {/* ===================================================
          MOBILE DONATE BUTTON
      =================================================== */}

      <div
        className="
          fixed
          bottom-[calc(76px+env(safe-area-inset-bottom))]
          left-0
          right-0
          z-30
          border-t
          border-[#eadbc5]
          bg-[#fffdf8]/95
          p-3
          backdrop-blur-md

          lg:hidden
        "
      >
        <button
          type="button"
          onClick={() =>
            router.push("/seva-donation")
          }
          className="
            mx-auto
            flex
            min-h-[48px]
            w-full
            max-w-[600px]
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#a71919]
            px-5
            text-xs
            font-bold
            text-white
            shadow-[0_7px_18px_rgba(167,25,25,0.17)]
            active:scale-[0.99]
          "
        >
          <HeartIcon />

          Make a Donation
        </button>
      </div>
    </main>
  );
}

/* =========================================================
   DONATION CARD
========================================================= */

function DonationCard({
  donation,
}: {
  donation: Donation;
}) {
  const formatPrice = (amount: number) => {
    return Number(amount || 0).toLocaleString(
      "en-IN"
    );
  };

  return (
    <article
      className="
        overflow-hidden
        rounded-[18px]
        border
        border-[#eadfce]
        bg-[#fffdf9]
        shadow-[0_6px_22px_rgba(74,42,16,0.045)]
        transition-all

        lg:hover:-translate-y-1
        lg:hover:shadow-[0_12px_30px_rgba(74,42,16,0.08)]
      "
    >
      {/* TOP */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-3
          border-b
          border-[#f0e4d3]
          bg-[linear-gradient(135deg,#fff8eb,#fffdf9)]
          p-4
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
          "
        >
          <div
            className="
              grid
              h-11
              w-11
              shrink-0
              place-items-center
              rounded-xl
              bg-[#fff0d8]
              text-[#a71919]
            "
          >
            <DonationIcon />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-[#b4873e]
              "
            >
              Donation
            </p>

            <h3
              className="
                mt-[2px]
                truncate
                font-serif
                text-[15px]
                font-bold
                text-[#641010]
              "
            >
              {donation.title}
            </h3>
          </div>
        </div>

        <StatusBadge
          status={donation.status}
        />
      </div>

      {/* BODY */}

      <div className="p-4">
        {/* AMOUNT */}

        <div
          className="
            flex
            items-end
            justify-between
            gap-3
          "
        >
          <div>
            <p
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-[#9e9083]
              "
            >
              Amount
            </p>

            <strong
              className="
                mt-1
                block
                font-serif
                text-[24px]
                text-[#a71919]
              "
            >
              ₹
              {formatPrice(
                donation.amount
              )}
            </strong>
          </div>

          <p
            className="
              text-[9px]
              font-medium
              text-[#918479]
            "
          >
            {donation.date}
          </p>
        </div>

        {/* DETAILS */}

        <div
          className="
            mt-4
            space-y-2.5
            rounded-xl
            bg-[#fff9ef]
            p-3
          "
        >
          <DetailRow
            label="Donation ID"
            value={donation.id}
          />

          <DetailRow
            label="Transaction ID"
            value={donation.transactionId}
          />

          <DetailRow
            label="Payment"
            value={donation.paymentMethod}
          />

          <DetailRow
            label="Donor"
            value={donation.donorName}
          />
        </div>

        {/* ACTION */}

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            gap-3
            border-t
            border-[#f0e5d6]
            pt-3
          "
        >
          <span
            className="
              flex
              items-center
              gap-1.5
              text-[9px]
              text-[#95887d]
            "
          >
            <TempleSmallIcon />

            Shri Govardhannath
          </span>

          {donation.status ===
            "successful" && (
            <button
              type="button"
              onClick={() => {
                console.log(
                  "Download receipt:",
                  donation.id
                );
              }}
              className="
                flex
                items-center
                gap-1.5
                text-[10px]
                font-bold
                text-[#a71919]
                transition

                hover:text-[#7f1212]
              "
            >
              <ReceiptIcon />

              Receipt
            </button>
          )}

          {donation.status === "pending" && (
            <span
              className="
                text-[9px]
                font-semibold
                text-[#9a6514]
              "
            >
              Processing
            </span>
          )}

          {donation.status === "failed" && (
            <button
              type="button"
              className="
                text-[10px]
                font-bold
                text-[#a71919]
              "
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   STATUS
========================================================= */

function StatusBadge({
  status,
}: {
  status: DonationStatus;
}) {
  const styles = {
    successful:
      "border-[#cde4d1] bg-[#eff8f0] text-[#347243]",

    pending:
      "border-[#ead19d] bg-[#fff5dd] text-[#9a6514]",

    failed:
      "border-[#efd0cb] bg-[#fff1ef] text-[#a23a32]",
  };

  const labels = {
    successful: "Successful",
    pending: "Pending",
    failed: "Failed",
  };

  return (
    <span
      className={`
        shrink-0
        rounded-full
        border
        px-2.5
        py-1
        text-[8px]
        font-bold
        ${styles[status]}
      `}
    >
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
  icon: string;
}) {
  return (
    <div
      className="
        rounded-[16px]
        border
        border-[#ead7b7]
        bg-[#fffdf8]/90
        p-4
        shadow-[0_5px_18px_rgba(74,42,16,0.04)]

        lg:p-5
      "
    >
      <div
        className="
          grid
          h-9
          w-9
          place-items-center
          rounded-xl
          bg-[#fff0d8]
          text-sm
          font-bold
          text-[#a71919]
        "
      >
        {icon}
      </div>

      <strong
        className="
          mt-3
          block
          font-serif
          text-[20px]
          text-[#641010]

          lg:text-[23px]
        "
      >
        {value}
      </strong>

      <p
        className="
          mt-1
          text-[9px]
          font-medium
          text-[#918479]

          lg:text-[10px]
        "
      >
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   DETAIL ROW
========================================================= */

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-start
        justify-between
        gap-4
      "
    >
      <span
        className="
          shrink-0
          text-[9px]
          text-[#998b7e]
        "
      >
        {label}
      </span>

      <strong
        className="
          min-w-0
          break-all
          text-right
          text-[9px]
          font-semibold
          text-[#554a41]
        "
      >
        {value}
      </strong>
    </div>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        flex
        items-start
        gap-3
        rounded-[15px]
        border
        border-[#eadfce]
        bg-[#fffdf9]
        p-4
      "
    >
      <div
        className="
          grid
          h-9
          w-9
          shrink-0
          place-items-center
          rounded-xl
          bg-[#fff0d8]
          text-[#a71919]
        "
      >
        {icon === "shield" && (
          <ShieldIcon />
        )}

        {icon === "receipt" && (
          <ReceiptIcon />
        )}

        {icon === "heart" && (
          <HeartIcon />
        )}
      </div>

      <div>
        <h3
          className="
            text-[11px]
            font-bold
            text-[#51463d]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            text-[9px]
            leading-4
            text-[#918479]

            lg:text-[10px]
            lg:leading-5
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY
========================================================= */

function EmptyState({
  filter,
  onDonate,
}: {
  filter: FilterType;
  onDonate: () => void;
}) {
  return (
    <section
      className="
        mx-auto
        mt-8
        max-w-[450px]
        rounded-[20px]
        border
        border-[#eadfce]
        bg-[#fffdf9]
        p-8
        text-center
      "
    >
      <div
        className="
          mx-auto
          grid
          h-[72px]
          w-[72px]
          place-items-center
          rounded-full
          bg-[#fff0d8]
          text-[#a71919]
        "
      >
        <DonationIcon />
      </div>

      <h2
        className="
          mt-5
          font-serif
          text-xl
          font-bold
          text-[#641010]
        "
      >
        No donations found
      </h2>

      <p
        className="
          mt-2
          text-[11px]
          leading-5
          text-[#887b70]
        "
      >
        {filter === "all"
          ? "Your temple donation history will appear here."
          : `You don't have any ${filter} donations.`}
      </p>

      <button
        type="button"
        onClick={onDonate}
        className="
          mt-5
          min-h-[44px]
          rounded-xl
          bg-[#a71919]
          px-6
          text-[11px]
          font-bold
          text-white
        "
      >
        Make a Donation
      </button>
    </section>
  );
}

/* =========================================================
   ICONS
========================================================= */

function BackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-[18px] w-[18px]"
    >
      <path
        d="m15 18-6-6 6-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[17px] w-[17px]"
    >
      <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" />
    </svg>
  );
}

function DonationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[20px] w-[20px]"
    >
      <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" />
      <path d="M12 8v7" />
      <path d="M9.5 10.5H14" />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[15px] w-[15px]"
    >
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[17px] w-[17px]"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function TempleSmallIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M3 21h18" />
      <path d="M5 21V10h14v11" />
      <path d="M3 10h18" />
      <path d="M6 10l6-6 6 6" />
    </svg>
  );
}