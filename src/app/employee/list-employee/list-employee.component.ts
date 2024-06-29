import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Employee } from 'src/app/types/Employee';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  employeeList: Employee[] = [];
  
  ngOnInit(): void {
    this.apiService.callAllEmployeesApi().subscribe({
      next: response => {
        this.employeeList = response;
      } 
    })
  }

}
