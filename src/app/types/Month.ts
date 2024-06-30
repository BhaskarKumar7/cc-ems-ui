export class Month {
    monthNumber: number = 0;
    monthName: string = '';

    constructor(monthNumber: number,monthName: string)  {
        this.monthName = monthName;
        this.monthNumber = monthNumber;
    }
}