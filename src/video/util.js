export const formatDuration = seconds => {
  let minutes = Math.floor(seconds / 60);
  seconds = Math.round(seconds % 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return String(minutes) + ":" + seconds;
};
