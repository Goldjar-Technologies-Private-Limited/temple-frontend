export type OnboardingSlide = {
  image: string;
  title: string[];
  tags: string;
  text: string[];
};

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    image: "/images/thakurji-6.png",
    title: ["Experience", "the Divine Grace"],
    tags: "Live Darshan • Seva • Satsang",
    text: ["Stay connected with", "Shri Govardhannathji"],
  },
  {
    image: "/images/thakurji-1.jpg",
    title: ["Daily", "Divine Darshan"],
    tags: "Darshan • Aarti • Utsav",
    text: ["Feel the divine presence", "wherever you are"],
  },
  {
    image: "/images/thakurji-5.jpg",
    title: ["Be a Part", "of Seva"],
    tags: "Seva • Bhog • Vandan",
    text: ["Participate in sacred seva", "with devotion"],
  },
  {
    image: "/images/thakurji-4.jpg",
    title: ["Stay Connected", "with Haveli"],
    tags: "Satsang • Events • Updates",
    text: ["Everything about", "Shri Govardhannath Haveli"],
  },
];
