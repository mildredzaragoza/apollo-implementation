import { Component, OnInit } from '@angular/core';
import { Book } from '../types';
import { BookService } from '../services/book.service';
import { Apollo } from 'apollo-angular';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  books: Book[] = [];
  constructor(private apollo: Apollo, private bookService: BookService){}

  ngOnInit() {
    this.bookService.getBooks().subscribe(books => this.books = books);
  }

  deleteBook(id: number) {
    console.log("Delete Information from list.component.ts: id" +id);
    this.bookService.deleteBook(id);
  }

  editBook(id: number, title: string, author: string){
    console.log("Information from list.component.ts: id" +id+ " title: " +title+ " author: " + author);
    BookFormComponent.prototype.edit(id, title, author);
  }


}
