import { Component, Input } from '@angular/core';
import { Plat } from '../../models/plat';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatService } from '../../services/plat.service';

@Component({
  selector: 'app-plat-item',
  templateUrl: './plat-item.component.html',
  styleUrl: './plat-item.component.css',
})
export class PlatItemComponent {
  @Input()
  public plat: Plat = new Plat();

  constructor(
    private platService: PlatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSupprime(): void {
    if (confirm('Voulez-vous réellement supprimer ce plat')) {
      let ObservableAction;

      ObservableAction = this.platService.deletePlat(this.plat.id);

      console.log('Suppression');

      ObservableAction.subscribe({
        next: (plat) => {
          console.log('Suppression OK : ', plat);
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
