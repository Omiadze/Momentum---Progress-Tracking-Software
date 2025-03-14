import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ka";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export const setDateToConvert = (date: string) => {
  dayjs.locale("Ka");
  const convertedDate = dayjs(date).format("DD MMM, YYYY");

  return convertedDate;
};
