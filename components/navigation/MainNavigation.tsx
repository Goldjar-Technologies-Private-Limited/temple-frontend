"use client";

import { useState } from "react";
import BottomNavigation from "./BottomNavigation";
import ProfileDrawer from "./ProfileDrawer";

export default function MainNavigation() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <BottomNavigation
        onProfileClick={() => setDrawerOpen(true)}
      />

      {drawerOpen && (
        <ProfileDrawer
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
}