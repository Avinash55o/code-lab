# Debounced Search with Backend API
## We want to build:
- A search box on the frontend
- A search API on the backend

## Problem
If we call the backend on every key press, the server gets flooded.

## Goal
- Wait until the user stops typing
- Then call the backend only once

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

### different formats to say it
1. “How do you prevent excessive API calls while typing?”
2. “Search is slow and server load is high — fix it.”
3. “We want search to trigger only after user pauses.”
4. “Optimize live search input.”

