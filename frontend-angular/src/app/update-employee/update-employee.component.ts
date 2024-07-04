import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';


@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  id!: number;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;  // Fix the way id is obtained
    this.employeeService.getEmployeeById(this.id).subscribe((data: any) => this.employee = data);
  }

  onSubmit(): void {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(() => {
      this.router.navigate(['/employee-list']);
    });
  }
}
