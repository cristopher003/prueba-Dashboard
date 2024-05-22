import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'user-table',
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.css'
})
export class TableComponentComponent {
  @Input() users: User[] = [];
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<number>();

  constructor(){
    console.log(this.users);
  }

  onEdit(user: User): void {
    this.editUser.emit(user);
  }

  onDelete(id: number): void {
    this.deleteUser.emit(id);
  }

  
}
