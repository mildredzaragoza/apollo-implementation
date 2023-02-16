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
  model = new BookModel('','');
  submitted = false;
  onSubmit(){ this.submitted = true; }
  add(title: string, author: string): void {
    title = title.trim();
    author = author.trim();
    if (!title || !author) { return; }
  }
}
