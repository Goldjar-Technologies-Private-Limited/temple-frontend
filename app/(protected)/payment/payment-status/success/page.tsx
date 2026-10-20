import { Suspense } from "react";
import DonationSuccessClient from "./_components/DonationSuccessClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DonationSuccessClient />
    </Suspense>
  );
}
