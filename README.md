# Notes App Backend
This repository contains the backend of the notes application developed as part of the [FullStackOpen course](fullstackopen.com). The notes app is a simple tool that allows users to create, read, update, and delete notes.

Technologies Used
The backend has been developed using the following technologies:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

## Run Locally
To set up and run the backend of the notes application, follow these steps:

Clone the project

```bash
  git clone https://github.com/FaustoFe/fullstackopen-backend
```

Go to the project directory

```bash
  cd fullstackopen-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`\
`SECRET`\
`DB_URI`

## API Endpoints
The backend of the notes application exposes the following API endpoints:

#### Get all notes

```bash
  GET /api/notes
```

#### Get note

```bash
  GET /api/notes/:id
```
| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `string` | **Required**. Id of the note to fetch |

#### Creates a note

```bash
  POST /api/notes
```

#### Update a note

```bash
  PUT /api/notes/:id
```
| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Required**. Id of the note to update |

#### Delete a note

```bash
  DELETE /api/notes/:id
```
| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Required**. Id of the note to delete |

## Related Projects
 - [fullstackopen-frontend](https://github.com/FaustoFe/fullstackopen-frontend)
