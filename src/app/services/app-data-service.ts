import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class DataService {
    menuItems = [];
    basketItems = [];
    private _menuItemsSubject = new Subject<any>();
    private _basketItemsSubject = new Subject<any>();

    constructor() { }

    addToBasket(item) {
        let existItem = this.basketItems.find(x => x.id == item.id);
        if (existItem) {
            existItem.quantity++;
        }
        else {
            this.basketItems.push(item);
        }
        let storedItems = JSON.parse(sessionStorage.getItem("basketItems"));
        if (storedItems && storedItems.length > 0) {
            sessionStorage.removeItem("basketItems");
        }
        sessionStorage.setItem("basketItems", JSON.stringify(this.basketItems));
        this._basketItemsSubject.next(this.basketItems);
    }
    deleteFromBasket(itemId) {
        this.basketItems = this.basketItems.filter(x => x.id !== itemId);
        sessionStorage.removeItem("basketItems");
        sessionStorage.setItem("basketItems", JSON.stringify(this.basketItems));
        this._basketItemsSubject.next(this.basketItems);
    }
    deleteBasketItems() {
        this.basketItems = [];
        return this._basketItemsSubject.next(this.basketItems);
    }
    getBasketItems() {
        return this._basketItemsSubject.asObservable();
    }

    getBasketList() {
        return this.basketItems;
    }
    setItems(items) {
        this.menuItems = items;
        this._menuItemsSubject.next(this.menuItems);
    }
    getItems() {
        return this._menuItemsSubject.asObservable();
    }
    getMenuItem(itemId) {
        return this.menuItems.find(x => x.id == itemId);
    }

}