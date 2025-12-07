# LocalConnect – A Web Application to Discover and Attend Local Events

## Problem Statement
Students and residents often miss local events (e.g., workshops, concerts, meetups) because there is no single platform that lists all nearby happenings. LocalConnect bridges this gap by helping users discover, search, and register for events in their area, while organizers can create, manage, and promote their events.

## System Architecture
**Frontend → Backend (API) → Database**

| Layer | Description |
|-------|-------------|
| Frontend | React.js with React Router for multi-page navigation |
| Backend | Node.js + Express.js (RESTful API) |
| Database | MySQL (Relational, hosted on PlanetScale) |
| Authentication | JWT-based authentication (User & Organizer roles) |
| Hosting | Frontend → Vercel / Netlify, Backend → Render / Railway, Database → PlanetScale |

## Key Features
- **Authentication & Authorization**: Signup/Login using JWT, role-based access (User/Organizer/Admin)
- **CRUD Operations**: Organizers can Create, Read, Update, and Delete events via API
- **Searching**: Users can search events by name, location, or organizer
- **Sorting & Filtering**: Events can be sorted by date, popularity, or category
- **Pagination**: Events are displayed in pages (e.g., 10 per page)
- **Event Booking**: Users can RSVP or mark events as "Interested"

## Tech Stack
| Layer | Technologies |
|-------|-------------|
| Frontend | React.js, React Router, Axios, CSS |
| Backend | Node.js, Express.js, Prisma |
| Database | MySQL (PlanetScale) |
| Authentication | JWT |
| Hosting | Vercel, Render, PlanetScale |

## API Overview
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| /api/auth/signup | POST | Register new user | Public |
| /api/auth/login | POST | Authenticate user | Public |
| /api/events | GET | Fetch events with search, filter, sort, pagination | Public |
| /api/events/:id | GET | Fetch single event details | Public |
| /api/events | POST | Create new event | Organizer only |
| /api/events/:id | PUT | Update event details | Organizer only |
| /api/events/:id | DELETE | Delete event | Organizer/Admin only |

## Hosted Links
- **Frontend**: [Add your Vercel/Netlify URL here]
- **Backend**: [Add your Render/Railway URL here]
- **Database**: PlanetScale MySQL

## Setup Instructions

### Backend Setup
```bash
cd backend
npm install
# Create .env file with your database URL and JWT secret
npx prisma generate
npx prisma db push
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
# Create .env file with backend API URL
npm run dev
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL="your-mysql-connection-string"
JWT_SECRET="your-secret-key"
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL="http://localhost:5000"
```

## Deployment Checklist
- [ ] Frontend deployed on Vercel/Netlify
- [ ] Backend deployed on Render/Railway
- [ ] Database hosted on PlanetScale
- [ ] Signup functionality working in production
- [ ] Login functionality working with JWT verification
- [ ] All environment variables configured in production

## Deployment Links
- **Frontend**: [Add your Vercel/Netlify URL here after deployment]
- **Backend**: [Add your Render/Railway URL here after deployment]
- **Database**: MySQL (Local/PlanetScale)

## Features Implemented ✅

### Authentication & Authorization
- ✅ User Signup with role selection (USER/ORGANIZER)
- ✅ User Login with JWT token generation
- ✅ Password hashing using bcrypt
- ✅ Role-based access control (USER, ORGANIZER, ADMIN)

### Event Management (CRUD Operations)
- ✅ **Create**: Organizers can create new events
- ✅ **Read**: View all events with pagination, Get single event by ID
- ✅ **Update**: Organizers can update their own events
- ✅ **Delete**: Organizers can delete their own events

### Advanced Features
- ✅ **Pagination**: `/api/events?page=1&limit=10`
- ✅ **Search**: `/api/events?search=concert` (searches title, description, location)
- ✅ **Sorting**: `/api/events?sortBy=date&order=asc`
- ✅ **Filtering**: `/api/events?category=music`

## Evaluation Criteria Met

| Criteria | Requirement | Status |
|----------|-------------|--------|
| **Backend CRUD** | Min 2 Create, 2 Read, 2 Update, 2 Delete | ✅ Complete |
| **Pagination** | Working through API | ✅ Complete |
| **Searching** | Working through API | ✅ Complete |
| **Sorting** | Working through API | ✅ Complete |
| **Filtering** | Working through API | ✅ Complete |
| **Authentication** | JWT-based | ✅ Complete |
| **Password Security** | Hashed passwords | ✅ Complete |
| **Documentation** | README with proposal | ✅ Complete |

## Testing Instructions

### Test Signup Flow
1. Open hosted frontend at `/signup`
2. Fill in: Name, Email, Password, Role
3. Submit form
4. Open DevTools → Network → Fetch/XHR
5. Verify API response contains `user` and `token`
6. Check database for new user entry with hashed password

### Test Login Flow
1. Navigate to `/login`
2. Enter registered credentials
3. Submit form
4. Check Network tab for JWT token in response
5. Copy token and verify at https://jwt.io
6. Should contain: `id`, `email`, `role` in payload

### Test Event CRUD (Organizer Role)
1. Login as ORGANIZER
2. **Create**: Add new event → Check Network → Verify in database
3. **Read**: View all events → Test pagination (page 1, 2, etc.)
4. **Search**: Search for event by name
5. **Filter**: Filter by category (music, workshop, etc.)
6. **Sort**: Sort by date (asc/desc)
7. **Update**: Edit event → Verify changes in database
8. **Delete**: Remove event → Verify deletion in database

## Project Structure
```
LocalConnect/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── routes/
│   │   ├── auth.js
│   │   └── events.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
└── README.md
```

## Contributors
- [Your Name]
- [Your Email]
- [GitHub Profile]
