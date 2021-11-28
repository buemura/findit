export class FormatDate {
  static calculateDate(date: string): string {
    const dateTimestamp = Date.parse(date);
    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const postedDate = new Date(dateTimestamp).getDate();
    const postedMonth = new Date(dateTimestamp).getMonth();
    const postedYear = new Date(dateTimestamp).getFullYear();

    if (postedDate === currentDate && postedMonth === currentMonth) {
      return `Today`;
    }

    if (postedDate < currentDate && postedMonth === currentMonth) {
      return `${currentDate - postedDate} days ago`;
    }

    if (currentMonth - postedMonth >= 3) {
      return `${postedDate}/${postedMonth}/${postedYear}`;
    }

    if (postedMonth < currentMonth) {
      return `${currentMonth - postedMonth} month ago`;
    }

    return "";
  }
}
