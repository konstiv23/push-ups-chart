const mSecInDay = 8.64e7;

export function todaysDayNumber() {
  const now = new Date();
  return Math.floor(
    (now.getTime() - now.getTimezoneOffset() * 60000) / mSecInDay
  );
}

export function dayNumberToStr(dayNum: number) {
  const date = new Date(dayNum * mSecInDay);
  const options = { month: "short" as const, day: "numeric" as const };
  return date.toLocaleDateString("en-US", options);
}
