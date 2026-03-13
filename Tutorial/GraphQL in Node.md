# GraphQL in Node.js

### What is GraphQL?
GraphQL is a **query language** for APIs. Unlike REST (where you get fixed data from many endpoints), GraphQL lets the client ask **exactly** what it needs in one request.  
- No over-fetching or under-fetching.  
- Perfect for modern apps (React, mobile, etc.).

We'll build a simple **Books API** using **Node.js + Apollo Server** (the most popular and beginner-friendly GraphQL server).

---

### Prerequisites
- Node.js **v20.0.0 or later** (`node -v` to check)  
- Basic JavaScript knowledge  
- A code editor (VS Code recommended)

---

### Step 1: Create a New Project
```bash
mkdir graphql-node-tutorial
cd graphql-node-tutorial
npm init --yes
npm pkg set type="module"   # Important! Enables modern JavaScript (top-level await)
```

This creates a `package.json` file.

---

### Step 2: Install Dependencies
```bash
npm install @apollo/server graphql
```

That's it! Only two packages needed for a full GraphQL server.

---

### Step 3: Create the Server File
Create a file called **`index.js`** in the root folder and paste the following code **step by step**:

```js
// 1. Imports
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// 2. Define the Schema (GraphQL Type Definition)
const typeDefs = `#graphql
  type Book {
    title: String!
    author: String!
  }

  type Query {
    books: [Book!]!          # Returns a list of books
    book(title: String!): Book # NEW: Get one book by title
  }

  type Mutation {
    addBook(title: String!, author: String!): Book!  # NEW: Add a new book
  }
`;

// 3. Sample Data (in-memory – later you can replace with database)
const books = [
  { title: 'The Awakening', author: 'Kate Chopin' },
  { title: 'City of Glass', author: 'Paul Auster' },
];

// 4. Resolvers (how to fetch the data)
const resolvers = {
  Query: {
    books: () => books,
    book: (_, { title }) => books.find(book => book.title === title),
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      const newBook = { title, author };
      books.push(newBook);
      return newBook;
    },
  },
};

// 5. Create the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 6. Start the server
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
```

**Explanation of each part:**
- `typeDefs` → Defines what data exists and what queries/mutations are allowed (written in **Schema Definition Language**).
- `books` array → Fake database.
- `resolvers` → JavaScript functions that actually run when someone queries the API.
- `startStandaloneServer` → Starts a ready-to-use server (no Express needed for learning).

---

### Step 4: Add Start Script
Open `package.json` and update the `"scripts"` section:

```json
"scripts": {
  "start": "node index.js"
}
```

---

### Step 5: Run the Server
```bash
npm start
```

You should see:  
`🚀 Server ready at: http://localhost:4000`

---

### Step 6: Test It in the Browser (Apollo Sandbox)
1. Open **http://localhost:4000** in your browser.  
2. You'll see the beautiful **Apollo Sandbox** (built-in GraphQL playground).

#### Try these queries/mutations:

**1. Get all books**
```graphql
query GetAllBooks {
  books {
    title
    author
  }
}
```

**2. Get one specific book**
```graphql
query GetOneBook {
  book(title: "The Awakening") {
    title
    author
  }
}
```

**3. Add a new book (Mutation)**
```graphql
mutation AddNewBook {
  addBook(title: "1984", author: "George Orwell") {
    title
    author
  }
}
```

Run the mutation, then run the first query again — the new book appears instantly! 🎉

---

