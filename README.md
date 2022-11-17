# Tools & co

_Tools&Co gives people the ability to rent various tools and achieve their DIY dreams 🤩_

## [toolsandco.onrender.com](https://toolsandco.onrender.com/)

Tools&Co is a FullStack Web application made by [@bapturp](https://github.com/bapturp) [@hugoviolas](https://github.com/hugoviolas) and [@inesza](https://github.com/inesza) during the [Ironhack Web Development Bootcamp](https://www.ironhack.com/en/web-development) in only **4 days** 🚀

**Technologies used**

- HTML
- CSS
- Node
- Express
- Mongoose
- MongoDB

It implements 5 database models, full CRUD operations, sign up/login/ogout, 3 differents user roles.

## Setup dev environment

### Dependencies

Install the following packages on your local machine:

- npm version 8
- node version 18
- mongodb version 6

### Clone this repo

Clone this repo and `cd` into it.

```sh
git clone <url>
cd <dir_name>
```

### Setup the .env file

This project require some environment variables to run, it reads the file `.env` on startup. An example file is provided `.env.example`, rename this file to `env` and fill it:

**Environment variables:**

- `PORT`: Port on which the the website is accessible,
- `MONGODB_URI`: URI of the mongo database (i.e. `mongodb://127.0.0.1:27017/toolsharing`)
- `SESSION_SECRET`: Secret used to sign the session ID cookie, [see session doc](https://www.npmjs.com/package/express-session#user-content-secret)
- `CLOUDINARY_NAME`: Cloudinary name
- `CLOUDINARY_KEY`: Cloudinary key
- `CLOUDINARY_SECRET`: Cloudinary secret

### Install NodeJS dependencies

```sh
npm install
```

### Seed the database

To get some data shown on the app, you can use the following command:

```sh
npm run seed
```

### Start the project

```sh
npm run dev
```
