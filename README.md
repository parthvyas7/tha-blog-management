# Blog post management with MERN stack

Simple blog post management system using the MERN stack. The application should allow users to perform basic CRUD operations (Create, Read, Update, Delete) on blog posts.

This is Take-home assignment for MERN stack developer role.

# Demo

[Visit]()

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Run Locally

Clone project on your machine

Setup frontend

```sh
cd tha-blog-management/frontend
npm install
```

Start the client
```sh
npm run dev
```

Setup backend

```sh
cd tha-blog-management/backend
npm install
```

Start the server
```sh
npm run dev
```

Visit client URI on browser

## Environment Variables

To run this project, you will need to add environment variables to your `.env` file

See `.env.sample`

## API Reference

Import collection from `API_collection_User Auth Test.json`

#### User signup

```http
  POST /api/users/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### User login

```http
  POST /api/users/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**. |

### Authenticated user only

#### View profile

```http
  GET /api/users/me
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | JWT token in Authorisation Header |

#### Get a random joke

```http
  GET /api/random-joke
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | JWT token in Authorisation Header |

#### User logout

```http
  POST /api/users/logout
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | JWT token in Authorisation Header |

## License

[MIT](https://choosealicense.com/licenses/mit/)
