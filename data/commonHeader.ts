export type PageInfoMap = Record<
  string,
  { title: string; subtitle: string; backHref?: string }
>;

export const PAGE_INFO: PageInfoMap = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Shri Govardhannath Haveli",
    backHref: "/dashboard",
  },
  "/darshan-timings": {
    title: "Darshan Timings",
    subtitle: "Daily darshan schedule",
    backHref: "/dashboard",
  },
  "/live-darshan": {
    title: "Live Darshan",
    subtitle: "Shri Govardhannath Haveli",
    backHref: "/dashboard",
  },
  "/events": {
    title: "Events",
    subtitle: "Shri Govardhannath Haveli",
    backHref: "/dashboard",
  },
  "/seva-donation": {
    title: "Seva & Donation",
    subtitle: "Offer your seva with devotion and love",
    backHref: "/dashboard",
  },
  "/donate": {
    title: "Payment",
    subtitle: "Complete your offering with faith and devotion",
    backHref: "/seva-donation",
  },
  "/donation-status/success": {
    title: "Donation Successful",
    subtitle: "Thank you for your offering",
    backHref: "/dashboard",
  },
  "/donation-status/failed": {
    title: "Payment Failed",
    subtitle: "Please try again",
    backHref: "/donate",
  },
  "/prasadam": {
    title: "Prasadam",
    subtitle: "Shri Govardhannath Haveli",
    backHref: "/dashboard",
  },
  "/prasadam/cart": {
    title: "My Cart",
    subtitle: "Shri Govardhannath Haveli",
    backHref: "/prasadam",
  },
  "/prasadam/checkout": {
    title: "Checkout",
    subtitle: "Shri Govardhannath Haveli",
    backHref: "/prasadam/cart",
  },
  "/prasadam/order-success": {
    title: "Order Placed",
    subtitle: "Thank you for your order",
    backHref: "/prasadam",
  },
  "/my-orders": {
    title: "My Orders",
    subtitle: "Track and manage your prasadam orders",
    backHref: "/dashboard",
  },
  "/my-bookings": {
    title: "My Bookings",
    subtitle: "Shri Govardhannath Haveli",
    backHref: "/dashboard",
  },
  "/my-donations": {
    title: "My Donations",
    subtitle: "Shri Govardhannath Haveli",
    backHref: "/dashboard",
  },
  "/notifications": {
    title: "Notifications",
    subtitle: "Stay connected with Haveli updates",
    backHref: "/dashboard",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Shri Govardhannath Haveli",
    backHref: "/dashboard",
  },
  "/help": {
    title: "Help & Support",
    subtitle: "Shri Govardhannath Haveli",
    backHref: "/dashboard",
  },
  "/profile": {
    title: "Profile",
    subtitle: "Manage your personal details",
    backHref: "/dashboard",
  },
  "/delete-account": {
    title: "Delete Account",
    subtitle: "Shri Govardhannath Haveli",
    backHref: "/dashboard",
  },
  "/reels": {
    title: "Reels",
    subtitle: "Divine moments and darshan",
    backHref: "/dashboard",
  },
  "/temple-information": {
    title: "Temple Information",
    subtitle: "Shri Govardhannath Haveli",
    backHref: "/dashboard",
  },
};

export function getPageInfo(pathname: string): {
  title: string;
  subtitle: string;
  backHref: string;
} {
  if (PAGE_INFO[pathname]) {
    return {
      title: PAGE_INFO[pathname].title,
      subtitle: PAGE_INFO[pathname].subtitle,
      backHref: PAGE_INFO[pathname].backHref || "/dashboard",
    };
  }

  // Dynamic route: /events/[id]
  if (pathname.startsWith("/events/")) {
    return {
      title: "Event Details",
      subtitle: "Shri Govardhannath Haveli",
      backHref: "/events",
    };
  }

  // Dynamic route: /seva/[id]
  if (pathname.startsWith("/seva/")) {
    return {
      title: "Seva Details",
      subtitle: "Offer your seva with devotion and love",
      backHref: "/seva-donation",
    };
  }

  // Dynamic route: /order-details/...
  if (pathname.startsWith("/order-details")) {
    return {
      title: "Order Details",
      subtitle: "Shri Govardhannath Haveli",
      backHref: "/my-orders",
    };
  }

  const lastSegment = pathname.split("/").filter(Boolean).pop();
  const fallbackTitle = lastSegment
    ? decodeURIComponent(lastSegment)
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
    : "Dashboard";

  return {
    title: fallbackTitle,
    subtitle: "Shri Govardhannath Haveli",
    backHref: "/dashboard",
  };
}
