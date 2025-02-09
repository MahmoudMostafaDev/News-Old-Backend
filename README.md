# News Old - A News Aggregation Platform

## 📌 Description
News Old is a news aggregation platform that collects daily news from an external API and stores it in a database. Every day, it provides users with trending news from various sources, tailored to their interests, such as sports or general news. Users can also save articles that interest them and compile them for later reading, ensuring they never miss important updates.

## 🚀 Features
- **User Accounts & Authentication**: Secure user registration and login to personalize the news experience.
- **Daily Trending News**: Aggregates and updates trending news daily, keeping users informed of the latest developments.
- **Category-Based News**: Users can choose from **nine different categories**: General, World, Nation, Business, Health, Technology, Entertainment, Sports, and Science.
- **Saved Articles**: Users can bookmark articles for later reading.
- **News from Multiple Sources**: Collects news from reputable sources via an external API, ensuring diverse perspectives.
- **Headline News**: Displays the most important and impactful news stories of the day.
- **"For You" Section**: Personalized news recommendations based on user preferences.

## 🏗️ Overview
- **Live Demo**: [Link](https://newsoldaggregator.vercel.app/)
- **Backend Repo**: [GitHub](https://github.com/MahmoudMostafaDev/News-Old-Backend)
- **Frontend Repo**: [GitHub](https://github.com/MahmoudMostafaDev/News-Old)

## 🛠️ Tech Stack & Challenges
### **Main Stack: MERN (MongoDB, Express.js, React, Node.js)**
- **React.js**: Frontend UI development with reusable components and state management.
- **Node.js**: Server-side logic and API handling.
- **Express.js**: Simplified routing and API management.
- **MongoDB + Mongoose**: Efficient storage of news articles, user profiles, and saved articles.

### **Additional Tools & Libraries**
- **Axios**: Handles HTTP requests to fetch and store news data.
- **Redux**: Manages global state and ensures predictable data flow.
- **React Router**: Handles routing and navigation.
- **JWT + Bcrypt**: Provides secure authentication and data encryption.

### **Challenge: Overcoming API Limitations**
One of the main challenges was the limited usage of the free news API. Instead of making a new API request every time a user requests news, I implemented a more efficient approach:
✅ The backend **automatically fetches news daily** from the external API.
✅ Retrieves **10 headline news articles per category**, covering all 9 categories.
✅ Similarly, it fetches **regular news articles** in the same way.
✅ This results in **180 fresh news articles stored daily** (90 headline + 90 regular).
✅ Users get served **pre-stored articles directly from the database** instead of making a new API request.

This ensures:
✅ **Efficient API usage** without hitting limits.
✅ **Faster response times** for users.
✅ **Consistent availability** of news, even if the external API experiences downtime.





