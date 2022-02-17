const express = require('express');
const cors = require('cors')
const { randomUUID } = require('crypto')

const app = express();

app.use(express.json())
app.use(cors());

const users = []

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

  return response.json({ message: 'user updated successfuly' })
})

app.delete("/users/:id", (request, response) => {
  const { id } = request.params;
  const userIndex = users.findIndex(user => user.id === id)
  users.splice(userIndex, 1)

  return response.json({ message: 'usuario deletado com sucesso' })
})

app.listen(5001, () => console.log('Server running on port 5001'))