# API Documentation

Base URL: `http://localhost:5000/api`

All successful responses follow this structure:

```json
{
  "success": true,
  "message": "OK",
  "data": {}
}
```

All error responses follow this structure:

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## GET /users

Retrieve a paginated list of users.

**Query Parameters**

| Param     | Type   | Default     | Description                                                  |
| --------- | ------ | ----------- | ------------------------------------------------------------ |
| page      | number | 1           | Page number                                                  |
| limit     | number | 10          | Items per page                                               |
| sortBy    | string | `createdAt` | Sort field: `firstName` / `lastName` / `email` / `createdAt` |
| sortOrder | string | `desc`      | Sort direction: `asc` / `desc`                               |
| search    | string | `""`        | Search across `firstName`, `lastName`, `email`               |

**Response 200**

```json
{
  "success": true,
  "message": "OK",
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

**Error Responses**

| Status | Message      | Reason                  |
| ------ | ------------ | ----------------------- |
| 500    | Server error | Unexpected server error |

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

| Field       | Rules                                                                      |
| ----------- | -------------------------------------------------------------------------- |
| `email`     | Required, valid email format                                               |
| `firstName` | Required, string                                                           |
| `lastName`  | Required, string                                                           |
| `password`  | Required, min 6 characters, at least 1 uppercase letter, at least 1 number |

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

| Status | Message              | Reason                        |
| ------ | -------------------- | ----------------------------- |
| 400    | Validation failed    | Request body fails validation |
| 400    | Email already exists | Email is already registered   |
| 500    | Server error         | Unexpected server error       |

**Error Response Example**

```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

## DELETE /users/:id

Soft delete a user by ID. The user record is preserved in the database with `deleted = true` and will no longer appear in the user list.

**Path Parameters**

| Param | Type   | Description      |
| ----- | ------ | ---------------- |
| `id`  | string | UUID of the user |

**Response 200**

```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": null
}
```

**Error Responses**

| Status | Message        | Reason                    |
| ------ | -------------- | ------------------------- |
| 404    | User not found | No user with the given ID |
| 500    | Server error   | Unexpected server error   |

**Error Response Example**

```json
{
  "success": false,
  "message": "User not found"
}
```

---

## POST /users/export

Export selected users as a CSV file download.

**Request Body**

| Field | Type            | Rules                                |
| ----- | --------------- | ------------------------------------ |
| `ids` | array of string | Required, must contain at least 1 ID |

```json
{
  "ids": ["uuid1", "uuid2"]
}
```

**Response 200**

Returns a CSV file (`users.csv`) as a file download.

```
Content-Type: text/csv
Content-Disposition: attachment; filename="users.csv"
```

```csv
id,email,first_name,last_name
uuid1,john@example.com,John,Doe
uuid2,jane@example.com,Jane,Smith
```

**Error Responses**

| Status | Message              | Reason                              |
| ------ | -------------------- | ----------------------------------- |
| 400    | ids array is empty   | `ids` field is missing or empty     |
| 404    | No valid users found | None of the provided IDs were found |
| 500    | Server error         | Unexpected server error             |

**Error Response Example**

```json
{
  "success": false,
  "message": "ids array is empty"
}
```
