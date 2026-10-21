import ProtectedLayoutClient from "@/components/layout/ProtectedLayoutClient";
import PersistentLivePlayer from "./live-darshan/_components/PersistentLivePlayer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedLayoutClient>
    {children}
    <PersistentLivePlayer />
  </ProtectedLayoutClient>;
}