### Install Dependencies
```npm i```

### Run Migration For Creating Table
```psql -U postgres -d acid_lab -f ./src/migrations/001_init.sql```


### Run Server
```npm run start```


### Test
```npm run test:e2e```