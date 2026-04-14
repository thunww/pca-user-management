# API Documentation

Base URL: `http://localhost:5000/api`

---

## GET /users

Retrieve paginated list of users.

**Query Parameters**

| Param     | Type   | Default   | Description                              |
| --------- | ------ | --------- | ---------------------------------------- |
| page      | number | 1         | Page number                              |
| limit     | number | 10        | Items per page                           |
| sortBy    | string | createdAt | firstName / lastName / email / createdAt |
| sortOrder | string | desc      | asc / desc                               |
| search    | string | ""        | Search firstName, lastName, email        |

**Response 200**

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "uuid",
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "total": 13
  }
}
```

---

## POST /users

Create a new user.

**Request Body**

```json
{
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "Pass123"
}
```

**Validation Rules**

- `email`: required, valid email format
- `firstName`: required, string
- `lastName`: required, string
- `password`: required, min 6 chars, at least 1 uppercase, at least 1 number

**Response 201**

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "uuid",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses**

| Status | Reason               |
| ------ | -------------------- |
| 400    | Validation failed    |
| 400    | Email already exists |
| 500    | Server error         |

---

## DELETE /users/:id

Soft delete a user by ID.

**Response 200**

```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": null
}
```

**Error Responses**

| Status | Reason         |
| ------ | -------------- |
| 404    | User not found |
| 500    | Server error   |

---

## POST /users/export

Export selected users as CSV file.

**Request Body**

```json
{
  "ids": ["uuid1", "uuid2"]
}
```

**Response 200**

Returns a CSV file download.

```
id,email,first_name,last_name
uuid1,john@example.com,John,Doe
uuid2,jane@example.com,Jane,Smith
```

**Error Responses**

| Status | Reason               |
| ------ | -------------------- |
| 400    | ids array is empty   |
| 404    | No valid users found |
| 500    | Server error         |
