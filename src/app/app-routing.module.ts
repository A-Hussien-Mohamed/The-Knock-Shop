import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component'
import { fromEventPattern } from 'rxjs';
import { BasketComponent } from './basket/basket.component';

const routes: Routes = [
  { path: '', redirectTo: '/Menu', pathMatch: 'full' },
  { path: 'Menu', component: MenuComponent },
  { path: 'Basket', component: BasketComponent },
  { path: 'MenuItem/:id', component: MenuItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
