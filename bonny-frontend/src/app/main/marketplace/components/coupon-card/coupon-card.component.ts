import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Coupon } from 'src/app/model/Coupon';
import { CouponDetailsComponent } from '../coupon-details/coupon-details.component';
import { ScanService } from 'src/app/receipt/service/scan.service';

@Component({
  selector: 'app-coupon-card',
  templateUrl: './coupon-card.component.html',
  styleUrls: ['./coupon-card.component.scss'],
})
export class CouponCardComponent  implements OnInit {

  //@ts-ignore
  @Input("coupon") coupon: Coupon

  //@ts-ignore
  @Input("canActivate") canActivate: boolean

  //@ts-ignore
  @Input("active") active: boolean

  //@ts-ignore
  @Output("activate") activate: EventEmitter<ElementRef> = new EventEmitter<ElementRef>()

  //@ts-ignore
  @ViewChild("card") card: ElementRef

  constructor(
    private modalCtrl: ModalController,
    private nav: NavController,
    private scanService: ScanService
  ) { }

  ngOnInit() {}

  async showCoupon() {
    const modal = await this.modalCtrl.create({
      component: CouponDetailsComponent,
      componentProps: {coupon: this.coupon}
    });

    modal.present()

    switch((await modal.onWillDismiss()).data) {
      case "activate":
        this.activateCoupon();
        break;
    }

    
  }

  showAllCoupons() {
    this.nav.navigateForward("tabs/marketplace/earn/coupons")
  }

  activateCoupon() {
    this.activate.emit(this.card)
  }

  async scanReceipt() {
    await this.scanService.scanReceipt()
  }

}
