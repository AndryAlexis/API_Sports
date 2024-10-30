# 🏆 **API SPORTS** 🏆

## 🔐 Using JWT for Authentication

### 📝 Register

> • **URL:** */api/users/register*<br>
> • **METHOD:** *POST*<br>
> • **HEADERS:** *Content-Type: application/json*<br>
> • **BODY:** *username* and *password*<br>

**📥 INPUT:**    
```json
{
    "username" : "Andry",
    "password" : "123"
}
```

**📤 OUTPUT:**
```json
{
    "id": 25,
    "username": "Andry",
    "password": "123",
    "role": "regular"
}
```	

---------------------------------------

### 🔑 Login  

> • **URL:** */api/users/login*<br>
> • **METHOD:** *POST*<br>
> • **HEADERS:** *Content-Type: application/json*<br>
> • **BODY:** *username* and *password*<br>

**📥 INPUT:**

```json
{
    "username" : "Andry",
    "password" : "123"
}
```

**📤 OUTPUT:**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFuZHweOIjoIJoukbWluIiwiaWF0IjoxNzMwMzA2MTUyfQ.XdyAgujdZaoGqPkRjZyWjMG3brVCeiGu2WCT1enP1WA"
}
```	

---------------------------------------

### 👤 Profile

> • **URL:** */api/users/profile*<br>
> • **METHOD:** *GET*<br>
> • **HEADERS:** *Authorization: Bearer <token>*<br>
> • **BODY:** **None**

**📥 INPUT:** **None**

**📤 OUTPUT:**
```json
{
  "id": 11,
  "username": "Andry",
  "password": "$2a$10$X8CI./4YpMNElHnfrKXRjeTyJeYo60TvL82SmyI7cJSytgi60bs.O",
  "role": "regular",
  "events": [
    {
      "id": 6,
      "name": "Torneo de Voleibol Playa",
      "description": "Torneo de voleibol en la playa con equipos internacionales.",
      "date": "2024-06-24T22:00:00.000Z",
      "location": "Alicante",
      "sportType": "Volleyball",
      "organizer": "Andry",
      "image": null
    }
  ]
}
```	

---------------------------------------

## 🎯 Events Management

### 📋 Get All Events

> • **URL:** */api/events*<br>
> • **METHOD:** *GET*<br>
> • **HEADERS:** *Authorization: Bearer <token>*<br>
> • **BODY:** **None**

**📥 INPUT:** **None**

**📤 OUTPUT:**
```json
[
  {
    "id": 25,
    "name": "Test Event",
    "description": "Torneo regional sub-18 de baloncesto.",
    "date": "2025-10-03T22:00:00.000Z",
    "location": "Barcelona",
    "sportType": "Basketball",
    "organizer": "Andry",
    "image": null
  }
]
```

---------------------------------------º

### 🔍 Get Event Details

> • **URL:** */api/events/:id*<br>
> • **METHOD:** *GET*<br>
> • **HEADERS:** *Authorization: Bearer <token>*<br>
> • **BODY:** **None**

**📥 INPUT:** *id* from URL

**📤 OUTPUT:**
```json
{
  "id": 5,
  "name": "Test 6",
  "description": "Torneo regional sub-18 de baloncesto.",
  "date": "2023-10-03T22:00:00.000Z",
  "location": "Barcelona",
  "sportType": "Basketball",
  "organizer": "Alexis",
  "image": null
}
```

---------------------------------------

### ➕ Create Event

> • **URL:** */api/events*<br>
> • **METHOD:** *POST*<br>
> • **HEADERS:** <br>
>>    - *Authorization: Bearer <token>*<br>
>>    - *Content-Type: multipart/form-data*<br>
> • **BODY:** *name*, *description*, *date*, *location*, *sportType*, *image(optional)*

**📥 INPUT:**
>    - Form data with:<br>
>        📝 *name*: string<br>
>        📝 *description*: string<br>
>        📅 *date*: YYYY-MM-DD<br>
>        📍 *location*: string<br>
>        🎮 *sportType*: string<br>
>        🖼️ *image*: file (optional)

**📤 OUTPUT:**
```json
{
  "id": 44,
  "name": "Event Name",
  "description": "Description of the event",
  "date": "2025-10-03T22:00:00.000Z",
  "location": "Barcelona",
  "sportType": "Basketball",
  "organizer": "Andry",
  "image": "uploads\\image-1730317544751.jpg"
}
```	

---------------------------------------

### ✏️ Update Event

> • **URL:** */api/events/:id*<br>
> • **METHOD:** *PUT*<br>
> • **HEADERS:** 
>     - *Authorization: Bearer <token>*
>     - *Content-Type: application/json*

> **BODY:** *name*, *description*, *date*, *location*, *sportType*, *organizer*

**📥 INPUT:**
    - *id* from URL
```json
{
    "name": "Test 6",
    "description": "Torneo regional sub-18 de baloncesto.",
    "date": "2023-10-04",
    "location": "Barcelona",
    "sportType": "Basketball",
    "organizer": "Alexis"
}
```

**📤 OUTPUT:**
```json
{
    "id": 5,
    "name": "Test 6",
    "description": "Torneo regional sub-18 de baloncesto.",
    "date": "2023-10-03T22:00:00.000Z",
    "location": "Barcelona",
    "sportType": "Basketball",
    "organizer": "Alexis",
    "image": null
}
```

---------------------------------------

### ❌ Delete Event
    
> • **URL:** */api/events/:id*<br>
> • **METHOD:** *DELETE*<br>
> • **HEADERS:** *Authorization: Bearer <token>*<br>
> • **BODY:** **None**

**📥 INPUT:** *id* from URL

**📤 OUTPUT:**
```json
{
  "id": 7,
  "name": "Liga Femenina de Cricket",
  "description": "Partido de la liga femenina nacional de cricket.",
  "date": "2024-07-09T22:00:00.000Z",
  "location": "Málaga",
  "sportType": "Cricket",
  "organizer": "Andry",
  "image": null
}
```

---------------------------------------

## 📅 Event Filters
---------------------------------------

### ⏰ Upcoming Events

> • **URL:** */api/events/upcoming*<br>
> • **METHOD:** *GET*<br>
> • **HEADERS:** *Authorization: Bearer <token>*<br>
> • **BODY:** **None**

**📥 INPUT:** **None**

**📤 OUTPUT:**
```json
[
  {
    "id": 19,
    "name": "Test",
    "description": "Torneo regional sub-18 de baloncesto.",
    "date": "2025-10-03T22:00:00.000Z",
    "location": "Barcelona",
    "sportType": "Basketball",
    "organizer": "Andry",
    "image": null
  }
]
```

---------------------------------------

### 🎯 Filter by Sport Type

> • **URL:** */api/events?type=<sportType>*<br>
> • **METHOD:** *GET*<br>
> • **HEADERS:** *Authorization: Bearer <token>*<br>
> • **BODY:** **None**

**📥 INPUT:** *sportType* from URL

**📤 OUTPUT:**
```json
[
  {
    "id": 5,
    "name": "Test 6",
    "description": "Torneo regional sub-18 de baloncesto.",
    "date": "2023-10-03T22:00:00.000Z",
    "location": "Barcelona",
    "sportType": "Basketball",
    "organizer": "Alexis",
    "image": null
  }
]
```

---------------------------------------

### 📅 Filter by Date Range

> • **URL:** */api/events/date*<br>
> • **METHOD:** *GET*<br>
> • **HEADERS:** *Authorization: Bearer <token>*<br>
> • **QUERY PARAMS:** *from*, *to*

**📥 INPUT:** *from*, *to* from URL

**📤 OUTPUT:**
```json
[
  {
    "id": 5,
    "name": "Test 6",
    "description": "Torneo regional sub-18 de baloncesto.",
    "date": "2023-10-03T22:00:00.000Z",
    "location": "Barcelona",
    "sportType": "Basketball",
    "organizer": "Alexis",
    "image": null
  }
]
```

---------------------------------------

### 📑 Pagination

> • **URL:** */api/events/page*<br>
> • **METHOD:** *GET*<br>
> • **HEADERS:** *Authorization: Bearer <token>*<br>
> • **QUERY PARAMS:** *page*, *limit*

**📥 INPUT:** *page*, *limit* from URL

**📤 OUTPUT:**
```json
[
  {
    "id": 5,
    "name": "Test 6",
    "description": "Torneo regional sub-18 de baloncesto.",
    "date": "2023-10-03T22:00:00.000Z",
    "location": "Barcelona",
    "sportType": "Basketball",
    "organizer": "Alexis",
    "image": null
  }
]
```
