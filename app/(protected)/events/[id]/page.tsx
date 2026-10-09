import Client from "./Client";
export function generateStaticParams() { return [{ id: '1' }]; }
export default function Page() { return <Client />; }
