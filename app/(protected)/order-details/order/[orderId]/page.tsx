import Client from "./Client";
export function generateStaticParams() { return [{ orderId: '1' }]; }
export default function Page() { return <Client />; }
