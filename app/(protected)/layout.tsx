import MainNavigation from "@/components/navigation/MainNavigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <MainNavigation />
    </>
  );
}