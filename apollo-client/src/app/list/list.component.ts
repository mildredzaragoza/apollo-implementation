import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { Book, Query } from '../types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  books$!: Observable<[Book]>;
  constructor(private apollo: Apollo){}

  ngOnInit() {
    this.books$ = this.apollo.watchQuery<Query>({
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
