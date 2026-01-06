# 📊 Customizable Survey Builder & Analytics Dashboard

A comprehensive full-stack survey management system featuring a **React Native mobile app** for end users, a **React.js admin dashboard** for creating and managing surveys, and a **Node.js/Express + MongoDB backend API**.

## 🎯 Project Overview

This project provides a complete solution for:
- Creating dynamic surveys with multiple question types
- Collecting responses via mobile app
- Real-time analytics and visualizations
- Cross-platform support (iOS, Android, Web)

## 📦 Project Structure

```
survey-builder-system/
├── backend/                 # Node.js + Express + MongoDB API
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Environment variables template
│   └── README.md           # Backend documentation
├── web-dashboard/          # React Admin Dashboard
│   ├── src/
│   │   ├── App.js         # Main dashboard component
│   │   ├── store.js       # Redux store
│   │   └── index.js       # Entry point
│   ├── package.json       # Dashboard dependencies
│   └── README.md          # Dashboard documentation
├── mobile-app/            # React Native Mobile App
│   ├── App.js             # Main app component
│   ├── app.json           # App configuration
│   ├── package.json       # Mobile app dependencies
│   └── README.md          # Mobile app documentation
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (local or Atlas)
- React Native CLI (for mobile development)
- Android Studio (for Android development)

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/jobanjeet22/survey-builder-system.git
cd survey-builder-system
```

#### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and port
npm start
```

#### 3. Setup Web Dashboard
```bash
cd ../web-dashboard
npm install
npm start
```

#### 4. Setup Mobile App
```bash
cd ../mobile-app
npm install
npm run android  # For Android
# or
npm run ios      # For iOS
```

## ✨ Key Features

### Backend API
- ✅ RESTful API with Express.js
- ✅ MongoDB database integration
- ✅ Survey CRUD operations
- ✅ Response collection and storage
- ✅ Analytics data generation
- ✅ Error handling and validation
- ✅ CORS enabled

### Web Dashboard (Admin)
- ✅ Intuitive survey builder interface
- ✅ 5+ question types support
- ✅ Redux state management
- ✅ Real-time analytics with Recharts
- ✅ Response tracking
- ✅ Beautiful Tailwind CSS UI
- ✅ Responsive design

### Mobile App (User)
- ✅ Native iOS & Android experience
- ✅ Survey taking interface
- ✅ Redux state management
- ✅ Pull-to-refresh functionality
- ✅ Material Design UI
- ✅ Offline support
- ✅ Secure data transmission

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Cors** - Cross-origin requests
- **Dotenv** - Environment management

### Web Dashboard
- **React.js** - UI framework
- **Redux** - State management
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Lucide React** - Icons

### Mobile App
- **React Native** - Mobile framework
- **Redux** - State management
- **Axios** - HTTP client
- **AsyncStorage** - Local storage
- **React Navigation** - Navigation

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Key Endpoints

#### Surveys
- `GET /surveys` - Get all surveys
- `POST /surveys` - Create new survey
- `GET /surveys/:id` - Get survey by ID
- `PUT /surveys/:id` - Update survey
- `DELETE /surveys/:id` - Delete survey

#### Responses
- `GET /responses` - Get all responses
- `POST /responses` - Submit survey response
- `GET /responses/:surveyId` - Get responses for specific survey
- `GET /analytics/:surveyId` - Get survey analytics

## 🔐 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/surveyapp
PORT=5000
NODE_ENV=development
```

### For MongoDB Atlas
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/surveyapp
PORT=5000
NODE_ENV=production
```

## 📱 How to Use

### For Admins (Web Dashboard)
1. Navigate to the dashboard
2. Click "Create New Survey"
3. Add survey title and description
4. Add questions (Multiple Choice, Checkbox, Text, Rating)
5. Configure required fields
6. Save the survey
7. Share survey link with users
8. View real-time analytics on the Analytics tab

### For Users (Mobile App)
1. Open the mobile app
2. Browse available surveys
3. Select a survey to take
4. Answer all questions
5. Submit the survey
6. View confirmation message

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd web-dashboard
npm test
```

## 📦 Building for Production

### Build Web Dashboard
```bash
cd web-dashboard
npm run build
```

### Build Mobile APK
```bash
cd mobile-app/android
./gradlew assembleRelease
```

### Deploy Backend
```bash
# Using Heroku
heroku login
heroku create your-survey-api
git push heroku main
```

## 🚢 Deployment

### Deploy Backend to Heroku
1. Create Heroku account
2. Install Heroku CLI
3. Run: `heroku create your-app-name`
4. Set environment variables: `heroku config:set MONGODB_URI=your_uri`
5. Deploy: `git push heroku main`

### Deploy Web Dashboard to Vercel
1. Create Vercel account
2. Connect GitHub repository
3. Deploy with one click

### Build & Release Mobile App
1. Build APK: `cd mobile-app/android && ./gradlew assembleRelease`
2. APK location: `mobile-app/android/app/build/outputs/apk/release/app-release.apk`
3. Upload to Google Play Store or distribute directly

## 📊 Database Schema

### Survey Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  questions: [
    {
      id: String,
      type: String, // "multiple", "checkbox", "text", "rating"
      question: String,
      required: Boolean,
      options: [String]
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Response Model
```javascript
{
  _id: ObjectId,
  surveyId: ObjectId,
  answers: {
    questionId: String | Array | Number
  },
  submittedAt: Date
}
```

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection
- Verify `.env` file exists
- Check if port 5000 is available

### Dashboard not connecting to API
- Ensure backend is running on port 5000
- Check CORS settings in backend
- Verify API URL in dashboard config

### Mobile app crashes
- Clear cache: `npm cache clean --force`
- Reinstall dependencies: `npm install`
- Check Android SDK version

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📞 Support

For support, email jobanjeet22@example.com or open an issue on GitHub.

## 🎉 Acknowledgments

- React and React Native communities
- MongoDB documentation
- Express.js guides
- Tailwind CSS framework
- Recharts library

---

**Made with ❤️ by jobanjeet22**

**GitHub**: [jobanjeet22/survey-builder-system](https://github.com/jobanjeet22/survey-builder-system)
