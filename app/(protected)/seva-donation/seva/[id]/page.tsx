import SevaDetailClient from "../_components/SevaDetailClient";

export function generateStaticParams() {
  return [
    { id: "go-seva" },
    { id: "nitya-bhog" },
    { id: "flower" },
    { id: "annakut" },
    { id: "temple-maintenance" },
  ];
}

export default function Page() {
  return <SevaDetailClient />;
}