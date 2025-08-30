## Install dependencies
```npm i```

## Run 
```npm run start```

## Endpoints
- `POST /auth/login` — JSON `{email, password}` or Basic Auth
- `POST /auth/refresh` — body `{refreshToken}`
- `GET /auth/profile` — requires `Authorization: Bearer <accessToken>`


### Demo users:
- `demo@example.com / P@ssw0rd!` (role: user)
- `admin@example.com / P@ssw0rd!` (role: admin)