import dayjs from "dayjs";
import utc from "dayjs/plugin/timezone";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

export const useDateFormatting = () => {
  const formatDateTime = (isoDate: string) => {
    return dayjs(isoDate).format("LLL");
  };

  const formatTime = (isoDate: string) => {
    return dayjs(isoDate).format("LLL");
  };

  return {
    formatDateTime,
    formatTime,
  };
};
