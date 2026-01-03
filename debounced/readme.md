# Debounced Search with Backend API
---
## We want to build:
- A search box on the frontend
- A search API on the backend

## Problem
If we call the backend on every key press, the server gets flooded.

## Goal
- Wait until the user stops typing
- Then call the backend only once

---
## visual flow
```text
user types -> waits -> waits -> user stop typeing
                        |
                        300ms pass
                        |
                        api call
                        |
                        show results

```
