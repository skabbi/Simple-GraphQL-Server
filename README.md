# Simple-GraphQL-Server

Simple GraphQL server to show how to get data from multiple sources using resolvers.

1. Start server: "node server.js"
2. Enter the URL http://localhost:4000 into your browser.

**Example request:**
```
{
  authors {
    name,
    books {
      title
      review
    }
  }
}
```

**Example response:**
```
{
  "data": {
    "authors": [
      {
        "name": "J.K. Rowling",
        "books": [
          {
            "title": "Harry Potter and the Chamber of Secrets",
            "review": 4.4
          },
          {
            "title": "Fantastic Beasts and Where to Find Them",
            "review": 4
          },
          {
            "title": "The Casual Vacancy",
            "review": 3.3
          }
        ]
      },
      {
        "name": "Michael Crichton",
        "books": [
          {
            "title": "Jurasic Park",
            "review": 4
          },
          {
            "title": "The 13th Warrior",
            "review": 3.7
          }
        ]
      }
    ]
  }
}
```
