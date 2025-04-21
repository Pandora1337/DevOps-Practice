# API Service

This is the API service that accepts requests and queries the DB for data.
When a new Todo is created, MongoDB assigns unique `_id` all on its own.

## Example requests:
```
GET http://<IP>/todos # Get all todos

POST http://<IP>/todos # Post a new todo in JSON format

GET http://<IP>/todos/<ID> # Get a specific todo by ID

PUT http://<IP>/todos/<ID> # Update a todo by ID

DELETE http://<IP>/todos/<ID> # Deletes a todo entry
```

## JSON format of the Todo task:

```
{
    title: "New Task",
    body: "",
    completed: false
}
```