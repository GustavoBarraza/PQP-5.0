# PQP 5.0 Free Prototype

A complete, navigable prototype of a SaaS freemium platform built with Next.js 16, React 19, and TypeScript. This demo showcases a full user journey from landing page through registration, onboarding, and dashboard experience with modular architecture and upsell flows.

## Overview

PQP 5.0 is a business management platform offering four pricing tiers: Free, Essential, Advanced, and Enterprise. This prototype demonstrates the complete Free tier experience with locked premium features, dedicated module pages, and strategic upgrade prompts.

## Features

### Complete User Flow
- **Landing Page** - Hero section, feature showcase, stats, and CTA
- **Authentication** - Registration and login with validation and context-based state management
- **Onboarding** - 3-step wizard collecting organization profile, interests, and preferences
- **Dashboard** - Free plan with KPI metrics, checklist, and clickable module grid
- **Module Pages** - Dedicated pages for each of the 6 modules (Analytics, Alerts, Automation, Collaboration, Compliance, Reports)
- **Plans Page** - Pricing comparison with monthly/annual toggle
- **Account Center** - Profile, organization, security, notifications, and account management

### Key Functionality
- ✅ Fully navigable end-to-end user journey
- ✅ Modular architecture with dedicated module pages
- ✅ Context-based authentication and user state management
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Interactive components with microinteractions
- ✅ Locked module states with upgrade prompts
- ✅ Clickable module cards that navigate to dedicated pages
- ✅ Upsell modal for premium features
- ✅ Form validation and loading states
- ✅ LocalStorage-based state persistence
- ✅ Confirmation modals for critical actions
- ✅ Progress tracking and stepper components
- ✅ User dropdown menu with logout functionality

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Language**: TypeScript
- **Icons**: Custom SVG icons
- **State**: React Context API + Hooks + LocalStorage

## Getting Started

### Prerequisites
- Node.js 20.9.0+
- npm or yarn

### Installation

