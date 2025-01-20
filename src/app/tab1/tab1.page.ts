import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  searchTerm: string = '';
  books: any[] = [];
  isLoading: boolean = false;
  myLibraryBooks: any[] = [];

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute, 
    private storageService: StorageService
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['isbn']) {
        this.searchTerm = params['isbn'];
        this.searchBooks();
      }
    });
    await this.loadLibraryBooks();
  }

  async loadLibraryBooks() {
    this.myLibraryBooks = await this.storageService.getBooks();
    console.log('Knihy v knihovne:', this.myLibraryBooks);
  }

  isBookInLibrary(book: any): boolean {
    return this.myLibraryBooks.some(libraryBook => 
      libraryBook.title === book.title && 
      libraryBook.author_name?.[0] === book.author_name?.[0]
    );
  }

  async searchBooks() {
    if (this.searchTerm) {
      this.isLoading = true;
      try {
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(this.searchTerm)}&limit=10`;

        this.http.get(url).subscribe(async (data: any) => {
          this.books = data.docs || [];
          this.isLoading = false;
          await this.loadLibraryBooks();
          console.log('Vyhledane knihy:', this.books);
        });
      } catch (error) {
        console.error('Error fetching books:', error);
        this.isLoading = false;
      }
    }
  }

  getBookCover(coverId: string) {
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    if (this.searchTerm.length > 2) {
      this.searchBooks();
    }
  }

  async addToLibrary(book: any) {
    await this.storageService.addBook(book);
    await this.loadLibraryBooks();
    console.log('Pridana kniha: ', book);
  }
}