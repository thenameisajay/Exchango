import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export const getLocalisedYear = (date: Date) => {
    return dayjs(date).format("YYYY");
};
