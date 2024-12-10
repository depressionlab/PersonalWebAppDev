# to start server

1. download deno!
2. `deno task start`

## endpoints

- `GET /users`: get all users
- `POST /users`: insert a new user, requires `{ name: string, age: number }` JSON body.
- `GET /users/:id`: get a user by its id
- `PUT /users/:id`: update a user by its id
- `DELETE /users/:id`: delete a user by its id
- `GET /ping`: pong
