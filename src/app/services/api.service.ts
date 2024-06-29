import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../types/LoginResponse';
import { Department } from '../types/Department';
import { JobRole } from '../types/JobRole';
import { Employee } from '../types/Employee';
import { ApiResponse } from '../types/ApiResponse';
import { StorageService } from './storage.service';
import { Payroll } from '../types/Payroll';
//import { TOKEN } from '../types/Constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient,private storageService: StorageService) { }
  hostUrl: string = 'http://localhost:9900/ems/';
  payrollHostUrl: string = 'http://localhost:9900/ems/payrolls/';
  /*httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.storageService.fetchItemFromCache(TOKEN)
  });*/

  callLoginApi(emailId : String, password : String) {
    let payload = {
      'emailId':emailId,
      'password':password
    }
    return this.httpClient.post<LoginResponse>( this.hostUrl + 'login',payload);
  }
  
  callFetchDepartmentsApi() {
    return this.httpClient.get<Department>(this.hostUrl + 'departments');
  }

  callFetchJobRolesApi(deptId: String)  {
    return this.httpClient.get<JobRole>(this.hostUrl + 'roles?deptId=' + deptId);
  }

  callFetchYearsApi() {
    return this.httpClient.get<number[]>(this.hostUrl + 'fetchYears');
  }

  callFetchMonthsApi()  {
    return this.httpClient.get<number[]>(this.hostUrl + 'fetchMonths');
  }

  callFetchDaysApi(year: number,month: number)  {
    return this.httpClient.get<number[]>(this.hostUrl + 'fetchDays?year=' + year + '&month=' + month);
  }

  callSaveEmployeeApi(employee: Employee)  {
     return this.httpClient.post<ApiResponse>(
        this.hostUrl + 'addEmployee',
        employee
     );
  }

  callUpdateEmployeeApi(employee: Employee) {
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'updateEmployee',employee);
  }

  callGetAllEmployeesIdAndNamesApi()  {
    return this.httpClient.get<Employee[]>(this.hostUrl + 'allEmployeesIdAndNames');
  }

  callEmployeeByIdApi(selectedEmpId: string) {
    return this.httpClient.get<Employee>(this.hostUrl + 'employee/' + selectedEmpId);
  }

  callEmployeeDeleteApi(empId: string) {
    return this.httpClient.post<Employee[]>(this.hostUrl + 'deleteEmployee',{'empId':empId});
  }

  callAllEmployeesApi() {
    return this.httpClient.get<Employee[]>(this.hostUrl + 'allEmployees');
  }

  callCalculatePayrollApi(empEmail: string) {
    return this.httpClient.get<Payroll>(this.payrollHostUrl + 'calculate/' + empEmail);
  }

  callAddPayrollApi(payrollDto: Payroll) {
    return this.httpClient.post<ApiResponse>(this.payrollHostUrl + 'create',payrollDto);
  }

  callViewPayrollApi(empId: number,year: number)  {
    return this.httpClient.get<Payroll[]>(this.payrollHostUrl + 'fetch/'+ empId +'/year/' + year);
  }
}