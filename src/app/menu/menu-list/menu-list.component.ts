import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu, Statut } from '../../models/menu';
import { MenuService } from '../../services/menu.service';

export enum EtatChargement {
  TERMINEE = 'Chargement des menus terminés',
  ENCOURS = 'Chargement des menus en cours...',
  ERREUR = 'Service indisponible, revenez plus tard !',
}

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css',
})
export class MenuListComponent {
  public menus!: Observable<Menu[]>;
  public etatChargement = EtatChargement.ENCOURS;
  readonly enumChargement = EtatChargement; // transmettre l'enum au Template

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menus = this.menuService.getMenus();
    this.menus.subscribe({
      next: (menus) => {
        this.etatChargement = EtatChargement.TERMINEE;
        console.log('Chargement terminé : ', menus);
      },

      error: (err) => {
        console.log('ERREUR de chargement : ', err);
        this.etatChargement = EtatChargement.ERREUR;
      },
    });
  }

}

