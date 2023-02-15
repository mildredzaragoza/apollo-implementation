import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Book } from '../types';
import { BookService } from '../services/book.service';

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


}
