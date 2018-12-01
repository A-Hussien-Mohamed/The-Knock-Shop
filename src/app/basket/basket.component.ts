import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/app-data-service';
import { parse } from 'url';
import { Router } from "@angular/router"

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  BasketItems = [];
  totalPrice = 0.00;

  constructor(private _dataService: DataService,
    private _router: Router) { }

  ngOnInit() {
    this.getBasketItems();
  }

  getBasketItems() {
    this.BasketItems = this._dataService.getBasketList();
    if (this.BasketItems.length == 0) {
      this.BasketItems = JSON.parse(sessionStorage.getItem("basketItems"));
    }
    this.BasketItems && this.BasketItems.forEach((item) => {
      this.totalPrice = parseFloat((this.totalPrice + (item.quantity * item.price)).toFixed(3));
    });
  }

  deleteBasketItem(item) {
    this.totalPrice = parseFloat((this.totalPrice - (item.quantity * item.price)).toFixed(3)); // minusing the current Total price with the delete item
    this.BasketItems = this.BasketItems.filter(x => x.id !== item.id); // filtering the list to get all the items except the deleted one 
    this._dataService.deleteFromBasket(item.id); // subscribing to all the observables
  }

  order() {
    this.BasketItems = [];
    sessionStorage.clear();
    this._dataService.deleteBasketItems();
    alert("Thank you For your Order!");
    this._router.navigate(['/Menu'])

  }

}
