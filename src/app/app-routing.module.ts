import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuEditComponent } from './menu/menu-edit/menu-edit.component';
import { PlatEditComponent } from './plat/plat-edit/plat-edit.component';
import { TypePlatEditComponent } from './type-plat/type-plat-edit/type-plat-edit.component';
import { TypePlatListComponent } from './type-plat/type-plat-list/type-plat-list.component';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  { path: 'menus', component: MenuListComponent },
  { path: 'menu/new', component: MenuEditComponent },
  { path: 'menu/edit/:id', component: MenuEditComponent },
  { path: 'menu/:menuId/plat/new', component: PlatEditComponent },
  { path: 'menu/:menuId/plat/edit/:id', component: PlatEditComponent },
  { path: 'types_plats', component: TypePlatListComponent },
  { path: 'type_plat/new', component: TypePlatEditComponent },
  { path: 'type_plat/edit/:id', component: TypePlatEditComponent },
  { path: '', component: AccueilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
