import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { Department, Position, User } from '../../interfaces/user.interface';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  @Input() user: User = {} as User;
  @Output() createUser = new EventEmitter<boolean>();

  departments: Department[] = [];
  positions: Position[] = [];
  succes:boolean=false;

  newUser:User={
    id: 0,
    usuario: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    idCargo: 0,
    idDepartamento: 0,
    cedula:'',
    email: ''
  };

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
      if (this.user.id) {
        console.log(this.user);
         this.userService.updateUser(this.user).subscribe({
          next: data => {
            this.newUser = data;
            this.activeModal.close(true)
            this.showAlert("Usuario Editado");
            this.createUser.emit(true);
          },
           error: err => {  
            console.log( JSON.stringify(err));    
            Swal.fire({title:"Error!",icon:'error',text:(err.toString())});
          },
        });
         
      } else {
        this.userService.addUser(this.user).subscribe({
          next: data => {
            this.newUser = data;
            this.activeModal.close(true)
            this.showAlert("Usuario creado");
          },
           error: err => {  
            console.log( JSON.stringify(err));    
            Swal.fire({title:"Error!",icon:'error',text:(err.toString())});
          },
        });

      }
    } catch (error) {
      console.log(error);
    }
  }

  cancel(): void {
    this.activeModal.dismiss();
  }


  showAlert(title:string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title:title,
      showConfirmButton: false,
      timer: 1500
    });}
}
