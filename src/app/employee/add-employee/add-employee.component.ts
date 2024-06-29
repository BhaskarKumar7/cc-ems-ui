import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Address } from 'src/app/types/Address';
import { BankDetails } from 'src/app/types/BankDetails';
import { Department } from 'src/app/types/Department';
import { Employee } from 'src/app/types/Employee';
import { JobRole } from 'src/app/types/JobRole';
import { NotyfNotification,Notyf } from 'notyf';
import { NOTYF } from 'src/app/shared/utils/notyf.token';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private apiService: ApiService,@Inject(NOTYF) private notyf : Notyf) { }

  employeeModel: Employee = new Employee();
  bankDetailsModel: BankDetails = new BankDetails();
  jobRoleModel: JobRole = new JobRole();
  departmentModel: Department = new Department();
  addressModel: Address = new Address();
  years: number[] = [0];
  months: number[] = [0];
  days: number[] = [0];

  deptArray: Department [] = [{
     deptId: 0,
     deptName: '--- SELECT DEPARTMENT ---'
  }];
  
  jobRolesArray: JobRole [] = [
    {
      roleId: 0,
      roleName: '--- SELECT JOB ROLE ---'
    }
  ]

  ngOnInit(): void {

    this.apiService.callFetchDepartmentsApi().subscribe({
      next: response => {
        this.deptArray = this.deptArray.concat(response);
      }
    });

    this.apiService.callFetchYearsApi().subscribe({
      next: response => {
        this.years = this.years.concat(response);
      }
    });
  }

  fetchJobRolesByDept(event: any) {
    this.jobRolesArray = [
      {
        roleId: 0,
        roleName: '--- SELECT JOB ROLE ---'
      }
    ]
    const deptId = event.target.value;
    this.apiService.callFetchJobRolesApi(deptId).subscribe({
      next: response => {
        this.jobRolesArray = this.jobRolesArray.concat(response);
      }
    })
  }

  populateMonths()  {
    if(this.isYearSelected()) {
      this.months = [0];
      this.days = [0];
      this.apiService.callFetchMonthsApi().subscribe({
        next: response => {
          this.months = this.months.concat(response);
        }
      });
    }
  }

  isYearSelected() : boolean {
    return (this.employeeModel.year !== undefined && this.employeeModel.year > 0);
  }
  
  isMonthSelected() : boolean {
    return (this.employeeModel.month !== undefined && this.employeeModel.month > 0);
  }

  populateDays()  {
    if(this.isYearSelected() && this.isMonthSelected()) {
      this.days = [0];
      this.apiService.callFetchDaysApi(this.employeeModel.year,this.employeeModel.month).subscribe({
        next: response => {
          this.days = this.days.concat(response);
        }
      });
    }
  }

  saveEmployeeDetails() {
    this.employeeModel.address = this.addressModel;
    this.employeeModel.bankDetails = this.bankDetailsModel;
    this.employeeModel.department = this.departmentModel;
    this.employeeModel.jobRole = this.jobRoleModel;
    this.apiService.callSaveEmployeeApi(this.employeeModel).subscribe({
      next: response => {
        console.log(response.message,response.statusCode);
        this.notyf.success({
          message: response.message
        });
      },
      error: error => {
        console.error(error);
        this.notyf.error({
          message: error.error.message
        });
      }
    });
  }

}
