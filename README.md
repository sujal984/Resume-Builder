# 🚀 ResumeAI - AI-Powered Resume Builder SaaS

A world-class, production-ready AI-powered Resume Builder platform built with Next.js 16, featuring enterprise-grade authentication, real-time AI suggestions, ATS optimization, and beautiful UI/UX.

## ✨ Features

### 🔐 Enterprise Authentication
- Email/Password with advanced validation
- Password strength indicator (Weak/Fair/Good/Strong)
- Show/Hide password toggle
- OAuth (Google, GitHub)
- Email verification ready
- Forgot password flow ready
- Rate limiting & security

### 🤖 AI-Powered Features
- **AI Resume Summary Generator** - Generate compelling professional summaries
- **AI Bullet Point Rewriter** - Make bullet points more impactful
- **AI Grammar Checker** - Fix grammar and improve clarity
- **ATS Score Calculator** - Get 0-100 ATS compatibility score
- **AI Keyword Optimization** - Optimize for specific job descriptions
- **AI Skill Suggestions** - Get relevant skill recommendations
- **AI Cover Letter Generator** - Generate personalized cover letters
- **Smart Resume Intelligence** - Real-time suggestions and insights

### 📄 Resume Builder Core
- Drag & drop section reordering
- Add/Remove/Collapse sections dynamically
- Multiple resume templates (Modern, Professional, Creative)
- Real-time preview
- Auto-save functionality
- Version history
- Multiple resumes per user

### 🎨 Premium UI/UX
- Ant Design + Tailwind CSS
- Glassmorphism & modern design
- Smooth animations (Framer Motion)
- Skeleton loaders
- Dark/Light theme toggle
- Mobile-first responsive
- Micro-interactions everywhere

### 📊 Export & Sharing
- Export as PDF, DOCX, JSON
- Public/Private sharing links
- Download watermark-free (premium)
- Multiple template layouts

### 💼 SaaS Features
- Free & Premium tiers
- Subscription management ready
- Usage tracking
- Payment integration (Stripe ready)
- Admin panel structure
- Analytics dashboard

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL + Drizzle ORM
- **Authentication:** NextAuth.js v5
- **UI Library:** Ant Design + shadcn/ui
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **AI:** OpenAI GPT-4
- **State Management:** Zustand
- **Payments:** Stripe
- **PDF Generation:** @react-pdf/renderer
- **Drag & Drop:** @dnd-kit

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- OpenAI API key
- Google/GitHub OAuth credentials (optional)

### Setup Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd resume-builder
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/resume_builder"

# Authentication
AUTH_SECRET="your-auth-secret-generate-with-openssl"
AUTH_URL="http://localhost:3000"
AUTH_GOOGLE_ID="your-google-oauth-id"
AUTH_GOOGLE_SECRET="your-google-oauth-secret"
AUTH_GITHUB_ID="your-github-oauth-id"
AUTH_GITHUB_SECRET="your-github-oauth-secret"

# OpenAI
OPENAI_API_KEY="sk-your-openai-api-key"

# Stripe (optional for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
```

4. **Generate AUTH_SECRET**
```bash
openssl rand -base64 32
```

5. **Set up database**
```bash
npx drizzle-kit push
```

6. **Run development server**
```bash
npm run dev
```

7. **Open your browser**
```
http://localhost:3000
```

## 🗄️ Database Schema

The app uses Drizzle ORM with PostgreSQL. Key tables:
- `users` - User accounts
- `accounts` - OAuth provider links
- `sessions` - User sessions
- `resumes` - Resume data
- `resume_versions` - Version history
- `shared_links` - Public sharing

## 🔑 OAuth Setup

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create new OAuth App
3. Set callback URL: `http://localhost:3000/api/auth/callback/github`

## 🤖 OpenAI Setup

1. Sign up at [OpenAI Platform](https://platform.openai.com/)
2. Create an API key
3. Add to `.env.local` as `OPENAI_API_KEY`
4. Ensure you have credits/billing set up

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # Dashboard & editor
│   ├── (marketing)/     # Landing pages
│   └── api/             # API routes
│       ├── ai/          # AI endpoints
│       ├── auth/        # NextAuth
│       └── resumes/     # Resume CRUD
├── components/
│   ├── auth/            # Auth components
│   ├── dashboard/       # Dashboard UI
│   ├── editor/          # Resume editor
│   ├── resume/          # Resume templates
│   ├── ui/              # UI components
│   └── providers/       # Context providers
├── lib/
│   ├── actions/         # Server actions
│   ├── db/              # Database & schema
│   ├── stores/          # Zustand stores
│   └── utils.ts         # Utilities
└── types/               # TypeScript types
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production
- Update `AUTH_URL` to your production domain
- Update OAuth redirect URIs
- Use production database
- Secure all API keys

## 🎯 Roadmap

- [x] Enterprise authentication with Ant Design
- [x] Password strength indicator
- [x] AI resume summary generator
- [x] AI bullet point improver
- [x] ATS score calculator
- [x] AI skill suggestions
- [x] AI cover letter generator
- [x] Beautiful dashboard with resume cards
- [x] AI suggestions panel
- [ ] Email verification system
- [ ] OTP authentication
- [ ] Forgot password flow
- [ ] Resume import from LinkedIn
- [ ] Resume parser (upload existing resume)
- [ ] Multi-language support
- [ ] Admin panel
- [ ] Analytics dashboard
- [ ] Stripe subscription integration
- [ ] Cover letter builder UI
- [ ] Interview question generator
- [ ] Salary insights
- [ ] Resume wizard mode

## 🔒 Security Features

- JWT-based authentication
- Password hashing (bcrypt)
- CSRF protection
- XSS protection
- Rate limiting ready
- Input sanitization
- Secure API key storage
- Server-side AI calls only

## 📝 License

MIT License - feel free to use for personal or commercial projects

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 📧 Support

For issues or questions, please open a GitHub issue.

---

Built with ❤️ using Next.js, TypeScript, and AI
