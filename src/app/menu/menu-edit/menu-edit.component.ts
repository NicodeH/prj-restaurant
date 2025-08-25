import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Menu, Statut } from '../../models/menu';
import { MenuService } from '../../services/menu.service';
import { PlatService } from '../../services/plat.service';
import { Plat } from '../../models/plat';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrl: './menu-edit.component.css',
})

export class MenuEditComponent {
  public menu: Menu = new Menu();
  public plats!: Observable<Plat[]>;

  constructor(
    private menuService: MenuService,
    private platService: PlatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const menuId = this.route.snapshot.params['id'];
    this.menu = new Menu();

    if (menuId) {
      this.menuService.getMenu(menuId).subscribe({
        next: (menu) => (this.menu = { ...menu }),
        error: (err) => this.router.navigateByUrl('/menus'),
      });
    }

    this.plats = this.platService.getPlats(menuId);
    this.plats.subscribe({
          next: (plats) => {
            console.log('Chargement terminé : ', plats);
          },

          error: (err) => {
            console.log('ERREUR de chargement : ', err);
          },
        });
      }


  public onSubmit(leFormulaire: NgForm): void {
    if (leFormulaire.valid) {
      let ObservableAction;
      if (this.menu.id) {
        ObservableAction = this.menuService.updateMenu(this.menu);
      } else {
        ObservableAction = this.menuService.addMenu(this.menu);
      }

      ObservableAction.subscribe({
        next: (menu) => {
          console.log('Enregistrement OK : ', menu);
          this.router.navigateByUrl('/menus');
        },
        error: (err) => {
          console.log('ERREUR de sauvegarde : ', err);
        },
      });
    }
  }
}
