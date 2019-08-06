
export class Utility {

    public static toIsoDate(date: Date): string {
        const yearString = date.getFullYear().toString();
        const month = date.getMonth() + 1;
        let monthString = '';
        const dt = date.getDate();
        let dtString = '';
        if (dt < 10) {
            dtString = '0' + dt;
        } else {
            dtString = dt.toString();
        }
        if (month < 10) {
            monthString = '0' + month;
        } else {
            monthString = month.toString();
        }
        return yearString + '-' + monthString + '-' + dtString;
    }
}
