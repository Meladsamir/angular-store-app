import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RequesterInfo } from 'src/app/models/RequesterInfo';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  @Input() requesterInfo: RequesterInfo;
  @Output() showCart: EventEmitter<RequesterInfo> = new EventEmitter;
  constructor() {
    this.requesterInfo = {
      fullName: '',
      address: '',
      totalAmount: 0
    }
  }

  ngOnInit(): void {
  }
  LoadProductList() {
    this.showCart.emit();
  }
}

