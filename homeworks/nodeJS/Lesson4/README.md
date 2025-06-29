## simple.Dockerfile

### Створити образ
```docker build -f docker/simple.Dockerfile -t brews-api-simple .```

### Запустити образ
```docker run -p 3000:3000 brews-api-simple```


## multi.Dockerfile

### Створити образ
```docker build -f docker/multi.Dockerfile -t brews-api-multi .```

### Запустити образ
```docker run -p 3000:3000 brews-api-multi```


## esbuild.Dockerfile

### Створити образ
```docker build -f docker/esbuild.Dockerfile -t brews-api .```

### Запустити образ
```docker run -p 3000:3000 brews-api```