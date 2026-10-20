import { Suspense } from "react";
import PymentClient from "./PaymentClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PymentClient />
    </Suspense>
  );
}
