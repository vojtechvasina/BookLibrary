import { Component, runInInjectionContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  searchTerm: string = '';
  books: any[] = [];
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  async searchBooks() {
    if (this.searchTerm) {
      this.isLoading = true;
      try {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(this.searchTerm)}&maxResults=10`;
        
        this.http.get(url).subscribe((data: any) => {
          this.books = data.items || [];
          this.isLoading = false;
        });
      } catch (error) {
        console.error('Error fetching books:', error);
        this.isLoading = false;
      }
    }
  }

  // Můžeš přidat metodu pro vyhledávání při psaní
  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.searchBooks();
  }
}