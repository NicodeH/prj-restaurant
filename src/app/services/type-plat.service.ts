import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypePlat } from '../models/type-plat';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TypePlatService {
  readonly typePlatsAPI = environment.apiUrl + '/types_plats';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getTypesPlats(): Observable<TypePlat[]> {
    console.log(this.http.get<TypePlat[]>(this.typePlatsAPI));
    return this.http.get<TypePlat[]>(this.typePlatsAPI);
  }

  getTypePlat(id: number): Observable<TypePlat> {
    return this.http.get<TypePlat>(this.typePlatsAPI + '/' + id);
  }

  addTypePlat(nouveauTypePlat: TypePlat): Observable<TypePlat> {
    return this.http.post<TypePlat>(this.typePlatsAPI, nouveauTypePlat);
  }

  updateTypePlat(typePlat: TypePlat) {
    return this.http.put(this.typePlatsAPI + '/' + typePlat.id, typePlat);
  }

  deleteTypePlat(id: number) {
    return this.http.delete(this.typePlatsAPI + '/' + id);
  }
}
