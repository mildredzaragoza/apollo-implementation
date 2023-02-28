import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book , Query } from '../types';
import { Apollo, Mutation } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Serializer } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private apollo: Apollo) { }

  deleteBookQuery = gql`
    mutation DeleteBook($deleteBookId: Int) {
      deleteBook(id: $deleteBookId) {
        title
        author
        id
      }
    }
  `;

  addBookQuery = gql`
    mutation AddBook($title: String, $author: String) {
      addBook(title: $title, author: $author) {
        id
        author
        title
      }
    }
  `;
  
  getBooksQuery = gql`
    query {
      books {
        title
        author
        id
      }
    }
  `;

  updateBookQuery = gql`
    mutation UpdateBook($updateBookId: Int, $title: String, $author: String) {
      updateBook(id: $updateBookId, title: $title, author: $author) {
        title
        author
      }
    }
  `;

  getBooks(): Observable<[Book]>{
    return this.apollo.watchQuery<Query>({
        query: this.getBooksQuery
      })
      .valueChanges
      .pipe(
        map(result => result.data.books)
      ); 
  }

  addBook(newAuthor: string, newTitle: string){
    this.apollo
      .mutate({
        mutation: this.addBookQuery,
        variables: {
          title: newTitle,
          author: newAuthor
        },
      refetchQueries: [{
        query: this.getBooksQuery
      }]
    }).subscribe()
  }

  deleteBook(deleteBookId: number){
    this.apollo.
      mutate({
        mutation: this.deleteBookQuery,
        variables: {
          id: deleteBookId
        },
        refetchQueries: [{
        query: this.getBooksQuery
      }]
    }).subscribe()
  }

  updateBook(bookToUpdateId: number, newTitle: string, newAuthor: string){
    this.apollo.
      mutate({
        mutation: this.updateBookQuery,
        variables: {
          id: bookToUpdateId,
          title: newTitle,
          author: newAuthor
        },
        refetchQueries: [{
          query: this.getBooksQuery
        }]
      }).subscribe()
  }
}
