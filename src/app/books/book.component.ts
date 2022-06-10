import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book';
import { BookReview } from './book-review';

const API_KEY = 'rxNgvQI6FFXNAGKZI64DqzgPkvZgtVGN';
const API_URL = 'https://api.nytimes.com/svc/books/v3';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  loader = true;
  books  : Book[] = []
  filteredBooks: Book[] = [];

  private _listFilter = '';

  get listFilter(): string{
    return this._listFilter;
  }

  set listFilter(value: string){
    this._listFilter = value;
    this.filteredBooks = this.performFilter(value);
  }

  constructor(private bookService: BookService,
    private http: HttpClient) { }

  performFilter(filterBy: string): Book[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.books.filter((book: Book) => this._listFilter.toLocaleLowerCase().includes(filterBy));
  console.log(filterBy)
  }
  
  getBookReviews() {
    return this.http.get(`${API_URL}/reviews.json?Author=${this._listFilter}&api-key=${API_KEY}`);
  }
 
  search(){
    this.loadBookReviews();
  }
  getBestSellers(bestSellers: string) {
    return this.http.get(`${API_URL}/lists/names.json?api-key=${API_KEY}`);
  }

  ngOnInit(): void {
    this.loader = true;
    this.loadBestSellers(true);
  }

  loadBestSellers(onFirstLoad : boolean) {
    this.getBestSellers('').subscribe((book: any) => {
      var { results } = book;
      if(onFirstLoad){
        this.books = results.sort((a : any, b : any) => b-a).slice(0,10);
        console.log(results)
      }
      else{
        this.books = results;
        console.log(this.books)
        }
        this.loader = false;
    });
  }

  loadBookReviews() {
    this.getBookReviews().subscribe((book: any) => {
      var { results } = book;
        this.books = results;
        console.log(this.books)
        this.loader = false;
    });
  }
}
