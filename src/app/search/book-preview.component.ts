import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../Book';

@Component({
  selector: 'book-preview',
  templateUrl: './book-preview.component.html',
  styles: []
})
export class BookPreviewComponent implements OnInit {
  @Input() book:Book = {}
  @Input() index:number = 1
  @Input() newSearch:boolean = false
  private delay = 0

  constructor() { }

  ngOnInit(): void {
    this.delay = this.newSearch ? 0.1 : 0
  }

  backdropStyle = () => ({
    'background':`linear-gradient(180deg, rgba(0,0,0,.7), transparent), url(${this.book.posterUrl})`,
    'background-size':'cover',
    'min-height':'400px'
  })
  animationDelay = () => ({
    'animation-delay':`${this.index * this.delay}s`
  })
}