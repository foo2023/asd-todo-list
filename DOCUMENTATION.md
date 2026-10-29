# To-Do List App

A simple to-do list built with React, Vite and Tailwind CSS.

## How to Run

You need Node.js and npm. (Tested with Node v24.20.0 and npm 11.19.0 on Windows 11.)

```
npm install
npm run dev
```

Open the link shown in the terminal (usually http://localhost:5173).

Other commands:

- `npm run build` - build the app for production
- `npm run lint` - check the code style

## Features

- **Add** - click the plus button, fill in the form, then press Submit.
- **Edit** - click the edit button, then click a card to change it. Press Submit to save or Cancel to stop.
- **Delete** - click the trash button, pick one or more cards, then click the trash button again. Use the check button to select all. Press Cancel to stop.
- **Search** - type in "Quick Search" to find tasks by title.
- **Sort** - click the filter button to sort tasks from high to low priority.
- **Priority** - Low, Medium or High. Each has its own color.
- **Status** - Todo, In Progress or Done. Each has its own color.

## Notes

- Tasks are kept in memory only. They are lost when you refresh the page.
- Only one mode (add, edit or delete) can be on at a time.
