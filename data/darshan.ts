import type { TranslationKey } from "@/utils/i18n";

export type DarshanScheduleItem = {
  nameKey: TranslationKey;
  hour: number;
  minute: number;
  image: string;
};

export type DarshanTimingItem = {
  nameKey: TranslationKey;
  time: string;
  hour: number;
  minute: number;
  image: string;
};

export type LiveStream = {
  id: string;
  image: string;
  videoUrl: string;
};

export const DARSHAN_SCHEDULE: DarshanScheduleItem[] = [
  {
    nameKey: "mangala",
    hour: 5,
    minute: 30,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "shringar",
    hour: 7,
    minute: 30,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "gwal",
    hour: 9,
    minute: 0,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "rajbhog",
    hour: 12,
    minute: 15,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "utthapan",
    hour: 16,
    minute: 0,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "bhog",
    hour: 18,
    minute: 0,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "sandhyaAarti",
    hour: 19,
    minute: 30,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "shayan",
    hour: 21,
    minute: 0,
    image: "/images/mangala.jpg",
  },
];

export const DARSHANS: DarshanTimingItem[] = [
  {
    nameKey: "mangala",
    time: "05:30 AM",
    hour: 5,
    minute: 30,
    image: "/images/mangala1.jpg",
  },
  {
    nameKey: "shringar",
    time: "07:30 AM",
    hour: 7,
    minute: 30,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "gwal",
    time: "09:00 AM",
    hour: 9,
    minute: 0,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "rajbhog",
    time: "12:15 PM",
    hour: 12,
    minute: 15,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "utthapan",
    time: "04:00 PM",
    hour: 16,
    minute: 0,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "bhog",
    time: "06:00 PM",
    hour: 18,
    minute: 0,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "sandhyaAarti",
    time: "07:30 PM",
    hour: 19,
    minute: 30,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "shayan",
    time: "09:00 PM",
    hour: 21,
    minute: 0,
    image: "/images/mangala.jpg",
  },
];

export const liveDarshanStreams: LiveStream[] = [
  {
    id: "xVU2UDaFOfE",
    image: "/images/live-darshan-1.jpg",
    videoUrl:
      "https://www.youtube.com/watch?v=xVU2UDaFOfE&list=RDxVU2UDaFOfE&start_radio=1",
  },
  {
    id: "WTjZxav7naU",
    image: "/images/live-darshan-2.jpg",
    videoUrl:
      "https://www.youtube.com/watch?v=WTjZxav7naU&list=RDc441pyXlM4M&index=13",
  },
];

export const initialLiveChats: [string, string, string][] = [
  ["🙏", "Jai Shree Krishna", "Ramesh Patel"],
  ["🌸", "Radhe Radhe", "Meena Shah"],
  ["🙏", "Jai Shrinathji", "Aarti Doshi"],
  ["🌺", "Beautiful Darshan", "Pooja Mehta"],
];
