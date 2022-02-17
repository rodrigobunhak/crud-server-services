const express = require('express');
const cors = require('cors')
const { randomUUID } = require('crypto')
const fs = require('fs')

const app = express();

app.use(express.json())
app.use(cors());

let users = []

fs.readFile("db.json", "utf-8", (err, data) => {
  if(err) {
    console.log(err)
  } else {
    users = JSON.parse(data)
  }
})

app.get("/", (request, response) => {
  response.send("It's running....")
})

app.post("/users", (request, response) => {
  const { 
    fullName,
    cpf,
    surname,
    gender,
    phone,
    address,
    observation,
    avatarURL,
  } = request.body;

  const user = {
    fullName,
    cpf,
    createDate: new Date().toLocaleString(),
    updateDate: '',
    surname,
    gender,
    phone,
    address,
    observation,
    avatarURL,
    id: randomUUID(),
  }

  users.push(user)

  writeDataIntoDatabase();

  return response.json({ message: 'user created successfuly' })
})

app.get("/users", (request, response) => {
  return response.json(users)
})

app.get("/users/:id", (request, response) => {
  const { id } = request.params;

  const user = users.find(user => user.id === id)

  return response.json(user)
})

app.put("/users/:id", (request, response) => {
  const { id } = request.params;
  const { 
    fullName,
    cpf,
    surname,
    gender,
    phone,
    address,
    observation,
    avatarURL,
  } = request.body;

  const userIndex = users.findIndex(user => user.id === id)

  users[userIndex] = {
    ...users[userIndex],
    fullName,
    cpf,
    updateDate: new Date().toLocaleString(),
    surname,
    gender,
    phone,
    address,
    observation,
    avatarURL
  }

  writeDataIntoDatabase();

  return response.json({ message: 'user updated successfuly' })
})

app.delete("/users/:id", (request, response) => {
  const { id } = request.params;
  const userIndex = users.findIndex(user => user.id === id)
  users.splice(userIndex, 1)

  writeDataIntoDatabase();

  return response.json({ message: 'User deleted successfuly' })
})

function writeDataIntoDatabase() {
  fs.writeFile("db.json", JSON.stringify(users), (err) => {
    if(err) {
      console.log(err);
    } else {
      console.log("data writed into the database")
    }
  })
}

app.listen(5001, () => console.log('Server running on port 5001'))