import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable()
export class StudentsService {
    constructor(private http: HttpClient) {
    }

    public listar(COD_ESTUDIANTE) {
        console.log("Entra hasta aca")
        return this.http.get(`http://localhost/proyecto_back/estudianteService.php?COD_ESTUDIANTE=${COD_ESTUDIANTE}`);
    }

    public updatePoint(COD_ESTUDIANTE, PUNTAJE) {
        console.log("Entra hasta aca")
        return this.http.get(`http://localhost/proyecto_back/estudianteUpdatePointService.php?COD_ESTUDIANTE=${COD_ESTUDIANTE}&PUNTAJE=${PUNTAJE}`);
    }
}