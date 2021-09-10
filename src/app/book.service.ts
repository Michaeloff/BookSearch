import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators' 
import { Book } from './Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private selectedBook$:Subject<Book> = new Subject<Book>()
  public searchResults:Book[] = []
  public currentSearchString:string = ""

  // Example: https://openlibrary.org/api/books?bibkeys=ISBN:0545663261&jscmd=data&format=json
  private baseApiUrlBook:string = "https://openlibrary.org/api/books"
  private baseApiUrlGoogleBookSearch:string = "https://www.googleapis.com/books/v1/volumes"

  constructor( private http:HttpClient ) {}

  changeSelectedBook(book:Book) {
    this.selectedBook$.next(book)
  }

  getCover(book:Book) {
    let ISBN = 'ISBN:' + book.ISBN
    const params = new HttpParams().set('bibkeys', ISBN).set('jscmd', 'data').set('format', 'json')
    this.http.get<any>(this.baseApiUrlBook, {params}).subscribe(data => {
      console.log(data)
      book.posterUrl = data[ISBN].cover.large
      this.selectedBook$.next(book)
    })
  }

  searchBooks(query:string) {
    const params = new HttpParams().set('q', query)
    // For example: "https://www.googleapis.com/books/v1/volumes?q=mockingjay"

    return this.http.get<any>(this.baseApiUrlGoogleBookSearch, {params}).pipe(
      map (data =>
        data.items.map((result: any) => {
          let book = result.volumeInfo
          let author = (book.authors) ? book.authors[0] : "N/A"
          let thumbnail = (book.imageLinks) ? book.imageLinks.smallThumbnail : ""
          let ISBN = (book.industryIdentifiers) ? book.industryIdentifiers[0].identifier : ""
          let newBook:Book = {
            title:book.title,
            author:author,
            number_of_pages:book.pageCount,
            publish_date:book.publishedDate,
            overview:book.description,
            posterUrl:thumbnail,
            ISBN:ISBN
          }
          return newBook
        })
      )
    )
  }
}
