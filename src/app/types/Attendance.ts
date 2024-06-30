export class Attendance {
    attendanceId:number = 0;
	employeeId:number = 0;
	day: number = 0;
	month: number = 0;
	year:number = 0;
	noOfHours: number = 0.0;
	inTimeHours: number = 0;
	inTimeMinutes: number = 0;
	outTimeHours: number = 0;
	outTimeMinutes: number = 0;
	dayName: string = '';
	rowDisabled: boolean = false;
	empName: string = '';
	empMail: string = '';
	rowIndex: number = 0;
}