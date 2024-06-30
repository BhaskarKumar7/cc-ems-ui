import { Component, Inject, OnInit } from '@angular/core';
import { Notyf } from 'notyf';
import { ApiService } from 'src/app/services/api.service';
import { NOTYF } from 'src/app/shared/utils/notyf.token';
import { Attendance } from 'src/app/types/Attendance';
import { Month } from 'src/app/types/Month';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css']
})
export class AddAttendanceComponent implements OnInit {

  constructor(private apiService: ApiService,@Inject(NOTYF) private notyf : Notyf) { }
  months: Month[] = [];
  selectedMonth: number = 0;
  enteredEmpId: number = 0;
  date: Date = new Date();
  attendanceList: Attendance[] = [];
  hours: number[] = [];
  minutes: number[] = [];

  ngOnInit(): void {
      
    this.months = this.months.concat(new Month(0,'--- SELECT NUMBER ---')).concat(new Month(1,'JANUARY'))
      .concat(new Month(2,'FEBRAURY')).concat(new Month(3,'MARCH')).concat(new Month(4,'APRIL'))
      .concat(new Month(5,'MAY')).concat(new Month(6,'JUNE')).concat(new Month(7,'JULY'))
      .concat(new Month(8,'AUGUST')).concat(new Month(9,'SEPTEMBER')).concat(new Month(10,'OCTOBER'))
      .concat(new Month(11,'NOVEMBER')).concat(new Month(12,'DECEMBER'));

    for(let i = 0; i < 24 ; ++i) {
      this.hours = this.hours.concat(i);
    }

    for(let i = 0; i < 60 ; ++i) {
      this.minutes = this.minutes.concat(i);
    }
  }

  populateDays(): void  {
    console.log('month---> ', this.selectedMonth);
    console.log('empId---->',this.enteredEmpId);
    if(this.selectedMonth === 0 || this.enteredEmpId === 0)  {
      this.notyf.error({
        message: 'Employee id and Month are mandatoryto add attendance'
      });
    }
    else  {
      this.apiService.callEmployeeMonthlyAttendanceApi(this.enteredEmpId,
        this.selectedMonth,this.date.getFullYear()).subscribe({
          next: response => {
            this.attendanceList = response;
          },
          error: err => {
            console.log(err);
            this.notyf.error({
              message: err.error.message
            });
          }
      });
    }
  }

  addorUpdateAttendance(index: number): void  {
    console.log('index data---> ',index);
    this.apiService.callSaveAttendanceApi(this.attendanceList[index]).subscribe({
      next: response => {
        console.log('attn response--->',response);
        this.attendanceList[index].attendanceId = response.attendanceId;
        this.attendanceList[index].noOfHours = response.noOfHours;
        this.notyf.success({
          message: response.message
        });
      },
      error: err => {
        this.notyf.error({
          message: err.error.message
        });
      }
    });
  }

  removeAttendance(index: number) {
    console.log('remove index---> ',index);
    this.apiService.callRemoveAttendanceApi(this.attendanceList[index].attendanceId).subscribe({
      next: response => {
        console.log(response);
        this.populateDays();
      },
      error: err => {
        this.notyf.error({
          message: err.error.message
        });
      }
    });
  }
}
