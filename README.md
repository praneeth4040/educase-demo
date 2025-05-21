# School Management API

A Node.js backend system for managing schools with location-based features.

## Features

- Add new schools with location data
- Retrieve schools sorted by proximity to a given location
- Distance calculation using Haversine formula
- Environment variables configuration
- API testing with Postman

## Tech Stack

- Node.js
- Express.js
- MySQL
- dotenv

## Setup

1. Clone the repository
```bash
git clone https://github.com/praneeth4040/educase-demo.git
cd educase-demo
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the root directory:
```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
PORT=3000
```

4. Start the server
```bash
npm start
```

## Database Schema

```sql
CREATE TABLE schools (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  address VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT
);
```

## API Endpoints

### 1. Add School
- **Endpoint:** `POST /addSchool`
- **Description:** Add a new school with location data
- **Request Body:**
```json
{
  "name": "Green Valley School",
  "address": "123 Main Street, City",
  "latitude": 17.385,
  "longitude": 78.4867
}
```
- **Response:**
```json
{
  "message": "School added successfully"
}
```

### 2. List Schools by Distance
- **Endpoint:** `GET /listSchools`
- **Description:** Get schools sorted by distance from a given location
- **Query Parameters:**
  - `latitude` (required)
  - `longitude` (required)
- **Example Request:**
```
GET /listSchools?latitude=17.385&longitude=78.4867
```
- **Response:**
```json
[
  {
    "id": 2,
    "name": "Green Valley School",
    "address": "123 Main Street, City",
    "latitude": 17.385,
    "longitude": 78.4867,
    "distance": 0
  },
  {
    "id": 5,
    "name": "Ocean View School",
    "address": "456 Beach Road, City",
    "latitude": 17.39,
    "longitude": 78.49,
    "distance": 0.62
  }
]
```

## Testing

A Postman collection is provided for testing the APIs. Import `SchoolAPI.postman_collection.json` into Postman to get started.

## Requirements Checklist

- [x] MySQL schools table
- [x] Add School API with validation
- [x] List Schools API with distance sorting
- [x] Distance calculation implementation
- [x] API testing documentation
- [x] Postman collection

## Resources

- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)