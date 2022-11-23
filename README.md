# Tools & co

_Tools&Co gives people the ability to rent various tools and achieve their DIY dreams 🤩_

<style>
  a:hover {
    color:red !important;
  }

  #screenshot {
    max-width: 500px;
    height: 400px;
  }

  #screenshot img {
    width: 100%;
    object-fit: cover;
    transition: 1s;
  }

  #screenshot:hover img {
    transform: translateY(100%);
  }
</style>
<div id="screenshot"><a href="https://toolsandco.onrender.com/"><img src="./toolsandco-screenshot.png"></a></div>

## [toolsandco.onrender.com](https://toolsandco.onrender.com/)

Tools&Co is a FullStack web application made by [@bapturp](https://github.com/bapturp) [@hugoviolas](https://github.com/hugoviolas) and [@inesza](https://github.com/inesza) during the [Ironhack Web Development Bootcamp](https://www.ironhack.com/en/web-development) in only **4 days** 🚀

**Technologies used**

- Javascript
- HTML
- CSS
- Node
- Express
- Mongoose
- MongoDB

It implements 5 database models, full CRUD operations, sign up/login/logout, 3 differents user roles.

## Setup dev environment

### Dependencies

Install the following packages on your local machine:

- npm version 8
- node version 18
- mongodb version 6

### Clone repo

```sh
git clone https://github.com/bapturp/toolsandco.git
cd toolsandco/
```

### Setup the .env file

This project requires some environment variables to run, it reads the file `.env` on startup. An example file is provided `.env.example`.

**Environment variables:**

- `PORT`: Port on which the the website is accessible.
- `MONGODB_URI`: URI of the mongo database (i.e. `mongodb://127.0.0.1:27017/toolsharing`).
- `SESSION_SECRET`: Secret used to sign the session ID cookie, [see session doc](https://www.npmjs.com/package/express-session#user-content-secret).
- `CLOUDINARY_NAME`: Cloudinary name
- `CLOUDINARY_KEY`: Cloudinary key
- `CLOUDINARY_SECRET`: Cloudinary secret

### Install NodeJS dependencies

```sh
npm install
```

### Seed the database

Default data can be seed in the database:

```sh
npm run seed
```

### Start the project

```sh
npm run dev
```
