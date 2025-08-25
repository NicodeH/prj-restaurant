import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Plat } from '../../models/plat';
import { PlatService } from '../../services/plat.service';
import { TypePlatService } from '../../services/type-plat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TypePlat } from '../../models/type-plat';

@Component({
  selector: 'app-plat-edit',
  templateUrl: './plat-edit.component.html',
  styleUrl: './plat-edit.component.css',
})
export class PlatEditComponent {
  public plat: Plat = new Plat();
  public typesPlats: Observable<TypePlat[]> = new Observable<TypePlat[]>();

  constructor(
    private platService: PlatService,
    private typePlatService: TypePlatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.typesPlats = this.typePlatService.getTypesPlats();
    this.typesPlats.subscribe({
      next: (typesPlats) => {
        console.log('Chargement terminé : ', typesPlats);
      },

      error: (err) => {
        console.log('ERREUR de chargement : ', err);
      },
    });

    const id = this.route.snapshot.params['id'];
    const menuId = +this.route.snapshot.params['menuId'];
    this.plat = new Plat();
    this.plat.menuId = menuId;

    if (id) {
      this.platService.getPlat(id).subscribe({
        next: (plat) => (this.plat = { ...plat }),
        error: (err) => this.router.navigateByUrl('/menus'),
      });
    }
  }

  public onSubmit(leFormulaire: NgForm): void {
    if (leFormulaire.valid) {
      let ObservableAction;
      if (this.plat.id) {
        ObservableAction = this.platService.updatePlat(this.plat);
      } else {
        ObservableAction = this.platService.addPlat(this.plat);
      }

      ObservableAction.subscribe({
        next: (plat) => {
          console.log('Enregistrement OK : ', plat);
          this.router.navigateByUrl('/menus');
        },
        error: (err) => {
          console.log('ERREUR de sauvegarde : ', err);
        },
      });
    }
  }

  onTypePlatChange(event: Event): void {
    const selectedTypePlatName = (event.target as HTMLInputElement).value;
    this.typesPlats.subscribe((typesPlats) => {
      const selectedTypePlat = typesPlats.find(
        (typePlat) => typePlat.nom === selectedTypePlatName
      );
      if (selectedTypePlat) {
        this.plat.calories = selectedTypePlat.calories_defaut;
      }
    });
  }
}
