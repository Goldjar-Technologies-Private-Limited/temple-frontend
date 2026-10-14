export type ReelItem = {
  id: number;
  video: string;
  title: string;
  subtitle: string;
  username: string;
  likes: string;
};

export const REELS_DATA: ReelItem[] = [
  {
    id: 1,
    video: "/videos/reel1.mp4",
    title: "Today's Shringar Darshan",
    subtitle: "Jai Shrinathji 🙏",
    username: "@govardhannath_haveli",
    likes: "5.2K",
  },
  {
    id: 2,
    video: "/videos/reel2.mp4",
    title: "Divine Darshan",
    subtitle: "Shri Govardhannathji 🌸",
    username: "@govardhannath_haveli",
    likes: "3.8K",
  },
  {
    id: 3,
    video: "/videos/reel3.mp4",
    title: "Sandhya Aarti",
    subtitle: "Jai Shree Krishna 🙏",
    username: "@govardhannath_haveli",
    likes: "4.6K",
  },
  {
    id: 4,
    video: "/videos/reel4.mp4",
    title: "Evening Darshan",
    subtitle: "Shri Govardhannathji 🙏",
    username: "@govardhannath_haveli",
    likes: "4.6K",
  },
];
