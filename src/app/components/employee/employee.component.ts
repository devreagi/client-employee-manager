import {Component, OnInit} from '@angular/core';
import {Employee} from '../../models/employee';
import {EmployeeService} from '../../services/employee.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  public employees: Employee[] = [];
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getEmployees();
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

  public onAddEmployee(addForm: NgForm): void {
    const element = document.getElementById('add-employee-form');
    if (element !== null) {
      element.click();
    }
    this.employeeService.addEmployee(addForm.value).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.getEmployees();
      }
      ,
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onDeleteEmployee(employeeId: number): void {
    console.log(employeeId);
    this.employeeService.deleteEmployee(employeeId).subscribe(
      {
        next: (response: void) => {
          console.log(response);
          this.getEmployees();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      },
    );
  }

  public searchEmployees(key: String): void {
    let results: Employee[] = [];
    let search = document.getElementById("searchName")!
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    if (results.length === 0 || !key) {
      search.setAttribute("class", "form-control btn-danger mr-sm-2")
      this.getEmployees()
    }
    if (results.length > 0) {
      search.setAttribute("class", "form-control btn-success mr-sm-2")
      this.employees = results;
    }

    if(key === ""){
      search.setAttribute("class", "form-control mr-sm-2")
    }
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById(
      'main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addEmployeeModal');
    }
    if (mode === 'edit' && employee !== null) {
      this.editEmployee = employee;
      button.setAttribute('data-bs-target', '#updateEmployeeModal');
    }
    if (mode === 'delete' && employee !== null) {
      this.deleteEmployee = employee;
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }
    if (container !== null) {
      container.appendChild(button);
    }
    button.click();
  }

}
