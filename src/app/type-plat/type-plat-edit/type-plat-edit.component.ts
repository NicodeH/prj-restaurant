import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TypePlat } from '../../models/type-plat';
import { TypePlatService } from '../../services/type-plat.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-type-plat-edit',
  templateUrl: './type-plat-edit.component.html',
  styleUrl: './type-plat-edit.component.css',
})
export class TypePlatEditComponent {
  public typePlat: TypePlat = new TypePlat();

  constructor(
    private typePlatService: TypePlatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.typePlat = new TypePlat();
    this.typePlat.id = id;

    if (id) {
      this.typePlatService.getTypePlat(id).subscribe({
        next: (typePlat) => (this.typePlat = { ...typePlat }),
        error: (err) => this.router.navigateByUrl('/types_plats'),
      });
    }
  }

  public onSubmit(leFormulaire: NgForm): void {
    if (leFormulaire.valid) {
      let ObservableAction;
      if (this.typePlat.id) {
        ObservableAction = this.typePlatService.updateTypePlat(this.typePlat);
      } else {
        ObservableAction = this.typePlatService.addTypePlat(this.typePlat);
      }

      ObservableAction.subscribe({
        next: (typePlat) => {
          console.log('Enregistrement OK : ', typePlat);
          this.router.navigateByUrl('/types_plats');
        },
        error: (err) => {
          console.log('ERREUR de sauvegarde : ', err);
        },
      });
    }
  }
}
