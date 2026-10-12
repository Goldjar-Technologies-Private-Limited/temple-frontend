import { Suspense } from "react";
import DonationSuccessClient from "./DonationSuccessClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DonationSuccessClient />
    </Suspense>
  );
}
