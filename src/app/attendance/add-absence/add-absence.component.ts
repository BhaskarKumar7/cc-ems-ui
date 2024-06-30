import { Component, Inject, OnInit } from '@angular/core';
import { error } from 'console';
import { Notyf } from 'notyf';
import { ApiService } from 'src/app/services/api.service';
import { NOTYF } from 'src/app/shared/utils/notyf.token';
import { Absence } from 'src/app/types/Absence';
import { Month } from 'src/app/types/Month';

@Component({
  selector: 'app-add-absence',
  templateUrl: './add-absence.component.html',
  styleUrls: ['./add-absence.component.css']
})
export class AddAbsenceComponent implements OnInit {

  constructor(private apiService: ApiService,@Inject(NOTYF) private notyf : Notyf) { }
  absenceModel: Absence = new Absence();
  absenceTypes: string[] = ['--- SELECT LEAVE TYPE ---'];
  months: Month[] = [];
  fromDays: number[] = [0];
  toDays: number[] = [0];
  date: Date = new Date();

  ngOnInit(): void {
    this.months = this.months.concat(new Month(0,'--- SELECT NUMBER ---')).concat(new Month(1,'JANUARY'))
    .concat(new Month(2,'FEBRAURY')).concat(new Month(3,'MARCH')).concat(new Month(4,'APRIL'))
    .concat(new Month(5,'MAY')).concat(new Month(6,'JUNE')).concat(new Month(7,'JULY'))
    .concat(new Month(8,'AUGUST')).concat(new Month(9,'SEPTEMBER')).concat(new Month(10,'OCTOBER'))
    .concat(new Month(11,'NOVEMBER')).concat(new Month(12,'DECEMBER'));

    this.apiService.callFetchAbsenceTypesApi().subscribe({
      next: response => {
        this.absenceTypes = response;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  populateFromDays(): void  {
    if(this.absenceModel.fromMonth > 0) {
      this.fromDays = [0];
      this.apiService.callFetchDaysApi(this.date.getFullYear(),this.absenceModel.fromMonth).subscribe({
        next: response => {
          this.fromDays = this.fromDays.concat(response);
        }
      });
    }
  }

  populateToDays(): void  {
    if(this.absenceModel.toMonth > 0) {
      this.toDays = [0];
      this.apiService.callFetchDaysApi(this.date.getFullYear(),this.absenceModel.toMonth).subscribe({
        next: response => {
          this.toDays = this.toDays.concat(response);
        }
      });
    }

  }

  saveAbsenceRequestDetails(): void {
    this.apiService.callAddAbsenceApi(this.absenceModel).subscribe({
      next: response => {
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
}
