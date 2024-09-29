Motivering till val av databas:
Hade dålig koll på GraphQL så tänkte att det var ett bra tillfälle att göra så att man fick lite mindre dålig koll, helt enkelt.

Paket som används:
Apollo-server-express: En extension till till Express för att kunna hantera GraphQL-förfrågningar.  
dotenv: För att säkert kunna ”dölja” lösenordet.   
graphql: För att kunna jobba med graphql. Förstår inte riktigt skillnaden mellan den och Apollo-server men när man har dom båda så funkar det i alla fall.
Mongoose: För att kunna koppla upp mig till min MongoDB.
Nodemon: Så att servern startas om automatiskt.
Ts-node: För att kunna köra TypeScript i realtid. 
TypeScript: För att kunna köra TypeScript. 

Funktioner:
Denna applikation är en backend-server byggd med Node.js, Express, Apollo Server och Mongoose. Den använder GraphQL för att hantera API-förfrågningar och MongoDB som databas.

Filer:
src/schema.ts: Definerar schemat för queries och mutationer.
src/resolver.ts: Logiken för queries och mutationer.
src/models/task.ts: För att interagera med Task-dokument i databasen.
src/models/user.ts: För att interagera med User-dokument i databasen. 
src/server.ts: Kör Express-servern ihop med Apollo Server. 

Exempel på mutationer och queries:

---------------------------------------------------------------------ANVÄNDARE-----------------------------------------------------------------------------------------

Mutation för att skapa användare

mutation {
  addUser(name: "John Doe", email: "john@example.com", password: "password123") {
    id
    name
    email
    password
  }
}

Fråga för att hämta alla users

query {
  users {
    id
    name
    email
    password
  }
}

Fråga för att hämta användare med specifikt id.

query {
  user(id: "USER_ID") {
    id
    name
    email
    password
  }
}

Mutation för att uppdatera existerande användare

mutation {
  updateUser(id: "USER_ID", name: "Jane Doe", email: "jane@example.com", password: "newpassword123") {
    id
    name
    email
    password
  }
}

Mutation för att radera användare

mutation {
  deleteUser(id: "USER_ID") {
    id
    name
    email
    password
  }
}


Radera alla uppgifter

mutation {
  deleteAllTasks
}



----------------------------------------------------------------------------------------TASKS-------------------------------------------------------------------------------------------------------------

Mutation för att lägga till uppgift till en användare. Här byter ut USER_ID mot användarens id.

mutation {
  addTask(title: "New Task", description: "Task description", status: "to-do", assignedTo: "USER_ID") {
    id
    title
    description
    status
    assignedTo {
      id
      name
    }
    createdAt
    finishedBy
  }
}

Fråga efter alla uppgifter

query {
  tasks {
    id
    title
    description
    status
    assignedTo {
      id
      name
    }
    createdAt
    finishedBy
  }
}


Fråga för att hämta uppgifter med id

query {
  task(id: "TASK_ID") {
    id
    title
    description
    status
    assignedTo {
      id
      name
    }
    createdAt
    finishedBy
  }
}

Uppdatera uppgift. När man ändrar status till done så skall dagens datum läggas till automatiskt. 

mutation {
  updateTask(id: "TASK_ID", title: "Updated Task", description: "Updated description", status: "in-progress", assignedTo: "USER_ID", finishedBy: ”VALFRITT_NAMN”) {
    id
    title
    description
    status
    assignedTo {
      id
      name
    }
    createdAt
    finishedBy
  }
}

Radera uppgift

mutation {
  deleteTask(id: "TASK_ID") {
    id
    title
    description
    status
    assignedTo {
      id
      name
    }
    createdAt
    finishedBy
  }
}

Radera alla uppgifter

mutation {
  deleteAllTasks
}



	
