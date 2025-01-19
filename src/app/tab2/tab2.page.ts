import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.startScanner();
  }

  async startScanner() {
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
      await BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan();
      
      if (result.hasContent) {
        this.router.navigate(['/tabs/tab1'], { 
          queryParams: { isbn: result.content }
        });
      }
    }
  }

  ionViewWillLeave() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }
}
