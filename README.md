# project-9-rest-api

## Authorization

### Routes that require *Basic Authorization*

#### GET
  - /users
  
#### POST  
- /users
- /courses

#### PUT
- /courses/:id

#### DELETE

- /courses/:id

## Validation

### User
  - firstName lastName, and password cannot be empty / null
  - emailAddress cannot be empty / null and must be a valid email address format
  

### Course
- title and description cannot be empty / null

## Create User

A user requires: a first name, last name, email address, and password.

### Example
#### Input
```
{
  "firstName":"Bob",
  "lastName":"Loblaw",
  "emailAddress":"Bob@bobloblawslawblog.com",
  "password":"logofbobloblawslawblog"
}
```
## Get User

### Example
#### Output
```
{
  "firstName":"Bob",
  "lastName":"Loblaw",
  "emailAddress":"Bob@bobloblawslawblog.com"
}

```
  

## Create / Update Course

A course requires: a title and a description.

### Example
#### Input
```
{
  "title":"Law Blog",
  "description":"An in-depth guide to the creation of Bob Loblaw's Law Blog"
}
```
## Get Course

### Example
>/api/courses/1
#### Output
```
{
    "id": 1,
    "title": "Law Blog",
    "description": "An in-depth guide to the creation of Bob Loblaw's Law Blog",
    "estimatedTime": null,
    "materialsNeeded": null,
    "userId": 1,
    "user": {
        "firstName": "Bob",
        "lastName": "Loblaw",
        "emailAddress": "Bob@bobloblawslawblog.com"
    }
}
```
