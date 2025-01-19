import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
  
  public async addBook(book: any) {
    const books = await this.getBooks();
    books.push(book);
    return this._storage?.set('books', books);
  }

  public async getBooks() {
    const books = await this._storage?.get('books') || [];
    return books;
  }

  public async removeBook(bookId: string) {
    const books = await this.getBooks();
    const updatedBooks = books.filter((book: any) => book.key !== bookId);
    return this._storage?.set('books', updatedBooks);
  }
}
