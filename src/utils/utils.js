import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const convertDateStringToTimeStamp = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const date = new Date(`${year}-${month}-${day}T00:00:00+07:00`);
    const timestamp = date.getTime();
    return timestamp;
}

export const convertTimeStampToDateString = (timestamp) => {
    // Create a dayjs object from the timestamp and convert it to the Vietnam time zone
    const date = dayjs(timestamp).tz('Asia/Ho_Chi_Minh');

    // Format the date to "DD-MM-YYYY"
    const dateString = date.format('DD-MM-YYYY');

    return dateString;
};