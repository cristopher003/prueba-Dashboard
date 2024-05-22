import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { TableComponentComponent } from './components/table-component/table-component.component';
import { FormsModule } from '@angular/forms';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    UserManagementComponent,
    TableComponentComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports:[
    UserManagementComponent
  ]
})
export class UsersModule { }
