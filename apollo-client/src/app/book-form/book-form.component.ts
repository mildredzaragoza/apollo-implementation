import { Component } from '@angular/core';
import { BookModel } from '../types';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {
  books: BookModel[] = [];
  constructor(private bookService: BookService) { }
  model = new BookModel('The bible','jessus');
  submitted = false;
  onSubmit(){ this.submitted = true; }
  add(title: String, author: String): void {
    console.log('title: ' + title + "author: " + author)
   /* title = title.trim();
    author = author.trim();
    if (!title || !author) { return; } */
    this.bookService.addBook();
  }
}
