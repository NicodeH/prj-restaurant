import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TypePlat } from '../../models/type-plat';
import { TypePlatService } from '../../services/type-plat.service';

@Component({
  selector: 'app-type-plat-list',
  templateUrl: './type-plat-list.component.html',
  styleUrl: './type-plat-list.component.css',
})
export class TypePlatListComponent {
  public typesPlats!: Observable<TypePlat[]>;

  constructor(private typePlatService: TypePlatService) {}

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
  }
}
