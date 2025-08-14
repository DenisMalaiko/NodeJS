### Install Dependencies
```npm i```

## Run Migration For Creating Table
```psql -U postgres -d deploy -f ./src/migrations/001_init.sql```

## Build
```npm run build```

## START
```npm run start```

## CHECK API
```http://localhost:3000/```

## LINT
```npm run lint```

## LOG
#### Check price error (Need to add Price INTEGER to SQL)
```npm run schema:log```

## CHECK
```npm run schema:check```

## FIX 
```psql -U postgres -d deploy -f ./src/migrations/002_fix.sql```