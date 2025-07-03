import "reflect-metadata"
import {BooksModule} from "./apps/books/books.module";
import {Factory} from "./core/http";

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

const app = Factory([BooksModule])

const port = 8081;

app.listen(port, () => console.log(`Mini-Nest listening on http://localhost:${port}`));