"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Check, Save, UserRound } from "lucide-react";
import { defaultProfile, type ProfileData } from "@/data/profile";

const PROFILE_STORAGE_KEY = "profile-data";

const inputClass =
  "w-full rounded-xl border border-[#eadbc5] bg-[#fffdf8] px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#a71919] focus:ring-2 focus:ring-[#a71919]/10";

const labelClass = "mb-2 block text-sm font-semibold text-[#503c32]";

const cleanPhone = (value: unknown): string =>
  typeof value === "string" ? value.replace(/\D/g, "").slice(0, 10) : "";

const isValidPhone = (phone: string): boolean => /^\d{10}$/.test(phone);

export default function EditProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [originalProfile, setOriginalProfile] =
    useState<ProfileData>(defaultProfile);

  const [isLoaded, setIsLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // LOAD SAVED PROFILE
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

      if (storedProfile) {
        const parsed = JSON.parse(storedProfile) as Partial<ProfileData>;

        const loadedProfile: ProfileData = {
          name: typeof parsed.name === "string" ? parsed.name : "",
          phone: cleanPhone(parsed.phone),
          email: typeof parsed.email === "string" ? parsed.email : "",
          city: typeof parsed.city === "string" ? parsed.city : "",
          image: typeof parsed.image === "string" ? parsed.image : "",
        };

        setProfile(loadedProfile);
        setOriginalProfile(loadedProfile);
      }
    } catch (err) {
      console.error("Failed to load profile:", err);
      setError("Unable to load your saved profile.");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // CHECK CHANGES
  const hasChanges =
    JSON.stringify(profile) !== JSON.stringify(originalProfile);

  // UPDATE INPUTS
  const updateField = (field: keyof ProfileData, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setSaved(false);
    setError("");
  };

  // OPEN PHOTO PICKER
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // UPLOAD PHOTO
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please select a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Please select an image smaller than 2MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateField("image", reader.result);
      } else {
        setError("Unable to read the selected image.");
      }
    };

    reader.onerror = () => {
      setError("Failed to load the image. Please try again.");
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  // SAVE PROFILE
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasChanges || isSaving || !isLoaded) return;

    const phone = profile.phone.trim();

    if (!isValidPhone(phone)) {
      setError("Please enter exactly 10 digits for the mobile number.");
      return;
    }

    const updatedProfile: ProfileData = {
      name: profile.name.trim(),
      phone,
      email: profile.email.trim(),
      city: profile.city.trim(),
      image: profile.image,
    };

    setIsSaving(true);
    setError("");

    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile));

      window.dispatchEvent(new Event("profile-updated"));

      setProfile(updatedProfile);
      setOriginalProfile(updatedProfile);
      setSaved(true);

      router.push("/dashboard");
    } catch (err) {
      console.error("Failed to save profile:", err);
      setError(
        "Unable to save your profile. Try a smaller image or free up browser storage.",
      );
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-dvh w-full min-w-0 overflow-x-clip bg-[#fffaf1] pb-20 lg:pb-6 lg:pl-[92px]">
      {/* PAGE CONTENT */}
      <section className="mx-auto w-full max-w-3xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        {/* INTRODUCTION */}

        {/* PROFILE CARD */}
        <div className="overflow-hidden rounded-2xl border border-[#eadbc5] bg-[#fffdf8] shadow-[0_8px_30px_rgba(100,16,16,0.05)]">
          {/* PROFILE BANNER */}
          <div className="relative overflow-hidden bg-[linear-gradient(145deg,#641010_0%,#961b18_55%,#b74c25_100%)] px-5 py-9 text-center sm:py-11">
            <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-20 -left-8 h-44 w-44 rounded-full border border-white/10" />

            {/* PROFILE IMAGE */}
            <div className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32">
              <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-[#f2d18d] bg-[#fff8e9] shadow-lg sm:h-32 sm:w-32">
                {profile.image ? (
                  <img
                    src={profile.image}
                    alt="Profile photo preview"
                    className="block h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-[#a71919]">
                    <UserRound size={54} strokeWidth={1.2} />
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleImageClick}
                aria-label="Change profile photo"
                title="Change profile photo"
                className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[#fffdf8] bg-[#a71919] text-white shadow-md transition hover:bg-[#8f1515] active:scale-95"
              >
                <Camera size={17} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="hidden"
                aria-label="Upload profile photo"
              />
            </div>

            <h3 className="mt-4 truncate px-2 text-xl text-white sm:text-2xl">
              {profile.name.trim() || "Your Name"}
            </h3>

            <p className="mt-1 text-xs text-white/75">
              Personal account information
            </p>
          </div>

          {/* EDIT FORM */}
          <form
            id="edit-profile-form"
            onSubmit={handleSubmit}
            className="space-y-5 p-5 sm:p-8"
          >
            <div>
              <label htmlFor="name" className={labelClass}>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={profile.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Enter your full name"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Mobile Number
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                value={profile.phone}
                onChange={(event) =>
                  updateField(
                    "phone",
                    event.target.value.replace(/\D/g, "").slice(0, 10),
                  )
                }
                placeholder="Enter your mobile number"
                className={inputClass}
                maxLength={10}
                pattern="[0-9]{10}"
                required
              />
              <p className="mt-1.5 text-xs text-[#9a8879]">
                Enter exactly 10 digits.
              </p>
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={profile.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="Enter your email address"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <input
                id="city"
                type="text"
                autoComplete="address-level2"
                value={profile.city}
                onChange={(event) => updateField("city", event.target.value)}
                placeholder="Enter your city"
                className={inputClass}
              />
            </div>

            {/* ERROR */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {saved && (
              <div
                role="status"
                className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
              >
                <Check size={17} />
                Profile updated successfully.
              </div>
            )}

            {/* SAVE BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!isLoaded || !hasChanges || isSaving}
                className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#a71919] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#8f1414] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a71919] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none sm:w-auto"
              >
                <Save size={16} />
                <span>{isSaving ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </form>
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-[#9a8879]">
          Your profile information is stored in this browser.
        </p>
      </section>
    </main>
  );
}
