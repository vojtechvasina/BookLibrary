import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  books: any[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.loadBooks();
  }

  ionViewWillEnter() {
    this.loadBooks();
  }

  async loadBooks() {
    this.books = await this.storageService.getBooks();
  }

  async removeBook(bookId: string) {
    await this.storageService.removeBook(bookId);
    await this.loadBooks();
  }

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }
}