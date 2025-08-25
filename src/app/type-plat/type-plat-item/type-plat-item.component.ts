import { Component, Input } from '@angular/core';
import { TypePlat } from '../../models/type-plat';
import { ActivatedRoute, Router } from '@angular/router';
import { TypePlatService } from '../../services/type-plat.service';

@Component({
  selector: 'app-type-plat-item',
  templateUrl: './type-plat-item.component.html',
  styleUrl: './type-plat-item.component.css',
})
export class TypePlatItemComponent {
  @Input()
  public typePlat: TypePlat = new TypePlat();

  constructor(
    private typePlatService: TypePlatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSupprime(): void {
    if (confirm('Voulez-vous réellement supprimer ce type-plat')) {
      let ObservableAction;

      ObservableAction = this.typePlatService.deleteTypePlat(this.typePlat.id);

      console.log('Suppression');

      ObservableAction.subscribe({
        next: (typePlat) => {
          console.log('Suppression OK : ', typePlat);
          this.router
            .navigateByUrl('/')
            .then(() => this.router.navigateByUrl('/types_plats'));
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
