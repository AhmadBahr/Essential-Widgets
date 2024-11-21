# Essential Widgets Chrome Extension

## Table of Contents
1. [**General Info**](#general-info)
2. [**Technologies Used**](#technologies-used)
3. [**Setup**](#setup)
4. [**Features**](#features) 
5. [**Code & Snippets**](#codesnippets)

## General Info
The Essential Widgets Chrome Extension is a productivity-focused project designed to enhance user efficiency and provide quick access to essential tools. The extension offers six widgets:

Greetings: Displays a personalized greeting based on the time of day.

Weather: Provides current weather conditions using a weather API.

Time and Date: Shows the current time and date in a visually appealing format.

Crypto: Tracks cryptocurrency prices in real-time.

To-Do: A simple task management widget to organize daily activities.

Bookmark: Quickly save and access frequently visited web pages.

# Technologies Used:

## Frontend Development:

React.js: React is used as the primary framework for building the dynamic and reusable components of the extension, 

ensuring efficient state management and seamless updates.

HTML, CSS, and JavaScript: Core technologies underpinning the extension’s structure and logic.

Tailwind CSS: Utilized for styling the widgets with a responsive and modern design, integrated with React components for rapid development.

 ## APIs and Libraries
 
OpenWeatherMap API: Fetches real-time weather data for the Weather widget. React hooks are employed to manage API calls and state.

CoinGecko API: Provides live cryptocurrency price updates for the Crypto widget, with efficient rendering using React's state and props.

Moment.js: Used to format and manage time and date data within React components.

localStorage: Integrated with React to store user data (to-do items, bookmarks, and preferences) persistently across sessions.

React Icons: Supplies high-quality SVG icons to enhance the design of each widget.

Axios: A promise-based HTTP client for making API requests, simplifying the handling of asynchronous operations.

# Setup
## Extension Setup

Clone the repository:

git clone https://github.com/your-username/essential-widgets.git

Navigate to the project directory:

cd essential-widgets

Install dependencies (if applicable):

npm install

Load the extension in Chrome:

Open Chrome and go to chrome://extensions.

Enable Developer Mode.

Click on Load Unpacked and select the essential-widgets project directory.

Open a new tab to see the widgets in action.

## Features

Greetings Widget:

Displays a personalized greeting (e.g., “Good Morning”) based on the time of day.

Allows customization of user name for a more tailored experience.

2. Weather Widget:
   
Fetches real-time weather information using the OpenWeatherMap API.

Displays temperature, humidity, and weather conditions.

Allows location input for city-specific data.

4. Time and Date Widget:
   
Provides current time and date in an elegant format.

Updates in real-time without refreshing the tab.

6. Crypto Widget:
   
Tracks real-time prices of selected cryptocurrencies (e.g., Bitcoin, Ethereum).

Option to add or remove cryptocurrencies from the watchlist.

8. To-Do Widget:
   
Allows users to add, edit, and delete tasks.

Saves task data locally using localStorage.

10. Bookmark Widget:
    
Provides a quick-access list of frequently visited sites.

Allows adding and deleting bookmarks.

# Code & Snippets: 

## Example: To-Do Widget Functionality:

This snippet demonstrates how to implement a basic to-do list using localStorage:

const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const addTodoButton = document.getElementById("add-todo");

// Load saved todos from localStorage
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
savedTodos.forEach((todo) => addTodoToList(todo));

// Add a new task
addTodoButton.addEventListener("click", () => {
  const todoText = todoInput.value.trim();
  if (todoText) {
    addTodoToList(todoText);
    saveTodoToLocal(todoText);
    todoInput.value = "";
  }
});

// Add todo to the DOM
function addTodoToList(todoText) {
  const listItem = document.createElement("li");
  listItem.textContent = todoText;
  listItem.classList.add("todo-item");
  todoList.appendChild(listItem);
}

// Save todo to localStorage
function saveTodoToLocal(todoText) {
  savedTodos.push(todoText);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

## Example: To-Do Widget Functionality:

This snippet fetches weather data from the OpenWeatherMap API:

const apiKey = "your-api-key";
const weatherDisplay = document.getElementById("weather");

navigator.geolocation.getCurrentPosition((position) => {

  const { latitude, longitude } = position.coords;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
  
    .then((response) => response.json())
    
    .then((data) => {
    
      const { temp } = data.main;
      
      const { description } = data.weather[0];
      
      weatherDisplay.textContent = `Temperature: ${temp}°C, ${description}`;
      
    })
    
    .catch((error) => console.error("Error fetching weather data:", error));
    
});
