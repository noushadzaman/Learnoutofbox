export function formatMyDate(date) {
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
}

export const formatDuration = (duration) => {
  if (!duration) return null;

  const hour = Math.floor(duration / 3600);
  const min = Math.floor((duration % 3600) / 60);
  const sec = Math.floor((duration % 3600) % 60);
  const durationString = `${hour}:${min}:${sec}`;

  return durationString;
};

export const convertSecondsToTimeFormat = (totalSeconds) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  // Format the hours, minutes, and seconds as two digits
  const formattedH = h.toString().padStart(2, "0");
  const formattedM = m.toString().padStart(2, "0");
  const formattedS = s.toString().padStart(2, "0");

  return `${formattedH}:${formattedM}:${formattedS}`;
};
