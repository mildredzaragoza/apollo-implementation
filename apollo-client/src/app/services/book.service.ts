import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, Query } from '../types';
import { Apollo, Mutation } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private apollo: Apollo) { }

  getBooks(): Observable<[Book]>{
    return this.apollo.watchQuery<Query>({
      query: gql`
        query books {
          books {
            title
            author
          }
        }
      `
    })
      .valueChanges
      .pipe(
        map(result => result.data.books)
      );
  }

 
}
