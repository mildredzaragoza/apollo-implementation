export type Book = {
    title: String;
    author: String;
}

export type Query = {
    books: [Book];
}

export class BookModel{
    constructor(
        public title: string,
        public author: string,
    ){}
}