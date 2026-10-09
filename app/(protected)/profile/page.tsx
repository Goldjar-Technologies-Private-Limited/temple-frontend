"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type ProfileData = {
  name: string;
  phone: string;
  email: string;
  city: string;
  image: string;
};

const PROFILE_STORAGE_KEY = "profile-data";

const defaultProfile: ProfileData = {
  name: "",
  phone: "",
  email: "",
  city: "",
  image: "",
};

const inputClass =
  "w-full rounded-xl border border-[#dfd3c3] bg-[#fffdf9] px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#a71919] focus:ring-2 focus:ring-[#a71919]/10";

const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

// Clean phone number
const cleanPhone = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\D/g, "").slice(0, 10);
};

// Check exactly 10 digits
const isValidPhone = (phone: string): boolean => {
  return /^\d{10}$/.test(phone);
};

export default function EditProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<ProfileData>(defaultProfile);

  const [saved, setSaved] = useState(false);

  // -----------------------------
  // LOAD PROFILE
  // -----------------------------
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

      if (!storedProfile) return;

      const parsedProfile = JSON.parse(storedProfile) as Partial<ProfileData>;

      setProfile({
        ...defaultProfile,
        ...parsedProfile,

        // If old data is:
        // +91 8080232328
        //
        // it becomes:
        // 8080232328
        phone: cleanPhone(parsedProfile.phone),
      });
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  }, []);

  // -----------------------------
  // UPDATE FIELD
  // -----------------------------
  const updateField = (field: keyof ProfileData, value: string) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  // -----------------------------
  // BACK
  // -----------------------------
  const handleBack = () => {
    router.back();
  };

  // -----------------------------
  // OPEN IMAGE PICKER
  // -----------------------------
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // -----------------------------
  // CHANGE IMAGE
  // -----------------------------
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Check image type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      event.target.value = "";
      return;
    }

    // Max 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Please select an image smaller than 2MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateField("image", reader.result);
      }
    };

    reader.onerror = () => {
      alert("Failed to load the image.");
    };

    reader.readAsDataURL(file);

    // Allow selecting same image again
    event.target.value = "";
  };

  // -----------------------------
  // SAVE PROFILE
  // -----------------------------
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const phone = profile.phone.trim();

    // Only exactly 10 digits allowed
    if (!isValidPhone(phone)) {
      alert("Please enter exactly 10 digits for the mobile number.");
      return;
    }

    const updatedProfile: ProfileData = {
      name: profile.name.trim(),
      phone: phone,
      email: profile.email.trim(),
      city: profile.city.trim(),
      image: profile.image,
    };

    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile));

      window.dispatchEvent(new Event("profile-updated"));

      router.push("/dashboard");

      setProfile(updatedProfile);
      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to save profile:", error);

      alert("Unable to save profile. Please choose a smaller image.");
    }
  };

  return (
    <main className="min-h-screen bg-[#fffaf1] px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* BACK */}
            <button
              type="button"
              onClick={handleBack}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#eadfce] bg-white text-xl text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-95"
              aria-label="Go back"
            >
              ←
            </button>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#a71919]">
                My Account
              </p>

              <h1 className="text-2xl font-bold text-[#3f3027]">Profile</h1>
            </div>
          </div>

          {/* SAVE */}
          <button
            type="submit"
            form="edit-profile-form"
            className="rounded-xl bg-[#a71919] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8f1515] active:scale-[0.98]"
          >
            Save
          </button>
        </div>

        {/* PROFILE CARD */}
        <div className="overflow-hidden rounded-2xl border border-[#eadfce] bg-white shadow-sm">
          {/* PROFILE HEADER */}
          <div className="bg-[linear-gradient(145deg,#6f1010_0%,#961b18_52%,#b74c25_100%)] px-6 py-8 text-center">
            {/* IMAGE */}
            <div className="relative mx-auto h-28 w-28">
              {/* FIXED IMAGE CONTAINER */}
              <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-[#f2d18d] bg-[#fff8e9] shadow-lg">
                {profile.image ? (
                  <img
                    src={profile.image}
                    alt="Profile"
                    className="block h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-5xl">
                    👤
                  </div>
                )}
              </div>

              {/* ONLY ONE EDIT BUTTON */}
              <button
                type="button"
                onClick={handleImageClick}
                className="absolute bottom-0 right-0 grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-[#a71919] text-lg text-white shadow-md transition hover:bg-[#8f1515] active:scale-95"
                aria-label="Change profile photo"
                title="Change profile photo"
              >
                ✎
              </button>

              {/* FILE INPUT */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* NAME */}
            <h2 className="mt-4 truncate px-4 text-xl font-bold text-white">
              {profile.name || "Your Name"}
            </h2>

           
          </div>

          {/* FORM */}
          <form
            id="edit-profile-form"
            onSubmit={handleSubmit}
            className="space-y-5 p-6"
          >
            {/* FULL NAME */}
            <div>
              <label htmlFor="name" className={labelClass}>
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={profile.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Enter your full name"
                className={inputClass}
                required
              />
            </div>

            {/* MOBILE */}
            <div>
              <label htmlFor="phone" className={labelClass}>
                Mobile Number
              </label>

              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                value={profile.phone}
                onChange={(event) => {
                  // Remove everything except digits
                  const value = event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

                  updateField("phone", value);
                }}
                placeholder="Enter your mobile number"
                className={inputClass}
                maxLength={10}
                pattern="[0-9]{10}"
                required
              />

              <p className="mt-1.5 text-xs text-gray-400">
                Enter exactly 10 digits
              </p>
            </div>

            {/* EMAIL */}
            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={profile.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="Enter your email address"
                className={inputClass}
              />
            </div>

            {/* CITY */}
            <div>
              <label htmlFor="city" className={labelClass}>
                City
              </label>

              <input
                id="city"
                type="text"
                value={profile.city}
                onChange={(event) => updateField("city", event.target.value)}
                placeholder="Enter your city"
                className={inputClass}
              />
            </div>

            {/* SUCCESS */}
            {saved && (
              <div
                role="status"
                className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
              >
                ✓ Profile updated successfully.
              </div>
            )}
          </form>
        </div>

        {/* INFO */}
        <p className="mt-5 text-center text-xs text-gray-400">
          Your profile information is stored securely.
        </p>
      </div>
    </main>
  );
}
