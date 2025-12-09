# ⚡ Deployment Quick Reference

## 🎯 Fastest Way to Deploy

### Backend → Railway (5 minutes)
1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select `backend` folder
4. Add variables:
   - `DATABASE_URL` (from Railway MySQL or PlanetScale)
   - `JWT_SECRET` (any random string)
   - `NODE_ENV=production`
   - `FRONTEND_URL` (add after frontend deployed)
5. Copy backend URL

### Frontend → Vercel (3 minutes)
1. Go to https://vercel.com
2. Import Project → Select `frontend` folder
3. Add variable:
   - `REACT_APP_API_URL` (your Railway backend URL)
4. Deploy
5. Copy frontend URL

### Update Backend
1. Go back to Railway
2. Add `FRONTEND_URL` with your Vercel URL
3. Redeploy

---

## 📋 Environment Variables

### Backend
```
DATABASE_URL=mysql://...
JWT_SECRET=random-secret-key
NODE_ENV=production
PORT=5001
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend
```
REACT_APP_API_URL=https://your-backend.railway.app
```

---

## 🗄️ Database Options

### Option 1: Railway MySQL (Easiest)
- In Railway project: New → Database → MySQL
- Copy `DATABASE_URL` automatically

### Option 2: PlanetScale (Free Forever)
- Go to https://planetscale.com
- Create database
- Get connection string
- Use as `DATABASE_URL`

---

## ✅ Test URLs

After deployment, test:

**Backend Health**:
```
https://your-backend.railway.app
```
Should return: `{"message":"LocalConnect API is running"}`

**Backend API**:
```
https://your-backend.railway.app/api/events
```
Should return: JSON array of events

**Frontend**:
```
https://your-app.vercel.app
```
Should load the home page

---

## 🐛 Quick Fixes

### CORS Error
- Update `FRONTEND_URL` in Railway
- Redeploy backend

### API Not Working
- Check `REACT_APP_API_URL` in Vercel
- Redeploy frontend

### Database Error
- Verify `DATABASE_URL` format
- Check database is running

### Build Failed
- Check logs in Railway/Vercel
- Verify all dependencies installed

---

## 🔄 Update Deployment

### Update Backend Code
1. Push to GitHub
2. Railway auto-deploys

### Update Frontend Code
1. Push to GitHub
2. Vercel auto-deploys

### Update Environment Variables
1. Change in Railway/Vercel dashboard
2. Manually redeploy

---

## 📱 Files Created for Deployment

✅ `backend/vercel.json` - Vercel config
✅ `backend/railway.json` - Railway config
✅ `backend/render.yaml` - Render config
✅ `backend/.env.example` - Environment template
✅ `frontend/.env.example` - Environment template
✅ `frontend/.env.production` - Production config
✅ Updated `server.js` - CORS for production
✅ Updated `package.json` - Build scripts

---

## 🎯 Recommended Stack

**Best Combination**:
- Backend: Railway (easy, free tier)
- Frontend: Vercel (optimized for React)
- Database: PlanetScale (free MySQL)

**Alternative**:
- Backend: Render (free tier)
- Frontend: Vercel
- Database: Railway PostgreSQL

---

## 💰 Cost

**Free Tier Limits**:
- Railway: 500 hours/month, $5 credit
- Vercel: Unlimited deployments
- PlanetScale: 1 database, 5GB storage

**Total Cost**: $0 for small projects!

---

## 🚀 Deploy Now!

1. **Backend**: https://railway.app
2. **Frontend**: https://vercel.com
3. **Database**: https://planetscale.com

**Time to deploy**: ~10 minutes total

---

**Good luck! 🎉**
