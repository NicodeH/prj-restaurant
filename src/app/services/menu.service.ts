import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu, Statut } from '../models/menu'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlatService } from './plat.service';
import { Plat } from '../models/plat';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  readonly menusAPI = environment.apiUrl + '/menus';

  constructor(
    private http: HttpClient,
    private platService: PlatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getMenus(): Observable<Menu[]> {
    return this.http.get<any[]>(this.menusAPI).pipe(
      map(
        (data) => data.map((menuJson) => Menu.fromJson(menuJson)) // Conversion ici
      )
    );
  }

  getMenu(id: number): Observable<Menu> {
    return this.http.get<Menu>(this.menusAPI + '/' + id);
  }

  addMenu(nouveauMenu: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.menusAPI, nouveauMenu);
  }

  updateMenu(menu: Menu) {
    return this.http.put(this.menusAPI + '/' + menu.id, menu);
  }

  deleteMenu(menuId: number) {
    let ObservableAction: Observable<Plat[]>;

    ObservableAction = this.platService.getPlats(menuId);

    ObservableAction.subscribe({
      next: (plats) => {
        for (let i = 0; i < plats.length; i++) {
          this.platService.deletePlat(plats[i].id);
        }

        console.log('Suppression OK : ', plats);
        this.router
          .navigateByUrl('/')
          .then(() => this.router.navigateByUrl('/menus'));
      },
      error: (err) => {
        console.log('ERREUR de Suppression : ', err);
      },
    });

    return this.http.delete(this.menusAPI + '/' + menuId);
  }

  getCalories(menuId: number): Observable<number> {
    return this.platService
      .getPlats(menuId)
      .pipe(
        map((plats: Plat[]) =>
          plats.reduce((total, plat) => total + plat.calories, 0)
        )
      );
  }
}