1. **Clone or download the project**
   \`\`\`bash
   # Download ZIP from v0 or clone from GitHub
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install react@18.3.1 react-dom@18.3.1

   npm install
   # or
   yarn install
   \`\`\`

3. **Run development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open in browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

## Project Structure

\`\`\`
pqp-free-prototype/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── login/page.tsx           # Login page
│   ├── register/page.tsx        # Registration page
│   ├── onboarding/page.tsx      # 3-step onboarding wizard
│   ├── dashboard/page.tsx       # Free plan dashboard
│   ├── plans/page.tsx           # Pricing comparison
│   ├── account/page.tsx         # Account center
│   ├── modules/                 # Module pages
│   │   ├── analytics/page.tsx   # Analytics module (unlocked)
│   │   ├── alerts/page.tsx      # Alerts module (unlocked)
│   │   ├── automation/page.tsx  # Automation module (locked)
│   │   ├── collaboration/page.tsx # Collaboration module (locked)
│   │   ├── compliance/page.tsx  # Compliance module (locked)
│   │   └── reports/page.tsx     # Reports module (locked)
│   ├── layout.tsx               # Root layout with AuthProvider
│   └── globals.css              # Global styles & design tokens
├── components/
│   ├── auth/
│   │   ├── login-form.tsx       # Login form component
│   │   └── register-form.tsx    # Registration form component
│   ├── cards/
│   │   ├── checklist-card.tsx   # Onboarding checklist
│   │   ├── metric-card.tsx      # KPI metric display
│   │   └── module-card.tsx      # Feature module card (clickable)
│   ├── layout/
│   │   ├── header.tsx           # App header with user dropdown
│   │   └── stepper.tsx          # Progress stepper
│   ├── modals/
│   │   ├── confirm-modal.tsx    # Confirmation dialog
│   │   └── upsell-modal.tsx     # Upgrade prompt modal
│   └── ui/
│       ├── badge.tsx            # Status badges
│       ├── banner.tsx           # Info banners
│       ├── button.tsx           # Button component
│       ├── card.tsx             # Card container
│       ├── checkbox.tsx         # Checkbox input
│       ├── dialog.tsx           # Dialog/modal
│       ├── dropdown-menu.tsx    # Dropdown menu
│       ├── empty.tsx            # Empty state component
│       ├── icons.tsx            # Custom icon components
│       ├── input.tsx            # Text input
│       ├── label.tsx            # Form label
│       ├── progress.tsx         # Progress bar
│       ├── select.tsx           # Dropdown select
│       ├── skeleton.tsx         # Loading skeleton
│       ├── switch.tsx           # Toggle switch
│       ├── table.tsx            # Data table
│       └── tabs.tsx             # Tab navigation
├── lib/
│   ├── auth-context.tsx         # Authentication context provider
│   ├── modules-config.tsx       # Centralized module configuration
│   ├── types.ts                 # TypeScript type definitions
│   └── utils.ts                 # Utility functions
└── README.md
\`\`\`

## Architecture

### Modular Design

The application follows a modular architecture where each feature module has:
- **Dedicated route**: `/modules/{module-name}`
- **Standalone page**: Complete UI for that module
- **Access control**: Based on user's plan tier
- **Upgrade prompts**: For locked modules

### Module Configuration

All modules are centrally configured in `lib/modules-config.tsx`:

\`\`\`typescript
export const MODULES_CONFIG: Module[] = [
  {
    id: "analytics",
    title: "Análisis Avanzado",
    description: "Visualizaciones interactivas y reportes personalizados",
    icon: <ChartBarIcon className="w-6 h-6" />,
    locked: false,
    route: "/modules/analytics",
    requiredPlan: "free",
  },
  // ... more modules
]
\`\`\`

### Authentication Context

User authentication and state management is handled via React Context:

\`\`\`typescript
// lib/auth-context.tsx
export function useAuth() {
  const { user, isAuthenticated, login, logout, updateUser } = useContext(AuthContext)
  return { user, isAuthenticated, login, logout, updateUser }
}
\`\`\`

## User Journey

### 1. Landing Page (`/`)
- Hero section with value proposition
- Feature highlights and stats
- CTA buttons for registration

### 2. Registration (`/register`)
- Email and password signup
- Form validation
- Link to login for existing users

### 3. Onboarding (`/onboarding`)
- **Step 1**: Organization profile (name, size, industry)
- **Step 2**: Interest selection (modules to explore)
- **Step 3**: Alert preferences (email notifications)
- Skip option available

### 4. Dashboard (`/dashboard`)
- Free plan banner with upgrade CTA
- 3 KPI metric cards (registros, usuarios, tiempo)
- Onboarding checklist (5 tasks)
- Module grid (6 modules: 2 unlocked, 4 locked)
- Clickable module cards navigate to dedicated pages
- Locked modules trigger upsell modal

### 5. Module Pages (`/modules/*`)

#### Unlocked Modules (Free Plan):
- **Analytics** (`/modules/analytics`): Full analytics dashboard with charts, metrics, and reports
- **Alerts** (`/modules/alerts`): Alert management with configuration and notification history

#### Locked Modules (Require Upgrade):
- **Automation** (`/modules/automation`): Workflow automation (requires Essential)
- **Collaboration** (`/modules/collaboration`): Team collaboration (requires Essential)
- **Compliance** (`/modules/compliance`): Compliance management (requires Advanced)
- **Reports** (`/modules/reports`): Premium reporting (requires Advanced)

### 6. Plans Page (`/plans`)
- 4 pricing tiers with features
- Monthly/annual billing toggle (20% savings)
- Detailed comparison table
- Upgrade CTAs

### 7. Account Center (`/account`)
- **Profile**: Personal information
- **Organization**: Company details and interests
- **Security**: Password management
- **Notifications**: Alert preferences
- **Account**: Plan info and deletion

## Module System

### Unlocked Modules

Unlocked modules provide full functionality:
- Complete UI with tabs and sections
- Interactive charts and data visualization
- Configuration options
- Export and sharing capabilities

### Locked Modules

Locked modules show upgrade prompts:
- Feature list and benefits
- Required plan badge
- Upgrade CTA buttons
- Return to dashboard option

### Dynamic Module Access

Module access is determined by user's plan:

\`\`\`typescript
export function getUnlockedModules(plan: string): Module[] {
  const planHierarchy = ["free", "essential", "advanced", "enterprise"]
  const userPlanIndex = planHierarchy.indexOf(plan)
  
  return MODULES_CONFIG.map((module) => {
    const modulePlanIndex = planHierarchy.indexOf(module.requiredPlan)
    return {
      ...module,
      locked: modulePlanIndex > userPlanIndex,
    }
  })
}
\`\`\`

## Dummy Data

All data in this prototype is simulated for demonstration purposes:

- **User Data**: Stored in localStorage after registration
- **KPI Metrics**: Hardcoded dummy values with trends
- **Modules**: Predefined list with locked/unlocked states based on plan
- **Plans**: Static pricing and feature information
- **Checklist**: Hardcoded onboarding tasks
- **Analytics Data**: Mock charts and statistics

## Design System

### Colors
- **Primary**: `#2E5BFF` (Blue)
- **Success**: `#22C55E` (Green)
- **Error**: `#EF4444` (Red)
- **Warning**: `#F59E0B` (Orange)
- **Neutrals**: Gray scale from 50-950

### Typography
- **Font Family**: Inter (sans-serif)
- **Headings**: 600-700 weight
- **Body**: 400-500 weight
- **Line Height**: 1.5-1.6 for readability

### Spacing
- Consistent 4px base unit
- Tailwind spacing scale (p-4, gap-6, etc.)

## Key Components

### Module Card (Enhanced)
Display available features with:
- Icon and title
- Description
- Lock state for premium features
- Required plan badge
- Click to navigate to module page
- Hover effects and tooltips

### Upsell Modal
Appears when users try to access locked features. Shows:
- Feature benefits
- Plan comparison
- Upgrade CTA

### User Dropdown
Header dropdown menu with:
- User name display
- Settings link
- Logout option

### Metric Cards
Show KPIs with:
- Current value
- Trend indicator (up/down)
- Percentage change
- Icon representation

### Stepper
Visual progress indicator for:
- Multi-step forms
- Onboarding flow
- Process tracking

## State Management

This prototype uses React Context API and localStorage:

\`\`\`typescript
// Authentication context
const { user, isAuthenticated, login, logout } = useAuth()

// User data stored after registration
localStorage.setItem('user', JSON.stringify(userData))

// Onboarding data collected across steps
localStorage.setItem('onboarding', JSON.stringify(onboardingData))
\`\`\`

## Navigation

The header provides consistent navigation:
- Logo (links to dashboard if authenticated, home otherwise)
- Dashboard link (when logged in)
- Plans link
- User dropdown (profile, settings, logout)
- Plan badge (Free, Essential, Advanced, Enterprise)

## Responsive Design

Breakpoints:
- **Mobile**: < 768px (single column layouts)
- **Tablet**: 768px - 1024px (2-column grids)
- **Desktop**: > 1024px (3-column grids, full features)

## Future Enhancements

To convert this prototype into a production app:

1. **Backend Integration**
   - Replace localStorage with API calls
   - Add authentication (NextAuth.js, Supabase Auth)
   - Connect to database (PostgreSQL, MongoDB)
   - Implement real module functionality

2. **Payment Processing**
   - Integrate Stripe for subscriptions
   - Handle plan upgrades/downgrades
   - Manage billing cycles
   - Add payment history

3. **Real Features**
   - Implement actual analytics with real data
   - Build automation workflows
   - Add team collaboration features
   - Create compliance tracking system
   - Generate real reports with exports

4. **Testing**
   - Unit tests with Jest
   - Integration tests with Playwright
   - E2E testing for user flows
   - Module-specific testing

5. **Performance**
   - Image optimization
   - Code splitting per module
   - Caching strategies
   - Lazy loading for modules

6. **Security**
   - JWT authentication
   - Role-based access control (RBAC)
   - API rate limiting
   - Data encryption

## Deployment

### Vercel (Recommended)
1. Click "Publish" in v0 interface
2. Connect to Vercel account
3. Deploy with one click

### Manual Deployment
\`\`\`bash
npm run build
npm start
\`\`\`

## Troubleshooting

### Module not loading
- Check that the route matches the module configuration
- Verify user's plan allows access to the module
- Clear localStorage and re-login

### Authentication issues
- Clear browser localStorage
- Check AuthProvider is wrapping the app in layout.tsx
- Verify useAuth hook is called within AuthProvider

## Support

For issues or questions about this prototype:
- Review the code comments
- Check component documentation
- Refer to Next.js and React docs
- Examine module configuration in `lib/modules-config.tsx`

## License

This is a prototype/demo application for demonstration purposes.

---

Built with ❤️ using Next.js 16, React 19, and Tailwind CSS v4
