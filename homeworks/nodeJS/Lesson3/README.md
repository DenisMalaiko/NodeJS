## Створення образів

```docker compose up```

## Перевірка роботи


### GET запит до сервера
```curl localhost:8080/kv/:key```

### POST запит до сервера
```curl -X POST -H "Content-Type: application/json" -d '{"key":"test", "value":"Hello, Redis!"}' localhost:8080/kv/```

## Зупинка compose
```docker compose down -v```