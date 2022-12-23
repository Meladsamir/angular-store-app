import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import {ProductService} from 'src/app/services/product.service';
import {Product} from '../../models/Product';


@Component({selector: 'app-product-item', templateUrl: './product-item.component.html', styleUrls: ['./product-item.component.css']})
export class ProductItemComponent implements OnInit {
    @Input()product : Product;
    @Input()isDetail : boolean = false;

    amountsList : number[] = [];
    selectedAmount : number = 1;

    @Output()showProductList : EventEmitter < Product > = new EventEmitter;
    @Output()showItemDetail : EventEmitter<Product> = new EventEmitter;

    constructor(private productService : ProductService) {
        this.product = {
            id: 0,
            name: '',
            price: 0,
            url: '',
            description: '',
            amount: 1
        };
    }

    ngOnInit(): void {
        this.amountsList = Array.from({
            length: 20
        }, (_, i) => i + 1);
        if(!this.product.amount){
          this.product.amount=1;
        }
    }

    onOptionsSelected(value : string) {
        this.product.amount = Number.parseInt(value);
    }
    LoadProductList(): void {
        this.showProductList.emit();
    }
    onClickItem(product : Product) {
        this.showItemDetail.emit(product)
    }
    addToCart(product : Product): void {
        if (product.amount > 0) {
            this.productService.addToCart(product)
            alert('Added To Cart!');

        } else {
            alert('please choose a valid amount');
        }
    }


}
