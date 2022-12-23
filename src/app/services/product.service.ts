import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }
  storage = window.localStorage;
  private CART_LIST_KEY = 'CART_LIST';
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('./assets/data.json');
  }

  addToCart(product: Product): void {
    let cartItems = this.getCartProduct();
    if (cartItems.length > 0) {
      const itemFound = cartItems.find(i => i.id == product.id);
      //remove the product from the list if aleady exist
      if (itemFound) cartItems = cartItems.filter(i => i.id != product.id);
    }
    cartItems.push(product);
    localStorage.setItem(this.CART_LIST_KEY, JSON.stringify(cartItems));
  }

  getCartProduct(): Product[] {
    let cartItems: Product[] = JSON.parse(this.storage.getItem(this.CART_LIST_KEY) || '[]');
    return cartItems;
  }

  removeItemFromCart(productId: number): void {
    let cartItems = this.getCartProduct();
    const index: number = cartItems.findIndex(i => i.id === productId);
    if (index !== -1) {
      cartItems.splice(index, 1);
      localStorage.setItem(this.CART_LIST_KEY, JSON.stringify(cartItems));
    }
  }

  clearCart(): void {
    this.storage.clear();
  }
}