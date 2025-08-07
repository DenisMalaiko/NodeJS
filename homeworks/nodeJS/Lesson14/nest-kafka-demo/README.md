### Install Dependencies
```npm i```

### Run Kafka
```docker-compose up -d```

- **Check Containers**
  ```docker ps```

- **Check KAFKA URL**
  ```nc -zv localhost 9092```

### Run Endpoint
curl -X POST http://localhost:3000/notification/signup \
-H "Content-Type: application/json" \
-d '{"message": "TEST"}'