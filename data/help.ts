export type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

export const FAQS_DATA: FAQItem[] = [
  {
    id: 1,
    question: "How can I book a Seva?",
    answer:
      "Go to the Seva section, select the Seva you want, choose the available option and continue with the booking process.",
  },
  {
    id: 2,
    question: "How can I make a donation?",
    answer:
      "Open the Donation section, select a donation purpose or enter your preferred amount, then continue to payment.",
  },
  {
    id: 3,
    question: "Where can I see my bookings?",
    answer:
      "Open Profile and select My Bookings to view your upcoming, completed and cancelled bookings.",
  },
  {
    id: 4,
    question: "Where can I find my donation receipt?",
    answer:
      "Open Profile → My Donations. Successful donations will show the receipt option when receipt generation is connected.",
  },
  {
    id: 5,
    question: "How can I order Prasadam?",
    answer:
      "Open Prasadam, add the items you want to your cart, open My Cart and continue to checkout.",
  },
  {
    id: 6,
    question: "How can I change the app language?",
    answer:
      "Open Profile → Settings and select English, Hindi or Gujarati. Your selected language will be saved automatically.",
  },
];
