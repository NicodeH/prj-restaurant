import { Component, Input } from '@angular/core';
import { Menu, Statut } from '../../models/menu';
import { MenuService } from '../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
})
export class MenuComponent {
  @Input()
  public menu: Menu = new Menu();
  public calories: number = 0;
  readonly statutMenu = Statut; // transmettre l'enum au Template

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.menuService.getCalories(this.menu.id).subscribe({
      next: (calories) => {
        this.calories = calories;
      },
      error: (err) => {
        console.log('Erreur de calcul des calories : ', err);
      },
    });
  }

  onSupprime(): void {
    if (confirm('Voulez-vous réellement supprimer ce menu')) {
      let ObservableAction;

      ObservableAction = this.menuService.deleteMenu(this.menu.id);

      console.log('Suppression');

      ObservableAction.subscribe({
        next: (menu) => {
          console.log('Suppression OK : ', menu);
          this.router
            .navigateByUrl('/')
            .then(() => this.router.navigateByUrl('/menus'));
        },
        error: (err) => {
          console.log('ERREUR de Suppression : ', err);
        },
      });
    } else {
      console.log('Ok, on ne supprime pas');
    }
  }
}
