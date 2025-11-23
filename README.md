# Customer Management App

A modern, responsive React application that helps you effortlessly manage your customer information. With its beautiful interface and intuitive design, you can easily view, search, and update customer details - all in one place.

## Features That Make Your Life Easier

- **Customer Data Table**: A clean, well-organized display that shows all your customer information at a glance. No more messy spreadsheets or hard-to-read lists.

- **Smart Filtering**: Find exactly what you're looking for by filtering customers by name, gender, or country. Perfect for when you need to quickly locate specific customers.

- **Easy Editing**: Update customer details with a simple, user-friendly modal. Change names, genders, or countries with just a few clicks.

- **Works Everywhere**: The app looks great and works perfectly whether you're on a desktop computer, tablet, or mobile phone.

- **Instant Search**: Start typing and watch as the results update in real-time. No waiting, no reloading - just fast, efficient searching.

- **Beautiful Design**: Enjoy a modern interface with smooth animations and pleasant visual elements that make using the app a pleasure.

## Built With Modern Technology

We've used the latest and most reliable technologies to ensure a smooth experience:

- **Frontend**: React 19.2.0 - The most popular and powerful JavaScript framework
- **Table Library**: @tanstack/react-table - Professional-grade table functionality
- **Icons**: Lucide React - Beautiful, consistent icons throughout the app
- **HTTP Client**: Axios - Reliable way to handle API communications
- **Styling**: Custom CSS - A unique, modern design created just for this app
- **API**: MockAPI - Simulates a real backend for testing and demonstration

## Get Started in Minutes

### For Development

1. **Get the code**
   ```bash
   git clone https://github.com/rharshitha19/inkle-frontend-assignment.git
   cd inkle-frontend-assignment
   ```

2. **Install what you need**
   ```bash
   npm install
   ```

3. **Start building**
   ```bash
   npm start
   ```

4. **Open your browser and visit** `http://localhost:3000`

### For End Users

Simply visit our live demo and start using the app immediately - no installation required!

## See It Live

Live Demo: [https://customer-management-system1.netlify.app/](https://customer-management-system1.netlify.app/)

Want to deploy your own version? Run:
```bash
npm run build
```

## How to Use the App

### Viewing Your Customers
- The main table shows all your customer records in a clean, easy-to-read format
- See customer names, genders, when they were added, and their countries
- The header shows you how many records you're viewing in real-time

### Finding Specific Customers
- Click the "Filter" button to reveal search options
- **Search by name**: Type any part of a customer's name
- **Filter by gender**: Show only Male, Female, or Other customers
- **Filter by country**: Focus on customers from specific countries
- See which filters are active and remove them with one click

### Updating Customer Information
- Click the "Edit" button next to any customer
- Make your changes in the clean, simple form that appears
- Hit "Save Changes" and watch the update happen instantly

## How It's Built

### Main Components

**TaxTable**
- The heart of the application - displays all your customer data
- Built with industry-standard @tanstack/react-table for maximum performance
- Looks great on any screen size with smooth hover effects

**EditModal**
- A popup form for editing customer information
- Ensures you enter all required information before saving
- Shows loading states so you know when changes are being processed

**App**
- The main component that ties everything together
- Handles loading your data and managing the app's state
- Gracefully handles errors and keeps you informed

### Talking to the Backend

The app communicates with these API endpoints:
- **GET /taxes**: Fetches all your customer records
- **PUT /taxes/:id**: Updates information for a specific customer
- **POST /taxes**: Adds new customers to your database
- **GET /countries**: Gets the list of available countries

### What Customer Data Looks Like

Each customer record contains:
- `id`: A unique identifier for each customer
- `name`: The customer's full name
- `gender`: Male, Female, or Other
- `country`: Where the customer is located
- `createdAt`: When the customer record was created

## Technical Excellence

This app demonstrates professional development practices:

- **Modern React Patterns**: Using the latest hooks and state management
- **Component Architecture**: Clean, reusable components that are easy to maintain
- **API Best Practices**: Proper error handling and loading states
- **State Management**: Efficient local state that updates the UI smoothly
- **Modern Styling**: Beautiful CSS with gradients, animations, and responsive design
- **Accessibility**: Built with semantic HTML and proper labels for screen readers

## Designed for Humans

We've paid special attention to the user experience:

- **Visually Pleasing**: Gradient backgrounds and clean typography create a professional appearance
- **Smooth Interactions**: Hover effects and transitions make the app feel responsive
- **Clear Feedback**: You always know what's happening with loading states and error messages
- **Intuitive Navigation**: Everything is where you'd expect it to be
- **Color Coding**: Gender and country tags use distinct colors for quick scanning

## Looks Great Everywhere

The app automatically adapts to your device:
- **Desktop**: Full-featured experience with efficient use of space
- **Tablet**: Adjusted layouts that maintain usability
- **Mobile**: Touch-friendly buttons and stacked layouts for easy one-handed use


## Created With Care

**Harshitha**  
- GitHub: [@rharshitha19](https://github.com/rharshitha19)

**Love this project? Give it a star on GitHub to show your support!**

 
