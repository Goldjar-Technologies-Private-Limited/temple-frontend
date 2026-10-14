export type DonationStatus = "successful" | "pending" | "failed";

export type DonationItem = {
  id: string;
  transactionId: string;
  title: string;
  date: string;
  amount: number;
  paymentMethod: string;
  status: DonationStatus;
  donorName: string;
};

export type DonationFilterType = "all" | DonationStatus;

export const DONATION_FILTERS: { key: DonationFilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "successful", label: "Successful" },
  { key: "pending", label: "Pending" },
  { key: "failed", label: "Failed" },
];

export const DUMMY_DONATIONS: DonationItem[] = [
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

export const DONATION_FREQUENCIES = [
  { id: "daily", title: "Daily", subtitle: "Every day" },
  { id: "weekly", title: "Weekly", subtitle: "Every week" },
  { id: "monthly", title: "Monthly", subtitle: "Every month" },
];

export const DONATION_AMOUNTS = ["101", "501", "1001", "5001"];
