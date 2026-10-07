# AfterClass AI 🎓

> **Turn what students learn into what they can prove.**  
> An AI-powered Learning-to-Career platform bridging classroom knowledge with real-world skills, dynamic student portfolios, and targeted career matching.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active%20Prototype-success.svg)]()
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Vanilla%20JS-1a56db.svg)]()

---

## 🌟 Key Features

### 🔐 1. Multi-User Authentication & Google OAuth
- **Google OAuth Modal Simulation**: Realistic popup modal allowing account choice (**Adil Khan**, **Priya Sharma**, **Sam Jordan**) or custom Google account entry.
- **Normal Email Sign Up & Sign In**: Full input validation, account registration in local storage, and onboarding routing.
- **Header Persona Switcher**: Instant 1-click dropdown switcher in the top navigation bar to test all student dashboards.

### 📊 2. Dynamic Student Dashboards
Every dashboard dynamically adapts components, metrics, tasks, and recommendations based on the active student profile:
- **👔 MBA & Business Analyst (Adil Khan)**: Business Analytics focus, Porter's 5 Forces case studies, Financial Sensitivity Models, Power BI portfolio score.
- **💻 Computer Science & AI Engineer (Priya Sharma)**: Distributed Database Sharding, PyTorch models, SQL optimization, Docker container workflows.
- **🎨 UI/UX & Product Designer (Sam Jordan)**: Mobile Checkout Figma Redesign, Usability Heuristic Audits, HCI, Design System Token exports.
- **✨ New Student Blank Profile**: Guided onboarding setup cards and clean profile initialization.

### 📓 3. AI Learning & Career Tools
- **AI Notebook**: Upload class notes to get instant summaries, key terms, flashcards, and quizzes.
- **Apply & Build**: Real-world business & technical challenges with AI evaluation and portfolio logging.
- **Portfolio & CV Builder**: Turn verified challenge scores into proof of work and ATS-optimized CVs.
- **Job Description Gap Analysis**: Compare target job descriptions against verified student skill profiles.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System & CSS Variables), JavaScript (ES6+ Modules)
- **State & Storage**: Browser `localStorage` / `sessionStorage` multi-user database engine
- **Authentication**: Simulated Google OAuth 2.0 flow & Email Password Auth Manager
- **Iconography & Fonts**: Inter & DM Sans Google Fonts, UTF-8 Emojis & SVG graphics

---

## 🚀 Quick Start & Local Setup

No node installation build step required! You can run the application locally using any standard static file server:

### Option A: Python HTTP Server (Recommended)
```bash
# Clone the repository
git clone https://github.com/adilkhan2300/brand-IA3.git
cd brand-IA3

# Start HTTP server on port 3000
python -m http.server 3000
```
Open [http://localhost:3000/index.html](http://localhost:3000/index.html) in your browser.

### Option B: Node http-server / serve
```bash
npx serve .
```

---

## 🧪 Testing & Verification

Comprehensive QA test cases have been executed and documented:
- 📊 **Excel Test Sheet**: [`Testing_Sheet.xlsx`](./Testing_Sheet.xlsx)
- 📄 **CSV Test Log**: [`Testing_Sheet.csv`](./Testing_Sheet.csv)

### Tested Scenarios Include:
- `index.html` Landing Page layout, hero section, animated counters, testimonials, and footer links.
- Google OAuth Modal popup and account switching.
- Email Sign Up (`signup.html`) & Sign In (`login.html`).
- 5-Step Onboarding Wizard (`onboarding.html`).
- Dynamic Dashboard rendering for MBA, CS/AI Tech, UI/UX Design, and Blank profiles.
- Profile Page (`profile.html`) dynamic data binding.

---

## 📁 Repository Structure

```
brand-IA3/
├── index.html           # Landing Page with Hero, Features & CTAs
├── login.html           # Log In page with Google OAuth trigger & Quick Start options
├── signup.html          # Sign Up page for new student registration
├── onboarding.html      # 5-Step Profile setup wizard
├── dashboard.html       # Dynamic multi-persona student dashboard
├── profile.html         # User profile details, skills & auth status
├── notebook.html        # AI Notebook with course summary generator
├── focus.html           # Study session focus timer
├── tasks.html           # Daily student task tracker
├── apply.html           # Real-world challenge workspace
├── portfolio.html       # Student portfolio showcase
├── career.html          # Career readiness score & roadmaps
├── jobs.html            # Job description gap analysis tool
├── interview.html       # AI Mock Interview prep workspace
├── cv.html              # CV Builder & ATS optimizer
├── app.js               # Shared App Logic, AuthManager, UserStore & Google OAuth
├── layout.js            # Injected Sidebar, Header, Persona Switcher & AI Fab
├── styles.css           # Core Design System & Vanilla CSS Tokens
├── Testing_Sheet.xlsx   # Official Excel QA Testing Sheet
└── Testing_Sheet.csv    # CSV Backup Test Log
```

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
