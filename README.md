# NAIC 2026 - National AI Competition

Official landing page and registration system for the National AI Competition 2026 by Rakan Tutor.

## ✨ Features

- 🎨 **Modern Landing Page** - Beautiful, responsive design with dark mode support
- 📝 **Multi-Step Registration Form** - Intuitive form with auto-save functionality
- 🗄️ **Supabase Backend** - PostgreSQL database with real-time capabilities
- 📊 **Google Sheets Sync** - Automatic data synchronization to Google Sheets
- 📧 **Email Automation** - Confirmation emails via Resend
- 🔒 **Secure & Scalable** - Row-level security and serverless architecture

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for backend features)

### Installation

```sh
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```sh
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🏗️ Tech Stack

### Frontend
- **Vite** - Fast build tool and dev server
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Framer Motion** - Animation library
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Backend
- **Supabase** - Backend-as-a-Service (PostgreSQL + Auth + Storage)
- **Supabase Edge Functions** - Serverless functions (Deno runtime)
- **Google Sheets API** - Data synchronization
- **Resend** - Transactional email service

## 📂 Project Structure

```
rakan-tutor-home/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── v2/             # V2 landing page components
│   │   ├── Hero.tsx        # Hero section
│   │   ├── RegistrationForm.tsx
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   ├── integrations/       # External service integrations
│   │   └── supabase/       # Supabase client & types
│   ├── App.tsx             # Main app component
│   └── index.css           # Global styles
├── supabase/
│   ├── functions/          # Edge Functions
│   │   └── handle-registration/
│   ├── migrations/         # Database migrations
│   └── README.md           # Backend documentation
├── docs/                   # Documentation
│   ├── google-sheets-setup.md
│   └── resend-setup.md
├── public/                 # Static assets
└── .agent/workflows/       # Automation workflows
```

## 🔧 Backend Setup

The registration system includes automated Google Sheets sync and email notifications.

### Quick Setup

1. **Install Supabase CLI**
   ```bash
   brew install supabase/tap/supabase
   ```

2. **Link your project**
   ```bash
   supabase login
   supabase link --project-ref phkkcdimrokfpgxcbbma
   ```

3. **Configure services**
   - Follow [`docs/google-sheets-setup.md`](docs/google-sheets-setup.md) for Google Sheets
   - Follow [`docs/resend-setup.md`](docs/resend-setup.md) for email setup

4. **Set secrets**
   ```bash
   supabase secrets set RESEND_API_KEY=your_key
   supabase secrets set GOOGLE_CREDENTIALS_BASE64=your_credentials
   supabase secrets set GOOGLE_SHEET_ID=your_sheet_id
   ```

5. **Deploy**
   ```bash
   supabase functions deploy handle-registration
   supabase db push
   ```

For detailed instructions, see [`supabase/README.md`](supabase/README.md)

## 🎯 Registration Flow

```
User fills form → Supabase DB → Trigger fires → Edge Function
                                                      ↓
                                            ┌─────────┴─────────┐
                                            ↓                   ↓
                                    Google Sheets         Resend Email
                                    (Data Sync)          (Confirmation)
```

## 🌐 Deployment

The site is deployed on Vercel with automatic deployments from the main branch.

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Configure environment variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
   ```
3. Deploy!

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

## 🧪 Development

### Run Development Server
```bash
npm run dev
```

### Lint Code
```bash
npm run lint
```

### Type Check
```bash
npx tsc --noEmit
```

## 📊 Database Schema

The `registrations` table stores all registration data:

- Team information (name, track, category)
- 4 team members (name, email, phone, IC, school, qualification, graduation date)
- Advisor details (name, email, phone, relationship)
- Metadata (created_at, heard_about)

See migrations in `supabase/migrations/` for full schema.

## 🔐 Security

- **Row Level Security (RLS)** enabled on all tables
- **Public insert** allowed for registrations (no auth required)
- **API keys** stored as encrypted Supabase secrets
- **CORS** configured for Edge Functions
- **Input validation** with Zod schemas

## 📧 Email Template

Confirmation emails include:
- Registration confirmation
- Team details
- Track and category information
- Next steps
- Contact information

Customize the template in `supabase/functions/handle-registration/index.ts`

## 🐛 Troubleshooting

### Frontend Issues
- Clear browser cache and localStorage
- Check console for errors
- Verify environment variables are set

### Backend Issues
- Check Edge Function logs: `supabase functions logs handle-registration`
- Verify secrets are set: `supabase secrets list`
- Test database connection in Supabase dashboard

See [`supabase/README.md`](supabase/README.md) for detailed troubleshooting.

## 📚 Documentation

- [Backend Setup](supabase/README.md)
- [Google Sheets Setup](docs/google-sheets-setup.md)
- [Resend Email Setup](docs/resend-setup.md)
- [Automation Workflow](.agent/workflows/setup-backend-automation.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

© 2026 Rakan Tutor. All rights reserved.

## 🆘 Support

For issues or questions:
- Check the documentation in `/docs`
- Review troubleshooting guides
- Contact the development team

---

**Built with ❤️ for NAIC 2026**
