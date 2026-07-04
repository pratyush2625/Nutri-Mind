# 🧠 Nutri-Mind AI

An AI-powered wellness application that analyzes a user's mood through journal entries and provides personalized food recommendations to improve emotional and physical well-being.

---

## 📖 Overview

Nutri-Mind AI is a full-stack web application that combines **Natural Language Processing (NLP)** and **Nutrition Science** to recommend foods based on a user's emotional state.

Users can write about their day in a journal, and the system analyzes the text to detect their mood. Based on the detected emotion, the application suggests scientifically supported food recommendations along with detailed nutritional information.

The application also maintains a history of previous journal entries and recommendations, allowing users to track their emotional and nutritional patterns over time.

---

## ✨ Features

- 🔐 User Authentication
- 📝 Daily Mood Journaling
- 🤖 AI-Based Mood Analysis
- 🥗 Personalized Food Recommendations
- 📊 Detailed Food Information Dashboard
- 📜 Dynamic Journal History
- 💾 MySQL Database Integration
- 📱 Responsive User Interface

---

## 🏗️ System Architecture

```
User
   │
   ▼
React / Next.js Frontend
   │
   ▼
Node.js Backend (Express)
   │
   ├──────────────► MySQL Database
   │
   ▼
Python AI Backend
   │
   ├── Mood Analysis Model
   ▼
Nutrition Recommendation Model
   │
   ▼
Response returned to User
```

---

## ⚙️ Tech Stack

### Frontend

- React.js
- Next.js
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- Express.js

### AI Backend

- Python
- Flask
- Scikit-Learn
- NLTK
- Pandas
- NumPy

### Database

- MySQL

### Authentication

- Firebase Authentication

### Version Control

- Git
- GitHub

---

## 🧠 Machine Learning Models

### Mood Analysis

A sentiment classification model is used to detect emotions from journal entries.

Possible algorithms:

- Naïve Bayes
- Logistic Regression
- Support Vector Machine (SVM)

---

### Nutrition Recommendation

A recommendation engine maps the detected mood to appropriate food suggestions based on nutritional science.

Example:

| Mood | Suggested Foods |
|------|-----------------|
| 😊 Happy | Fruits, Nuts, Balanced Meals |
| 😞 Sad | Bananas, Yogurt, Lentils |
| 😡 Angry | Chamomile Tea, Avocado, Almonds |
| 😰 Stressed | Oats, Dark Chocolate, Citrus Fruits |

---

## 🔄 Application Workflow

1. User logs into the application.
2. User writes a journal entry.
3. Frontend sends the journal to the backend.
4. Backend forwards the text to the AI model.
5. AI detects the user's mood.
6. Food recommendation model generates suitable food suggestions.
7. Backend stores:
   - Journal
   - Mood
   - Food Recommendations
   - Timestamp
8. Response is returned to the frontend.
9. Dashboard displays recommendations.
10. Journal History updates automatically.

---

## 📂 Project Structure

```
NutriMind-AI
│
├── src/
│   ├── app/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   └── styles/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── ai_backend/
│   ├── models/
│   ├── dataset/
│   ├── app.py
│   └── requirements.txt
│
├── database/
│   └── schema.sql
│
├── public/
│
├── README.md
│
└── package.json
```

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/pratyush2625/NutriMind.git
```

Move into the project directory

```bash
cd NutriMind
```

---

## 📦 Install Dependencies

Frontend

```bash
npm install
```

Backend

```bash
cd backend
npm install
```

Python

```bash
pip install -r requirements.txt
```

---

## 🗄️ Database Setup

Create a MySQL database.

```sql
CREATE DATABASE nutrimind_ai;
```

Import the schema.

```sql
SOURCE database/schema.sql;
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=nutrimind_ai

AI_BACKEND_URL=http://localhost:5001

FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_APP_ID=
```

---

## ▶️ Running the Project

### Start Frontend

```bash
npm run dev
```

### Start Backend

```bash
node server.js
```

### Start AI Backend

```bash
python app.py
```

---

## 📸 Screenshots

Add screenshots of the following pages:

- Home Page
- Login Page
- Journal Page
- Food Recommendation Dashboard
- History Page
- Profile Page

---

## 🎯 Future Improvements

- Voice Journal Support
- OCR Food Scanner
- Weekly Mood Analytics
- Personalized Diet Charts
- Health Report Generation
- AI Nutrition Chatbot
- Wearable Device Integration
- Sleep Tracking
- Multi-language Support

---

## 👨‍💻 Author

**Pratyush Singh**

B.Tech Computer Science (Data Science)

GitHub: https://github.com/pratyush2625

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create your feature branch.

```bash
git checkout -b feature/feature-name
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push to the branch.

```bash
git push origin feature/feature-name
```

5. Open a Pull Request.

---

## 📄 License

This project is intended for educational and research purposes.

---

⭐ If you found this project useful, consider giving it a star on GitHub.
