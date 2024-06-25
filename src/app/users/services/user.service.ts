import { Injectable } from '@angular/core';
import { Department, Position, User, userResponse } from '../interfaces/user.interface';
import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class UserService {
 
    URL_API= "http://localhost:8001/api"

    private users: User[] = [];
  // private users: User[] = [
  //   { id: 1, usuario: 'picapiedra', primerNombre: 'Pedro', segundoNombre: '', primerApellido: 'Picapiedra', segundoApellido: '', departamento: 'Tecnologías de la Información', cargo: 'Administrador', email: 'picapiedra@mail.com' },
  //   { id: 2, usuario: 'pmarmol', primerNombre: 'Pablo', segundoNombre: '', primerApellido: 'Marmol', segundoApellido: '', departamento: 'Tecnologías de la Información', cargo: 'Líder Frontend', email: 'pmarmol@mail.com' },
  //   // Agrega más usuarios aquí
  // ]; 

  private departments: Department[] = [
    { id: 1, codigo: 'TI', nombre: 'Tecnologías de la Información', activo: true, idUsuarioCreacion: 1 },
    { id: 2, codigo: 'LG', nombre: 'Legal', activo: true, idUsuarioCreacion: 1 },
    { id: 3, codigo: 'SG', nombre: 'Seguridad', activo: true, idUsuarioCreacion: 1 },
    // Agrega más departamentos aquí
  ];

  private positions: Position[] = [
    { id: 1, codigo: 'ADM', nombre: 'Administrador', activo: true, idUsuarioCreacion: 1 },
    { id: 2, codigo: 'LF', nombre: 'Líder Frontend', activo: true, idUsuarioCreacion: 1 },
    { id: 3, codigo: 'DF', nombre: 'Desarrollador Frontend', activo: true, idUsuarioCreacion: 1 },
    // Agrega más cargos aquí
  ];


  constructor(private hpptClient:HttpClient) { 
    
  }
  
  getUsers(): Observable<User[]> {
    return this.hpptClient.get<User[]>(`${this.URL_API}/users`);
  }

  getDepartments(): Observable<Department[]> {
    return this.hpptClient.get<Department[]>(`${this.URL_API}/departments`);
  }

  getPositions(): Observable<Position[]> {
    return this.hpptClient.get<Position[]>(`${this.URL_API}/positions`);
  }
  
  addUser(user: User): Observable<User> {
    const {idDepartamento,idCargo}=user;
    const params={... user,activo:true,
       idDepartamento:+idDepartamento,idCargo:+idCargo};


    return this.hpptClient.post<User>(`${this.URL_API}/users`,params).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(user: User): Observable<User> {
    const {idDepartamento,idCargo}=user;
    const params={... user,activo:true,
       idDepartamento:+idDepartamento,idCargo:+idCargo};
    // return this.hpptClient.put<User[]>(`${this.URL_API}/users/${user.id}`,params);

    return this.hpptClient.put<User>(`${this.URL_API}/users/${user.id}`,params).pipe(
      catchError(this.handleError)
    );
    // const index = this.users.findIndex(u => u.id === user.id);
    // if (index !== -1) {
    //   this.users[index] = user;
    // }
  }

  deleteUser(id: number) {
    return this.hpptClient.delete<User[]>(`${this.URL_API}/users/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.log('An error occurred:', error.error.message);
    } else {
      return throwError(() => new Error(JSON.stringify(Object.values(error.error))));
    }
    // Devuelve un observable con un mensaje de error para que el componente lo maneje
    return throwError(() => new Error('Something bad happened; please try again later.'));

  }

  private getValidationErrorMessages(errors: any): string {
    console.log(errors);
    let messages: string[] = [];
    for (const [key, value] of Object.entries(errors)) {
      if (Array.isArray(value)) {
        messages.push(`${key}: ${value.join(', ')}`);
      } 
    }
    return messages.join(' | ');
  }
}
