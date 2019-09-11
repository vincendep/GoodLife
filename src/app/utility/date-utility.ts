export class DateUtility {

    public static fromDatetoIsoDateString(date: Date): string {
        return date.toISOString().slice(0, 10);
    }
}
