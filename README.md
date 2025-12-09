# 🧭 Career Compass

> **Personalized Career Guidance System with Real-Time Labor Market Intelligence**

AI-powered career intelligence platform that blends real-time labor market data, personalized recommendations, and curated learning paths to help professionals navigate their career journey with confidence.

---

## ✨ Features

🤖 **AI Career Guidance** - Chat with Claude Sonnet 4 for personalized advice, roadmaps, and learning resources  
🔐 **User Authentication** - Secure JWT-based registration and login system  
🎯 **Personalized Onboarding** - Multi-step interactive flow to capture career stage, skills, interests, and goals  
📊 **Live Dashboard** - Real-time career recommendations, skill gap analysis, and salary trajectories  
🔥 **Market Insights** - Streaming labor market trends, fast-rising roles, and trending skills  
📚 **Learning Paths** - Curated courses from Coursera, edX, O'Reilly matched to your career goals  
💼 **Job Matching** - Live job alerts filtered by your preferences and skill alignment  
🎨 **Modern UI** - Beautiful, responsive interface with glass morphism and smooth animations

---

## 🏗️ Architecture

```
Career-Compass/
├── frontend/          # Next.js 14 + TypeScript + Tailwind CSS
│   ├── app/          # Next.js App Router pages
│   ├── components/   # Reusable React components
│   ├── lib/          # Utilities, types, and helpers
│   └── styles/       # Global styles and CSS
│
├── backend/          # FastAPI + Python
│   ├── app/
│   │   ├── api/     # API route handlers
│   │   ├── core/    # Configuration and settings
│   │   └── main.py  # FastAPI application entry
│   └── pyproject.toml
│
├── data-pipeline/    # Data ingestion workers (planned)
├── infra/           # Docker Compose, CI/CD configs
└── docs/            # API documentation
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Git**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/career-compass.git
cd career-compass
```

### 2️⃣ Start Backend Server

```bash
# From project root
python -m uvicorn backend.app.main:app --reload --port 8000
```

Backend will be available at **http://localhost:8000**

### 3️⃣ Start Frontend Server

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at **http://localhost:3000**

---

## 🎨 Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data Fetching:** SWR, React Query
- **Charts:** Chart.js, React-Chartjs-2
- **Forms:** React Hook Form
- **Icons:** Lucide React

### Backend
- **Framework:** FastAPI
- **Language:** Python 3.11+
- **Server:** Uvicorn
- **Validation:** Pydantic
- **Database:** PostgreSQL (planned)
- **Caching:** Redis (planned)

---

## 📸 Screenshots

### 🏠 Landing Page
Beautiful hero section with live market insights and real-time signals

### 📝 Onboarding Flow
Step-by-step personalized setup to capture your career goals

### 📊 Dashboard
Comprehensive dashboard with recommendations, skill gaps, and learning paths

---

## 🔧 Configuration

### Environment Variables

Create `.env.local` in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### Backend Configuration

Update `backend/app/core/config.py` for custom settings.

---

## 🛣️ Roadmap

- [x] Frontend scaffolding with Next.js
- [x] Backend API with FastAPI
- [x] Dashboard components and UI
- [x] Onboarding flow
- [x] Real-time market insights
- [ ] User authentication & sessions
- [ ] Database integration (PostgreSQL + pgvector)
- [ ] Real data ingestion (RapidAPI, Adzuna, O*NET)
- [ ] ML models for salary prediction
- [ ] Job recommendation engine
- [ ] Production deployment

---

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Health check |
| GET | `/api/v1/insights/highlights` | Market insights |
| GET | `/api/v1/insights/pulse` | Real-time market pulse |
| POST | `/api/v1/profiles` | Create user profile |
| GET | `/api/v1/dashboard` | Dashboard data |
| GET | `/api/v1/recommendations` | Career recommendations |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Hussain**  
Career Compass - Built for the future of work · 2025

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- FastAPI for the blazing-fast backend
- Chart.js for beautiful visualizations
- Tailwind CSS for the utility-first styling

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Developed by ~Syed Sajjad Hussain

</div>
