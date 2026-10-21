import { Suspense } from "react";
import PaymentSuccessClient from "./_components/PaymentSuccessClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessClient />
    </Suspense>
  );
}
