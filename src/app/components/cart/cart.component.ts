import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RequesterInfo } from '../../models/RequesterInfo';
import { Product } from '../../models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList: Product[] = [];
  requesterInfo: RequesterInfo;
  Show: boolean = false;

  constructor(private productService: ProductService) {
    this.requesterInfo = {
      fullName: '',
      address: '',
      totalAmount: 0
    };
  }

  ngOnInit(): void {
    this.cartList = this.productService.getCartProduct();
    this.calculateTotalPrice();
  }
  calculateTotalPrice(): void {
    this.requesterInfo.totalAmount = 0;
    for (let index = 0; index < this.cartList.length; index++) {
      this.requesterInfo.totalAmount += this.cartList[index].amount * this.cartList[index].price;
    }
  }
  cartItemChange(product: Product): void {
    if (product.amount < 1) {
      this.removeItemFromCart(product);
    } else {
      this.productService.addToCart(product)
    }
    this.calculateTotalPrice();

  }
  onSubmit(): void {
    this.Show = true;
    this.productService.clearCart();

  }
  checkNumbers(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  removeItemFromCart(product: Product) {
    const index: number = this.cartList.indexOf(product);
    if (index !== -1) {
      this.cartList.splice(index, 1);
      this.productService.removeItemFromCart(product.id);
    }
    alert("Removed from Cart!");
    this.calculateTotalPrice();

  }

  clearCart(): void {
    this.productService.clearCart()
    this.cartList = [];
    this.calculateTotalPrice();
    alert("all items has been removed from your Cart!");

  }

}
