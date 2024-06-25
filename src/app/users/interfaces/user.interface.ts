export interface userResponse {
 users:User[];
}

export interface User {
    id: number;
    usuario: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    idCargo:number;
    idDepartamento:number;
    department?: Department;
    position?:Position;
    cedula:string;
    email: string;
  }

  
export interface Department {
    id?: number;
    codigo: string;
    nombre: string;
    activo: boolean;
    idUsuarioCreacion: number;
  }
  
  export interface Position {
    id?: number;
    codigo: string;
    nombre: string;
    activo: boolean;
    idUsuarioCreacion: number;
  }