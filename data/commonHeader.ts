export type PageInfoMap = Record<string, { title: string; subtitle: string }>;

export const PAGE_INFO: PageInfoMap = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Your account overview",
  },
  "/profile": {
    title: "My Profile",
    subtitle: "View your personal information",
  },
  "/edit-profile": {
    title: "Edit Profile",
    subtitle: "Manage your personal details",
  },
  "/seva": {
    title: "Seva",
    subtitle: "Explore devotional offerings",
  },
  "/donate": {
    title: "Donation",
    subtitle: "Complete your offering",
  },
  "/payment": {
    title: "Payment",
    subtitle: "Manage your payment",
  },
};
