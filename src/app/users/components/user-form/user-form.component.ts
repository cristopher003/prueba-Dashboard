import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { Department, Position, User } from '../../interfaces/user.interface';
import { catchError } from 'rxjs';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  @Input() user: User = {} as User;

  departments: Department[] = [];
  positions: Position[] = [];
  errors: any ="";

  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadPositions();
  }

  loadDepartments(): void {
    this.userService.getDepartments().subscribe(departments => this.departments = departments);
  }

  loadPositions(): void {
    this.userService.getPositions().subscribe(positions => this.positions = positions);
  }

  async save(): Promise<void> {
    try {
      console.log(this.user);
      if (this.user.id) {
        console.log(this.user);
         this.userService.updateUser(this.user).pipe(
          catchError(error => {
            console.log('Error al crear usuario:', error.error);
            this.errors="el correo ya esta en uso";
            // Puedes mostrar un mensaje al usuario o realizar otras acciones
            throw error; // Propaga el error al suscriptor
          })
        ).subscribe(() => this.activeModal.close(true));
         
      } else {
        (await this.userService.addUser(this.user)).subscribe((response) => {
          if (response) {
            this.activeModal.dismiss()
          }
        });

      }
    } catch (error) {
      console.log(error);
    }
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
