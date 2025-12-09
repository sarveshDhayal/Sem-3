# 🚀 Deployment Guide - LocalConnect

## Overview
- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Railway/Render (recommended) or Vercel
- **Database**: Use PlanetScale (MySQL) or Railway PostgreSQL

---

## 📋 Pre-Deployment Checklist

### Backend Preparation
- [ ] Environment variables configured
- [ ] Database connection string ready
- [ ] CORS settings updated for production
- [ ] JWT secret configured
- [ ] Port configuration for hosting platform

### Frontend Preparation
- [ ] API URL updated to production backend
- [ ] Environment variables configured
- [ ] Build tested locally
- [ ] Routes configured properly

---

## 🗄️ Option 1: Deploy Backend to Railway (Recommended)

### Step 1: Prepare Backend for Railway

1. **Create `railway.json` in backend folder**
2. **Update `package.json` scripts**
3. **Set up environment variables**

### Step 2: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Select the `backend` folder
7. Add environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `PORT=5001`

8. Railway will automatically:
   - Install dependencies
   - Run Prisma migrations
   - Start the server

9. Copy the generated URL (e.g., `https://your-app.railway.app`)

---

## 🌐 Option 2: Deploy Backend to Render

### Step 1: Prepare Backend

1. Create `render.yaml` in backend folder
2. Update scripts in `package.json`

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com)
2. Sign up/Login
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: localconnect-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install && npx prisma generate && npx prisma db push`
   - **Start Command**: `npm start`

6. Add environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `NODE_ENV=production`

7. Click "Create Web Service"
8. Copy the generated URL

---

## 🎨 Deploy Frontend to Vercel

### Step 1: Update Frontend Configuration

1. **Update API URL in frontend**
2. **Create environment variable**
3. **Test build locally**

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New" → "Project"
4. Import your repository
5. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: build

6. Add environment variable:
   - `REACT_APP_API_URL`: Your backend URL (from Railway/Render)

7. Click "Deploy"
8. Wait for deployment to complete
9. Visit your live site!

---

## 🗄️ Database Options

### Option 1: PlanetScale (MySQL - Free Tier)

1. Go to [planetscale.com](https://planetscale.com)
2. Create account
3. Create new database
4. Get connection string
5. Update `DATABASE_URL` in backend

### Option 2: Railway PostgreSQL

1. In Railway project, click "New"
2. Select "Database" → "PostgreSQL"
3. Copy connection string
4. Update Prisma schema to use PostgreSQL
5. Update `DATABASE_URL`

### Option 3: Render PostgreSQL

1. In Render dashboard, click "New +"
2. Select "PostgreSQL"
3. Create database
4. Copy connection string
5. Update `DATABASE_URL`

---

## 📝 Configuration Files

I'll create all necessary configuration files for you.

---

## 🔧 Environment Variables

### Backend (.env)
```
DATABASE_URL="your-database-url"
JWT_SECRET="your-super-secret-jwt-key-change-this"
NODE_ENV="production"
PORT=5001
FRONTEND_URL="https://your-frontend.vercel.app"
```

### Frontend (.env)
```
REACT_APP_API_URL="https://your-backend.railway.app"
```

---

## ✅ Post-Deployment Checklist

- [ ] Backend is accessible (test with `/api/events`)
- [ ] Frontend loads correctly
- [ ] Login/Signup works
- [ ] Events display properly
- [ ] Booking functionality works
- [ ] Images load correctly
- [ ] Mobile responsive
- [ ] CORS configured properly

---

## 🐛 Common Issues & Solutions

### Issue 1: CORS Error
**Solution**: Update CORS configuration in `server.js`

### Issue 2: Database Connection Failed
**Solution**: Check `DATABASE_URL` format and credentials

### Issue 3: API Calls Failing
**Solution**: Verify `REACT_APP_API_URL` is correct

### Issue 4: Build Fails
**Solution**: Check for missing dependencies or syntax errors

### Issue 5: Prisma Errors
**Solution**: Run `npx prisma generate` and `npx prisma db push`

---

## 📞 Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Check browser console for errors

---

**Good luck with deployment! 🚀**
