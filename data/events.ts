import type { TranslationKey } from "@/utils/i18n";

export type EventTab = "upcoming" | "past";

export type EventItem = {
  id: string;
  titleKey: TranslationKey;
  dateKey: TranslationKey;
  image: string;
  imagePosition?: string;
};

export type EventScheduleItem = {
  time: string;
  title: string;
  description: string;
};

export type EventDetail = {
  category: string;
  duration: string;
  description: string;
  location: string;
  time: string;
  about: string;
  schedule: EventScheduleItem[];
};

export const EVENTS: EventItem[] = [
  {
    id: "janmashtami-utsav",
    titleKey: "janmashtamiUtsav",
    dateKey: "janmashtamiDate",
    image: "/images/janmashtami.jpg",
  },
  {
    id: "annakut-mahotsav",
    titleKey: "annakutMahotsav",
    dateKey: "annakutEventDate",
    image: "/images/annakut-event.jpg",
  },
  {
    id: "sharad-purnima",
    titleKey: "sharadPurnima",
    dateKey: "sharadPurnimaDate",
    image: "/images/sharad-purnima.jpg",
  },
  {
    id: "haveli-sangeet",
    titleKey: "haveliSangeet",
    dateKey: "haveliSangeetDate",
    image: "/images/haveli-sangeet.jpg",
  },
];

export const EVENTS_WITH_POSITIONS: EventItem[] = [
  {
    id: "janmashtami-utsav",
    titleKey: "janmashtamiUtsav",
    dateKey: "janmashtamiDate",
    image: "/images/janmashtami2.jpg",
    imagePosition: "center 35%",
  },
  {
    id: "annakut-mahotsav",
    titleKey: "annakutMahotsav",
    dateKey: "annakutEventDate",
    image: "/images/annakut-event.jpg",
    imagePosition: "center 40%",
  },
  {
    id: "sharad-purnima",
    titleKey: "sharadPurnima",
    dateKey: "sharadPurnimaDate",
    image: "/images/sharad-purnima.jpg",
    imagePosition: "center 35%",
  },
  {
    id: "haveli-sangeet",
    titleKey: "haveliSangeet",
    dateKey: "haveliSangeetDate",
    image: "/images/haveli-sangeet.jpg",
    imagePosition: "center 40%",
  },
];

export const EVENT_DETAILS: Record<string, EventDetail> = {
  "janmashtami-utsav": {
    category: "Divine Celebration",
    duration: "3+ Hours",
    description:
      "Join us for a divine celebration of Shri Krishna Janmashtami with devotional prayers, darshan, bhajans and sacred festivities.",
    location: "Shri Govardhannath Haveli",
    time: "6:00 PM onwards",
    about:
      "Janmashtami is celebrated with devotion and joy as devotees come together to remember the divine appearance of Shri Krishna. The evening brings together special darshan, devotional singing, prayers and sacred celebrations in the peaceful atmosphere of the Haveli.",
    schedule: [
      {
        time: "6:00 PM",
        title: "Mangalacharan & Prayer",
        description:
          "Begin the evening with sacred prayers and devotional invocation.",
      },
      {
        time: "7:00 PM",
        title: "Bhajan & Kirtan",
        description:
          "Experience traditional devotional music and collective singing.",
      },
      {
        time: "8:00 PM",
        title: "Special Darshan",
        description: "Participate in the special darshan and devotional seva.",
      },
      {
        time: "9:00 PM",
        title: "Sacred Celebration",
        description:
          "Conclude the evening with prayers and festive devotional activities.",
      },
    ],
  },

  "annakut-mahotsav": {
    category: "Seva & Mahotsav",
    duration: "4+ Hours",
    description:
      "Experience the sacred Annakut Mahotsav with special darshan, devotional offerings and a beautiful celebration of gratitude.",
    location: "Shri Govardhannath Haveli",
    time: "5:00 PM onwards",
    about:
      "Annakut is a traditional celebration where devotees offer a grand variety of food preparations to the Lord. The festival expresses devotion, gratitude and community participation.",
    schedule: [
      {
        time: "5:00 PM",
        title: "Seva Begins",
        description: "Devotees gather for the beginning of the sacred seva.",
      },
      {
        time: "6:00 PM",
        title: "Annakut Darshan",
        description: "Witness the beautifully arranged devotional offerings.",
      },
      {
        time: "7:30 PM",
        title: "Bhajan Sandhya",
        description: "Enjoy an evening of devotional music and satsang.",
      },
      {
        time: "9:00 PM",
        title: "Prasad Seva",
        description: "Conclude the celebration with sacred prasad seva.",
      },
    ],
  },

  "sharad-purnima": {
    category: "Spiritual Gathering",
    duration: "3 Hours",
    description:
      "Celebrate the auspicious Sharad Purnima with devotional music, satsang and special darshan.",
    location: "Shri Govardhannath Haveli",
    time: "7:00 PM onwards",
    about:
      "Sharad Purnima is an important devotional occasion marked by prayers, music and spiritual gatherings. Devotees are invited to participate in the sacred atmosphere of the Haveli.",
    schedule: [
      {
        time: "7:00 PM",
        title: "Evening Prayer",
        description: "Start the celebration with peaceful evening prayers.",
      },
      {
        time: "7:45 PM",
        title: "Satsang",
        description:
          "Spend time in spiritual reflection and devotional discourse.",
      },
      {
        time: "8:30 PM",
        title: "Haveli Sangeet",
        description: "Listen to traditional devotional melodies.",
      },
      {
        time: "9:30 PM",
        title: "Special Darshan",
        description: "Complete the evening with special darshan.",
      },
    ],
  },

  "haveli-sangeet": {
    category: "Devotional Music",
    duration: "2+ Hours",
    description:
      "Immerse yourself in the traditional devotional melodies of Haveli Sangeet in a peaceful spiritual setting.",
    location: "Shri Govardhannath Haveli",
    time: "6:30 PM onwards",
    about:
      "Haveli Sangeet is a traditional devotional music practice associated with temple seva. Join us for an evening of bhajans and sacred melodies.",
    schedule: [
      {
        time: "6:30 PM",
        title: "Welcome & Prayer",
        description:
          "A peaceful beginning with traditional devotional prayers.",
      },
      {
        time: "7:00 PM",
        title: "Haveli Sangeet",
        description: "Experience traditional devotional compositions.",
      },
      {
        time: "8:00 PM",
        title: "Bhajan Sandhya",
        description: "Join fellow devotees in devotional singing.",
      },
      {
        time: "8:30 PM",
        title: "Closing Darshan",
        description: "Conclude the gathering with sacred darshan.",
      },
    ],
  },
};
