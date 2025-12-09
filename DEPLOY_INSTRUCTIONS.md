# 🚀 Quick Deployment Instructions

## Step-by-Step Deployment

### 1️⃣ Deploy Backend (Railway - Easiest)

1. **Go to Railway**
   - Visit: https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your LocalConnect repository
   - Select `backend` as root directory

3. **Add Environment Variables**
   Click "Variables" and add:
   ```
   DATABASE_URL=mysql://user:password@host:port/database
   JWT_SECRET=your-random-secret-key-here
   NODE_ENV=production
   PORT=5001
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

4. **Get Database URL**
   - Option A: Add Railway MySQL plugin
     - Click "New" → "Database" → "MySQL"
     - Copy the `DATABASE_URL` from MySQL service
   
   - Option B: Use PlanetScale (Free)
     - Go to https://planetscale.com
     - Create database
     - Get connection string
     - Use as `DATABASE_URL`

5. **Deploy**
   - Railway will automatically deploy
   - Copy your backend URL (e.g., `https://localconnect-backend.railway.app`)

---

### 2️⃣ Deploy Frontend (Vercel)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your LocalConnect repository
   - Select `frontend` as root directory

3. **Configure Build Settings**
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Add Environment Variable**
   Click "Environment Variables" and add:
   ```
   REACT_APP_API_URL=https://your-backend.railway.app
   ```
   (Use the URL from Step 1)

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit your live site!

---

### 3️⃣ Update Backend CORS

After frontend is deployed:

1. Go back to Railway backend project
2. Update `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
3. Redeploy backend

---

## 🔍 Testing Your Deployment

### Test Backend
Visit: `https://your-backend.railway.app`
Should see: `{"message":"LocalConnect API is running"}`

### Test API Endpoints
- Events: `https://your-backend.railway.app/api/events`
- Should return JSON with events

### Test Frontend
1. Visit your Vercel URL
2. Try to browse events
3. Test signup/login
4. Test booking an event

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: "Cannot connect to database"
**Solution**: 
- Check `DATABASE_URL` format
- Ensure database is running
- Verify credentials

**Problem**: "CORS error"
**Solution**:
- Update `FRONTEND_URL` in backend env variables
- Redeploy backend

**Problem**: "Prisma errors"
**Solution**:
- Check if `npx prisma generate` ran during build
- Manually run: `npx prisma db push` in Railway console

### Frontend Issues

**Problem**: "API calls failing"
**Solution**:
- Verify `REACT_APP_API_URL` is correct
- Check browser console for exact error
- Test backend URL directly

**Problem**: "Build fails"
**Solution**:
- Check for syntax errors
- Verify all dependencies in package.json
- Check build logs in Vercel

**Problem**: "Environment variable not working"
**Solution**:
- Ensure variable starts with `REACT_APP_`
- Redeploy after adding variables
- Clear cache and rebuild

---

## 📝 Environment Variables Summary

### Backend (Railway)
```env
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your-super-secret-key
NODE_ENV=production
PORT=5001
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (Vercel)
```env
REACT_APP_API_URL=https://your-backend.railway.app
```

---

## ✅ Post-Deployment Checklist

- [ ] Backend is accessible
- [ ] Frontend loads
- [ ] Can view events
- [ ] Can signup/login
- [ ] Can book events
- [ ] Can view bookings
- [ ] Organizer can create events
- [ ] Organizer can view attendees
- [ ] Mobile responsive
- [ ] Images load correctly

---

## 🎯 Alternative: Deploy Backend to Vercel

If you prefer Vercel for backend:

1. **Create `vercel.json` in backend** (already created)
2. **Deploy backend to Vercel**
   - Import backend folder
   - Add environment variables
   - Deploy

3. **Note**: Vercel has serverless limitations
   - Better for Railway/Render for persistent connections
   - May need to adjust for serverless functions

---

## 💡 Tips

1. **Use Railway for Backend** - Better for Node.js apps
2. **Use Vercel for Frontend** - Optimized for React
3. **Use PlanetScale for Database** - Free MySQL hosting
4. **Keep Secrets Safe** - Never commit .env files
5. **Test Locally First** - Ensure everything works before deploying

---

## 📞 Need Help?

Common commands:

**Check backend logs (Railway)**:
- Go to Railway dashboard
- Click on your service
- View "Deployments" tab
- Click on latest deployment
- View logs

**Rebuild frontend (Vercel)**:
- Go to Vercel dashboard
- Click on your project
- Go to "Deployments"
- Click "..." → "Redeploy"

**Update environment variables**:
- Railway: Settings → Variables
- Vercel: Settings → Environment Variables
- Remember to redeploy after changes!

---

## 🎉 Success!

Once deployed, share your links:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.railway.app`

**Your LocalConnect app is now live! 🚀**
