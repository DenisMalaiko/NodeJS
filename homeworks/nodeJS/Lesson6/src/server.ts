import "reflect-metadata"
import {Factory} from "./core/http";
import {HttpExceptionFilter} from "./apps/filters/http-exception.filter";
import {BooksModule} from "./apps/books/books.module";

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

const app = Factory([BooksModule])

app.useGlobalFilters([new HttpExceptionFilter()]);

const PORT = 3000;

app.listen(PORT, () => console.log(`Mini-Nest listening on http://localhost:${PORT}`));