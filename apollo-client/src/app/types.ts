export type Book = {
    id: number;
    title: string;
    author: string;
}

export type Query = {
    books: [Book];
}

export type Mutation = {
    addBook(title: String, author: String): Book;
    deleteBook(title: String): [Book];
    updateBook(id: Number, title: String, author: String): Book;
}

export class BookModel{
    constructor(
        public id: number,
        public title: string,
        public author: string,
    ){}
}
