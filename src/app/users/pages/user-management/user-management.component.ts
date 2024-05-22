import { Component } from '@angular/core';
import { Department, Position, User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})

export class UserManagementComponent {

  users: User[] = [];
  filteredUsers: User[] = [];
  departments: Department[] = [];
  positions: Position[] = [];
  selectedDepartment: string = '';
  selectedPosition: string = '';

  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadPositions();
    this.loadUsers();
    this.applyFilters();
  }

  
  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      console.log(users);
      
      this.applyFilters();
    });
  }

  loadDepartments(): void {
    this.userService.getDepartments().subscribe(departments => this.departments = departments);
  }

  loadPositions(): void {
    this.userService.getPositions().subscribe(positions => this.positions = positions);
  } 

  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => {
      return (!this.selectedDepartment || user.department?.nombre === this.selectedDepartment) &&
             (!this.selectedPosition || user.position?.nombre === this.selectedPosition);
    });
  }

  openUserForm(user?: User): void {
    const modalRef = this.modalService.open(UserFormComponent);
    modalRef.componentInstance.user = user ? { ...user } : {}; // Pass a copy of user
    modalRef.result.then(result => {
      if (result) {
        this.loadUsers();
      }
    }, () => {});
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
    this.loadUsers();
  }
}
