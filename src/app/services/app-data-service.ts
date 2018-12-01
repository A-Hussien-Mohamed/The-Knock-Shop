import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class DataService {

    MenuItems = [];
    basketItems = [];
    private MenuItemsSubject = new Subject<any>();
    private basketItemsSubject = new Subject<any>();

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
        this.basketItemsSubject.next(this.basketItems);
    }
    deleteFromBasket(itemId) {
        this.basketItems = this.basketItems.filter(x => x.id !== itemId);
        sessionStorage.removeItem("basketItems");
        sessionStorage.setItem("basketItems", JSON.stringify(this.basketItems));
        this.basketItemsSubject.next(this.basketItems);
    }
    deleteBasketItems() {
        this.basketItems = [];
        return this.basketItemsSubject.next(this.basketItems);
    }
    getBasketItems() {
        return this.basketItemsSubject.asObservable();
    }

    getBasketList() {
        return this.basketItems;
    }

    setItems(items) {
        this.MenuItems = items;
        this.MenuItemsSubject.next(this.MenuItems);
    }

    getItems() {
        return this.MenuItemsSubject.asObservable();
    }

    getMenuItem(itemId) {
        return this.MenuItems.find(x => x.id == itemId);
    }

}