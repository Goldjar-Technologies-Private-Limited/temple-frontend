/**
 * Formats a date string (e.g. "2026-08-16" or ISO string) to readable format (e.g. "16 August 2026")
 */
export const formatDateDisplay = (dateStr?: string | null): string => {
  if (!dateStr) return "";
  try {
    const parts = dateStr.split("T")[0].split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      }
    }
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  } catch (_) {}
  return dateStr;
};

/**
 * Converts 24-hour time "HH:mm" (or "HH:mm:ss") or 12-hour string to 12-hour AM/PM format (e.g. "06:00 AM", "07:30 PM")
 */
export const format12Hour = (timeStr?: string | null): string => {
  if (!timeStr) return "";
  const trimmed = timeStr.trim();
  if (/am|pm/i.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  const [hoursStr, minutesStr = "00"] = trimmed.split(":");
  let hours = parseInt(hoursStr, 10);
  if (isNaN(hours)) return trimmed;

  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutesStr.slice(0, 2).padStart(2, "0");
  return `${paddedHours}:${paddedMinutes} ${period}`;
};

/**
 * Extracts hour and minute (in 24-hour format) from a time string ("06:00", "18:30", "06:00 AM", "07:30 PM")
 */
export const parseTimeParts = (timeStr?: string | null): { hour: number; minute: number } => {
  if (!timeStr) return { hour: 0, minute: 0 };
  const trimmed = timeStr.trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})(?::\d{2})?(?:\s*(AM|PM))?$/i);
  if (!match) return { hour: 0, minute: 0 };

  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10) || 0;
  const period = match[3]?.toUpperCase();

  if (period === "PM" && hour < 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  return { hour, minute };
};
