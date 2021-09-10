import { Component, Directive, ElementRef, Input, OnInit } from '@angular/core'
import { Subject } from 'rxjs';
import { BookService } from '../book.service'
import { map, debounceTime } from 'rxjs/operators' 
import { Book } from '../Book';
import { Router } from '@angular/router';

@Component({
  selector: 'search-book',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  searchResults:Book[] = []
  search$:Subject<string> = new Subject<string>()
  fetching:boolean = false
  search:string = ""
  newSearch:boolean = false

  constructor(public bookService:BookService, private router: Router) { }

  ngOnInit(): void {
    this.search = this.bookService.currentSearchString

    this.search$
      .pipe(debounceTime(500), map(query => {
        this.fetching = true
        return query
    })).subscribe(this.searchQueryBook.bind(this))
 
    this.searchResults = this.bookService.searchResults
  }

  setCurrentBook(book:Book) {
    this.bookService.changeSelectedBook(book)
    // Change route to "root/book" to display individual book
    this.router.navigateByUrl('book',  { state: { book: book } })
  }

  searchQueryBook(query:string) {
    this.newSearch = true
    this.searchResults = []
    this.bookService.currentSearchString = query
    if (query.length > 0) {
      this.bookService.searchBooks(query)
        .subscribe((results) => {
          this.fetching = false
          this.searchResults = results
          this.bookService.searchResults = results
       })
    }
    else {
      this.fetching = false
      this.searchResults = []
      this.bookService.searchResults = []
    }
  }
}

// Directive to keep focus on the text input box for the book search query
@Directive({ selector: '[myFocus]'})
export class FocusDirective implements OnInit {
  @Input('myFocus') isFocused: boolean = false

  constructor(private hostElement: ElementRef) { }

  ngOnInit() {
    if (this.isFocused) {
      this.hostElement.nativeElement.focus();
    }
  }
}