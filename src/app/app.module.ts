import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu-item/menu-item.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuEditComponent } from './menu/menu-edit/menu-edit.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { PlatItemComponent } from './plat/plat-item/plat-item.component';
import { PlatEditComponent } from './plat/plat-edit/plat-edit.component';
import { TypePlatListComponent } from './type-plat/type-plat-list/type-plat-list.component';
import { TypePlatItemComponent } from './type-plat/type-plat-item/type-plat-item.component';
import { TypePlatEditComponent } from './type-plat/type-plat-edit/type-plat-edit.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NavbarComponent,
    MenuEditComponent,
    MenuListComponent,
    PlatItemComponent,
    PlatEditComponent,
    TypePlatListComponent,
    TypePlatItemComponent,
    TypePlatEditComponent,
    AccueilComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
