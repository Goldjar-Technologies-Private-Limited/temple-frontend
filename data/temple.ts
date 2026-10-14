export type FacilityItem = {
  icon: string;
  title: string;
  description: string;
};

export const TEMPLE_FACILITIES: FacilityItem[] = [
  {
    icon: "darshan",
    title: "Darshan",
    description: "Sacred darshan for devotees",
  },
  {
    icon: "seva",
    title: "Seva",
    description: "Participate in temple seva",
  },
  {
    icon: "prasadam",
    title: "Prasadam",
    description: "Receive blessed prasadam",
  },
  {
    icon: "donation",
    title: "Donation",
    description: "Support temple activities",
  },
];
