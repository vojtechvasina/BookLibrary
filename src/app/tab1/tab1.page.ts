import { Component, runInInjectionContext } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
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