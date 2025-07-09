# store 
Your Global State Container
This file is where you configure and create your Redux store, which holds the state for your entire application. Think of it like your app's central memory hub.
You’ll typically:
- Import configureStore from Redux Toolkit
- Add your slices (like userSlice)
- Export the store for use in your app

# userSlice
Your User State Manager
A "slice" is a focused part of the Redux state. In this file, you're defining everything related to user info (like login state, user type: explorer/business/admin, etc.)
You’ll typically:
- Import createSlice
- Set an initial state (e.g., user info, login status)
- Define reducer functions (e.g., loginUser, logoutUser)
- Export the actions and reducer


