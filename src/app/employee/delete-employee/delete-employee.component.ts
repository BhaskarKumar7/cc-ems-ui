import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Employee } from 'src/app/types/Employee';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  employees: Employee[] = [];
  ngOnInit(): void {
    this.apiService.callGetAllEmployeesIdAndNamesApi().subscribe({
      next: response => this.employees = this.employees.concat(response),
      error: err => console.log(err)
    });
  }

  deleteEmployee(empId: string)  {
    console.log('deleting employee----> ',empId);
    this.apiService.callEmployeeDeleteApi(empId).subscribe({
      next: response => this.employees = response,
      error: err => console.log(err)
    })
  }

}
