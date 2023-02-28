import { Component, OnInit } from '@angular/core';
import { BookModel } from '../types';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit{
  model: BookModel = new BookModel(0,'Title','Author');

  books: BookModel[] = [];
  constructor(private bookService: BookService) { }

  ngOnInit(): void{
  //  this.model = new BookModel(0,'Title','Author');
  }

 // model = new BookModel(0,'Title','Author');
  submitted = false;
  onSubmit(){ 
    this.submitted = true; 
  }
  
  add(author: string, title: string): void {
    if(this.model.id == 0){
      this.bookService.addBook(author, title);
    }else{
      this.bookService.updateBook(this.model.id, title, author);
    }
    
  }

  edit(id: number, title: string, author: string){
    console.log("Information from book-form.component.ts: id: " +id+ " title: " +title+ " author: " + author);
    console.log("this.model.title: " + this.model.title);
    this.model.author = author;
    this.model.title = title;
    this.model.id = id;
    this.submitted = false;
  }
}
