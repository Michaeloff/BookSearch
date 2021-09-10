import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component'
import { BookService } from './book.service'
import { DisplayBookComponent } from './display-book.component'
import { SearchComponent, FocusDirective } from './search/search.component'
import { BookPreviewComponent } from './search/book-preview.component'
import { FooterComponent } from './footer.component'

@NgModule({
  declarations: [
    AppComponent,
    DisplayBookComponent,
    SearchComponent,
    BookPreviewComponent,
    FooterComponent,
    FocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
