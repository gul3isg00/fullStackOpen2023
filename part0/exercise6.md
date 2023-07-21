# Form submitted (SPA)
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser-->>browser: "note" added to local note list, notes list redrawn.
    browser->>server: POST "note" to https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>server: "note" pushed onto "notes" list
    server-->>browser: {message: "note created"}
```