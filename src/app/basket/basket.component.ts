import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/app-data-service';
import { parse } from 'url';
import { Router } from "@angular/router"

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  basketItems = [];
  totalPrice = 0.00;

  constructor(private _dataService: DataService,
    private _router: Router) { }

  ngOnInit() {
    this.getBasketItems();
  }

  getBasketItems() {
    this.basketItems = this._dataService.getBasketList();
    if (this.basketItems.length == 0) {
      this.basketItems = JSON.parse(sessionStorage.getItem("basketItems"));
    }
    this.basketItems && this.basketItems.forEach((item) => {
      this.totalPrice = parseFloat((this.totalPrice + (item.quantity * item.price)).toFixed(3));
    });
  }

  deleteBasketItem(item) {
    this.totalPrice = parseFloat((this.totalPrice - (item.quantity * item.price)).toFixed(3)); // minusing the current Total price with the delete item
    this.basketItems = this.basketItems.filter(x => x.id !== item.id); // filtering the list to get all the items except the deleted one 
    this._dataService.deleteFromBasket(item.id); // subscribing to all the observables
  }

  order() {
    this.basketItems = [];
    sessionStorage.clear();
    this._dataService.deleteBasketItems();
    alert("Thank you For your Order!");
    this._router.navigate(['/Menu'])

  }

}
