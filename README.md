# 🏆 **API SPORTS** 🏆

## 🔐 Authentication
---------------------------------------

### 📝 Register

• URL: */api/users/register*

• METHOD: *POST*

• HEADERS: *Content-Type: application/json*

• BODY: 
  - *username*
  - *password*

@ 📥 INPUT:    
```json
{
    "username" : "Andry",
    "password" : "123"
}
```

@ 📤 OUTPUT:
    ✅ A Json with the user created

---------------------------------------

### 🔑 Login  

• URL: */api/users/login*

• METHOD: *POST*

• HEADERS: *Content-Type: application/json*

• BODY: 
  - *username*
  - *password*

@ 📥 INPUT:

```json
{
    "username" : "Andry",
    "password" : "123"
}
```

@ 📤 OUTPUT:
    🎫 A Json with the authentication token

---------------------------------------

### 👤 Profile

• URL: */api/users/profile*

• METHOD: *GET*

• HEADERS: *Authorization: Bearer <token>*

• BODY: **None**

@ 📥 INPUT: **None**

@ 📤 OUTPUT:
    👥 A Json with the user profile data

---------------------------------------

## 🎯 Events Management

### 📋 Get All Events

• URL: */api/events*

• METHOD: *GET*

• HEADERS: *Authorization: Bearer <token>*

• BODY: **None**

@ 📥 INPUT: **None**

@ 📤 OUTPUT:
    📑 A Json with all events

### 🔍 Get Event Details

• URL: */api/events/:id*

• METHOD: *GET*

• HEADERS: *Authorization: Bearer <token>*
• BODY: **None**

@ 📥 INPUT: id from URL

@ 📤 OUTPUT:
    📄 A Json with the event details

### ➕ Create Event

• URL: */api/events*

• METHOD: *POST*

• HEADERS: 
    - *Authorization: Bearer <token>*
    - *Content-Type: multipart/form-data*

• BODY:
    - *name*
    - *description*
    - *date*
    - *location*
    - *sportType*
    - *image(optional)*

@ 📥 INPUT:
    - Form data with:
        📝 *name*: string
        📝 *description*: string
        📅 *date*: YYYY-MM-DD
        📍 *location*: string
        🎮 *sportType*: string
        🖼️ *image*: file (optional)

@ 📤 OUTPUT:
    ✅ A Json with the created event

---------------------------------------

### ✏️ Update Event

• URL: */api/events/:id*

• METHOD: *PUT*

• HEADERS: 
    - *Authorization: Bearer <token>*
    - *Content-Type: application/json*

• BODY:
    - *name*
    - *description*
    - *date*
    - *location*
    - *sportType*
    - *organizer*

@ 📥 INPUT:
    - id from URL
    - Json with the event data to update

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

@ 📤 OUTPUT:
    ✅ A Json with the updated event

---------------------------------------

### ❌ Delete Event
    
• URL: */api/events/:id*

• METHOD: *DELETE*

• HEADERS: *Authorization: Bearer <token>*

• BODY: **None**

@ 📥 INPUT: id from URL

@ 📤 OUTPUT:
    🗑️ A Json with the deleted event

---------------------------------------

## 📅 Event Filters
---------------------------------------

### ⏰ Upcoming Events

• URL: /api/events/upcoming

• METHOD: *GET*

• HEADERS: *Authorization: Bearer <token>*
• BODY: **None**

@ 📥 INPUT: **None**

@ 📤 OUTPUT:
    📆 A Json with upcoming events

---------------------------------------

### 🎯 Filter by Sport Type
• URL: */api/events?type=<sportType>*
• METHOD: *GET*
• HEADERS: *Authorization: Bearer <token>*
• BODY: **None**

@ 📥 INPUT: *sportType* from URL

@ 📤 OUTPUT:
    🎮 A Json with events filtered by sport type

---------------------------------------

### 📅 Filter by Date Range

• URL: */api/events/date*

• METHOD: *GET*

• HEADERS: *Authorization: Bearer <token>*

• QUERY PARAMS:
    - *from*
    - *to*

@ 📥 INPUT: *from*, *to* from URL

@ 📤 OUTPUT:
    📆 A Json with events between the specified dates

---------------------------------------

### 📑 Pagination

• URL: */api/events/page*

• METHOD: *GET*

• HEADERS: *Authorization: Bearer <token>*

• QUERY PARAMS:
    - *page*
    - limit

@ 📥 INPUT: *page*, *limit* from URL

@ 📤 OUTPUT:
    📚 A Json with paginated events

---------------------------------------
