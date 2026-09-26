/**
 * PROJECTS
 * --------
 * Add, remove or reorder projects here. Components never hardcode project content.
 *
 * Fields:
 *   id                 unique slug
 *   name               project name
 *   category           short type label, e.g. "E-commerce Platform"
 *   description        one or two sentences shown on cards
 *   overview           longer text for the Portfolio page (optional)
 *   highlights         key features, shown on the Portfolio page (optional)
 *   image / imageAlt   preview image (import it from /src/assets/projects)
 *   technologies       list of technology names
 *   liveUrl            deployed site, or null if not deployed
 *   githubUrl          repository, or null if private / not published yet
 *   featured           true = "Featured Projects", false = "Selected Projects"
 *   status             'live' | 'source' | 'in-progress' | 'coming-soon'
 *   role               how the work was done (optional)
 *   technicalDecisions verified decisions only, never invented (optional)
 *   note               small disclaimer shown on the Portfolio page (optional)
 *
 * Image tip: replace the generated SVG previews with real screenshots
 * (about 1200 x 750, .webp) whenever you have them.
 */
import sakiStarsImg from '../assets/projects/saki-stars.svg'
import springFinancialImg from '../assets/projects/spring-financial.svg'
import molassesImg from '../assets/projects/molasses.svg'
import primeLaneImg from '../assets/projects/primelane.webp'
import plumbingImg from '../assets/projects/plumbing.webp'

export const STATUS_LABELS = {
  live: 'Live',
  source: 'Source on GitHub',
  'in-progress': 'In progress',
  'coming-soon': 'Links coming soon',
}

const projects = [
  {
    id: 'saki-stars-fc',
    name: 'Saki Stars FC',
    category: 'Football Club Management Platform',
    description:
      'A full-stack football club management platform designed to bring public club content, player management, staff operations, football competitions and administrative workflows into one system.',
    overview:
      'One repository holds the public club website, a Player Portal for approved players and a Staff Dashboard for club operations. Everything shown on the website comes from the database.',
    highlights: [
      'Public site: teams, players, fixtures and results, match centre, competitions and league tables, news, gallery',
      'Player Portal with profile, team, matches, stats, announcements and documents',
      'Staff Dashboard for club operations, controlled by role, permission and scope',
      'Account area with notifications, sessions, security and privacy settings',
    ],
    image: sakiStarsImg,
    imageAlt: 'Illustrated preview of the Saki Stars FC club website with a pitch graphic, fixtures list and player cards',
    technologies: [
      'React',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'Cloudinary',
      'Resend',
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/abdulrasheed-ayomide/saki-stars-fc',
    featured: true,
    status: 'source',
    // Please confirm or adjust this wording so it describes your role accurately.
    role: 'Full-stack build, developed with AI-assisted tooling.',
    technicalDecisions: [
      'Client (React, Vite, Tailwind CSS, React Router) and REST API (Express, MongoDB/Mongoose) kept in separate folders with separate deployments.',
      'Staff permissions are enforced by role, permission and scope, all checked on the server.',
      'Consistent API responses: every error returns a safe message and a request ID that matches a server log line.',
      'Cookie-based requests must send an X-Requested-With header as a CSRF guard.',
      'Uploads (Cloudinary) and email (Resend) switch off gracefully in development when their keys are missing.',
      'Automated responsive checks cover every public page from 240px to 1920px wide.',
    ],
  },
  {
    id: 'spring-financial-bank',
    name: 'Spring Financial Bank',
    category: 'Banking Application',
    description:
      'A full-stack digital banking application with user accounts, money transfers with PIN confirmation, transaction history and a separate admin dashboard.',
    overview:
      'A fintech portfolio project that models the core flows of a digital bank: sign-up and email verification, dashboards, transfers between accounts, notifications and an admin area with user management and audit logs.',
    highlights: [
      'User registration, login, email verification and password reset',
      'Send Money flow: recipient lookup, preview, then PIN confirmation',
      'Transactions, notifications and profile pages',
      'Admin dashboard: users, transactions and audit logs',
    ],
    image: springFinancialImg,
    imageAlt: 'Illustrated preview of a banking dashboard with a balance card, chart and recent transactions',
    technologies: ['React', 'Vite', 'React Router', 'Axios', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT'],
    liveUrl: null,
    githubUrl: null,
    featured: true,
    status: 'coming-soon',
    note: 'Portfolio project. Spring Financial Bank is not a real or regulated financial institution.',
    technicalDecisions: [
      'User and admin authentication are fully separate: different contexts, sessions and tokens.',
      'Sessions are restored on reload through an httpOnly refresh cookie, and the API client retries once with a fresh token after a 401.',
      'Transfers only move money in the account’s base currency, matching the backend rule.',
      'One API service file per backend resource, so pages never call endpoints directly.',
    ],
  },
  {
    id: 'natural-blackstrap-molasses',
    name: 'Natural Blackstrap Molasses',
    category: 'E-commerce Platform',
    description:
      'A responsive e-commerce storefront for a natural products business, with product search and filtering, a persistent cart and WhatsApp checkout.',
    overview:
      'A real-world storefront that lets customers discover the product, learn about its benefits, build a cart and place an order through WhatsApp without needing a payment gateway.',
    highlights: [
      'Product catalogue with search, category filtering and detail pages',
      'Cart that persists between visits',
      'WhatsApp checkout with a pre-filled order summary',
      'Customer reviews, FAQ and mobile-first layout',
    ],
    image: molassesImg,
    imageAlt: 'Illustrated preview of the Natural Blackstrap Molasses storefront with product bottles and product cards',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Context API', 'Framer Motion'],
    liveUrl: 'https://molasses-shop.vercel.app/',
    githubUrl: 'https://github.com/abdulrasheed-ayomide/natural-blackstrap-molasses',
    featured: true,
    status: 'live',
    technicalDecisions: [
      'Checkout builds and URL-encodes a full order summary, then opens WhatsApp instead of using a payment gateway.',
      'No backend: cart, reviews and theme preference are stored in the browser with localStorage.',
      'Mobile-first layout with skip-to-content link, visible focus states and reduced-motion support.',
    ],
  },
  {
    id: 'primelane',
    name: 'PrimeLane',
    category: 'E-commerce Platform',
    description:
      'An e-commerce web platform with product browsing, cart and checkout flow, using Firebase for authentication and data.',
    image: primeLaneImg,
    imageAlt: 'Screenshot of the PrimeLane e-commerce home page',
    technologies: ['JavaScript', 'Tailwind CSS', 'Firebase Auth', 'Firestore'],
    liveUrl: 'https://primelane-wr.vercel.app/',
    githubUrl: 'https://github.com/abdulrasheed-ayomide/primelane-ecommerce-level2',
    featured: false,
    status: 'live',
  },
  {
    id: 'adeshina-plumbing',
    name: 'Adeshina Plumbing',
    category: 'Service Business Website',
    description:
      'A responsive website for a plumbing service business with service listings, a work showcase and WhatsApp contact.',
    image: plumbingImg,
    imageAlt: 'Screenshot of the Adeshina Plumbing website hero section',
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://abdulrasheed-ayomide.github.io/plumbing-service-website/',
    githubUrl: 'https://github.com/abdulrasheed-ayomide/plumbing-service-website',
    featured: false,
    status: 'live',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const selectedProjects = projects.filter((p) => !p.featured)
export default projects
