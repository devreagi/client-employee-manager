import {Component, OnInit} from '@angular/core';
import {Employee} from '../../models/employee';
import {EmployeeService} from '../../services/employee.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  public employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      {
        next: (response: Employee[]) => {
          this.employees = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      },
    );
  }

  ngOnInit(): void {
    this.getEmployees();
  }

}
