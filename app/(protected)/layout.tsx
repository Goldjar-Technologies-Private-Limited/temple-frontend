import ProtectedLayoutClient from "@/components/layout/ProtectedLayoutClient";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedLayoutClient>{children}</ProtectedLayoutClient>;
}