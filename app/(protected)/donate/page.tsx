import { Suspense } from "react";
import DonateClient from "./DonateClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DonateClient />
    </Suspense>
  );
}
