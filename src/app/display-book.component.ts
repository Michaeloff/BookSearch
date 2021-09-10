import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from './Book';
import { BookService } from './book.service';

@Component({
  selector: 'display-book',
  templateUrl: './display-book.component.html'
})
export class DisplayBookComponent implements OnInit {
  bookSelected?:Book = undefined

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.bookSelected = history.state.book
  }

  startNewSearch() {
    this.router.navigateByUrl('')
  }
}
