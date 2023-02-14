export type Book = {
    title: String;
    author: String;
}

export type Query = {
    books: [Book];
}