# ARIS - AI Resource Intelligence System

## Overview

ARIS is a comprehensive skills management and professional development platform designed to help organizations track, analyze, and develop their workforce capabilities.

## 🚀 Features

### Authentication & Security
- ✅ Secure login system with predefined user accounts
- ✅ Session management and protected routes
- ✅ Two-factor authentication support
- ✅ Privacy controls and security settings

### Skills Management
- ✅ Complete CRUD operations for skills tracking
- ✅ Proficiency level management
- ✅ Search and filter capabilities
- ✅ Real-time statistics and analytics

### Certifications
- ✅ Certification tracking with expiry monitoring
- ✅ Status indicators (active/expiring/expired)
- ✅ Add, edit, and delete functionality
- ✅ Automated expiry calculations

### Training & Development
- ✅ Training program management
- ✅ Progress tracking (planned/in-progress/completed)
- ✅ Course provider and category management
- ✅ Duration and scheduling features

### Team Management
- ✅ Team member profiles with Indian names
- ✅ Skills and certification tracking per employee
- ✅ CSV export functionality
- ✅ Department-wise organization

### Analytics & Insights
- ✅ Skills gap analysis
- ✅ Training plan generation
- ✅ Priority-based recommendations
- ✅ Department-specific filtering

### Settings & Configuration
- ✅ Profile management with persistent storage
- ✅ Notification preferences
- ✅ System settings (theme, language, timezone)
- ✅ Integration management
- ✅ Security and privacy controls

## 🔐 Login Credentials

See [LOGIN_CREDENTIALS.md](./LOGIN_CREDENTIALS.md) for valid login information.

**Note:** Demo access has been removed. Use valid credentials from the credentials file.

## 🌏 Localization

- ✅ Indian timezone (IST) support
- ✅ Indian phone number formats  
- ✅ DD/MM/YYYY date format (Indian standard)
- ✅ Multi-language support (English, Hindi, etc.)

## 🛠 Technology Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **UI Framework:** shadcn/ui + Tailwind CSS  
- **State Management:** React Context API
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd skill-spark-96-main

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📱 Usage

1. **Login:** Use credentials from LOGIN_CREDENTIALS.md
2. **Dashboard:** View overview of skills, certifications, and training
3. **Skills:** Add, edit, and manage employee skills
4. **Certifications:** Track certifications and expiry dates
5. **Training:** Manage training programs and progress
6. **Team Overview:** View team member profiles and export data
7. **Skills Gap:** Analyze skill gaps and create training plans
8. **Settings:** Configure profile, notifications, and system preferences

## 🏗 Architecture

### State Management
- Centralized state using React Context API
- Persistent storage with localStorage
- Real-time updates across components

### Authentication Flow
- Protected routes with authentication guards
- Session management with automatic logout
- Secure credential validation

### Data Structure
- Skills with proficiency levels and categories
- Certifications with expiry tracking
- Training programs with status management
- Team member profiles with comprehensive data

## 📊 Reports & Analytics

- **Skills Gap Analysis:** Identify organizational skill needs
- **Training Progress:** Track individual and team development
- **Certification Status:** Monitor certification expiry and renewals
- **Team Performance:** Analyze team capabilities and growth

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Customization
- Themes: Light, Dark, System
- Languages: English, Hindi, Spanish, French, German, Japanese, Chinese
- Date Formats: DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD
- Timezones: IST, EST, CST, MST, PST, UTC, GMT, CET, JST, AEST

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the LOGIN_CREDENTIALS.md for login issues
- Review the Settings page for configuration options
- Verify all features are working as expected

---

**ARIS** - Empowering organizations through intelligent resource management.
