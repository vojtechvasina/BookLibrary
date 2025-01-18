import { Component, runInInjectionContext } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  scanResult = '';
  isScanning = false;

  constructor() {}

  async scanBarcode() {
    this.isScanning = true;
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        this.scanResult = result.content;
      }
    }
    this.isScanning = false;
  }
}
