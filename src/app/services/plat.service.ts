import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plat } from '../models/plat';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PlatService {
  readonly listePlatsAPI = environment.apiUrl + '/plats';
  readonly platsAPI = environment.apiUrl + '/menus';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getAllPlats(): Observable<Plat[]> {
    return this.http.get<Plat[]>(this.listePlatsAPI);
  }

  getPlats(idMenu: number): Observable<Plat[]> {
    return this.http.get<Plat[]>(this.platsAPI + '/' + idMenu + '/plats');
  }

  getPlat(id: number): Observable<Plat> {
    return this.http.get<Plat>(this.listePlatsAPI + '/' + id);
  }

  addPlat(nouveauPlat: Plat): Observable<Plat> {
    if (nouveauPlat.menuId === 0) {
      this.router.navigateByUrl('/menus');
      return throwError(() => new Error('menuId est égal à 0'));
    }
    return this.http.post<Plat>(this.listePlatsAPI, nouveauPlat);
  }

  updatePlat(plat: Plat) {
    return this.http.put(this.listePlatsAPI + '/' + plat.id, plat);
  }

  deletePlat(id: number) {
    return this.http.delete(this.listePlatsAPI + '/' + id);
  }
}
