import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  currentProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    url: '',
    description: '',
    amount: 1
  };
  selectedAmount: number = 0;
  Show: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.GetProducts();
  }

  GetProducts(): void {
    this.productService.getProducts().subscribe(res => {
      const cartProduct = this.productService.getCartProduct();
      if (cartProduct.length > 0)
        for (let cartItem of cartProduct) {
          const productIndex = res.findIndex((i => i.id == cartItem.id));
          res[productIndex].amount = cartItem.amount;
        }
      this.productList = res;
    });

  }

  showItemDetail(currentProduct: Product): void {
    this.Show = true;
    this.currentProduct = currentProduct;

  }

  showProductList(product: Product): void {
    this.Show = false;
  }

}