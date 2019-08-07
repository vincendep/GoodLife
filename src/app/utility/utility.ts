
export class DateUtility {

    public static toIsoDate(date: Date): string {
        return date.toISOString().slice(0, 10);
    }
}
