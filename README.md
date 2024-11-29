# 📸 Social Photo Sharing Application

## 🌟 Project Overview

A modern full-stack social photo sharing application featuring:
- Next.js 14
- Prisma ORM
- NextAuth Authentication
- Uploadthing for Image Uploads
- Shadcn UI for Component Styling
- PostgreSQL Database
- GitHub OAuth Provider

## 🛠 Tech Stack

- **Frontend**: Next.js, React
- **Styling**: Shadcn UI, Tailwind CSS
- **Authentication**: NextAuth with GitHub Provider
- **Image Uploads**: Uploadthing
- **Database**: Prisma ORM with PostgreSQL
- **State Management**: React Hooks

## 📋 Prerequisites

Ensure you have:
- Node.js (v18+)
- npm or Yarn
- PostgreSQL installed
- GitHub Account for OAuth

## 🚀 Setup Instructions

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd Photp-App-test
```

### 2. Environment Configuration
Create `.env` file with:
```plaintext
# Database Connection
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"

# GitHub OAuth
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# NextAuth
AUTH_SECRET=your_generated_secret_key

# Uploadthing
UPLOADTHING_TOKEN=
```

### 3. Install Dependencies
```bash
npm install
# or
yarn install
```

### 4. Database Setup
```bash
# Generate Prisma Client
npx prisma generate

# Run Migrations
npx prisma migrate dev

# Optional: Seed initial data
npx prisma db seed
```

### 5. Uploadthing Configuration
1. Create account at [Uploadthing](https://uploadthing.com)
2. Get API keys
3. Configure in `uploadthing.ts`

### 6. Shadcn UI Setup
```bash
# Install Shadcn CLI
npx shadcn-ui@latest init
```

### 7. Run Development Server
```bash
npm run dev
# or
yarn dev
```

## 🔐 Authentication Flow
- GitHub OAuth Login
- Session Management with NextAuth
- Protected Routes
- User Profile Creation

## 🖼 Image Upload Features
- Drag and Drop Uploads
- Image Preview
- Size and Type Validation
- Direct Upload to Cloud Storage

## 📸 Key Features
- Photo Sharing
- Commenting
- User Profiles
- Responsive Design

## 🛡 Security Considerations
- OAuth Authentication
- Input Validation
- Secure Image Uploads
- Role-Based Access Control

## 📦 Deployment Preparation
- Configure Production Environment Variables
- Set Up PostgreSQL Hosting
- Configure Uploadthing Production Settings

## 🤝 Contributing
1. Fork Repository
2. Create Feature Branch
3. Commit Changes
4. Push to Branch
5. Open Pull Request

## 📬 Support
For issues, please open a GitHub issue or contact support.

## 📄 License
[Your Chosen License]

## 🚨 Troubleshooting
- Verify all environment variables
- Check database connections
- Ensure Uploadthing credentials are correct
- Review Prisma schema compatibility
