# Frontend Deployment Guide (Render)

## What's Ready
✅ Frontend configured to use live backend: `https://healthcare-backend-v9rt.onrender.com`
✅ Environment variables set up (`.env.production` included)
✅ Build verified and working

## Deploy to Render (Static Site)

### Step 1: Create a Static Site on Render
1. Go to https://render.com
2. Click **New +** → **Static Site**
3. Connect your GitHub repo (`reshmayadav40/Healthcare-_Appointment`)

### Step 2: Configure the Site
- **Root Directory**: `HelthCare_Web/Healthcare-_Appointment/healthCare`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Advanced** → **Auto-deploy**: Enable (optional, redeploys on push)

### Step 3: Environment Variables (Optional)
The frontend already has `.env.production` configured, but if you need to change the backend URL later:
1. Go to **Settings** → **Environment**
2. Add: `VITE_API_URL` = `https://healthcare-backend-v9rt.onrender.com` (or your backend URL)

### Step 4: Deploy
- Click **Create Static Site**
- Render will build and deploy automatically
- Your site URL will be like: `https://your-app.onrender.com`

## Local Testing Before Deploy
```bash
# Terminal 1: Start local backend
cd backend
npm install
npm start

# Terminal 2: Start frontend dev server
cd healthCare
npm install
npm run dev
# Visit http://localhost:5174
```

## After Deployment
- Test login: Use demo account (test@example.com / 123456) or create a new account
- Search doctors, book appointments, cancel bookings
- Check browser DevTools → Console for any API errors
- Verify all API calls go to: `https://healthcare-backend-v9rt.onrender.com`

## Troubleshooting

### Backend URL not working?
1. Verify backend is running: https://healthcare-backend-v9rt.onrender.com/doctors
2. Check browser console for CORS errors
3. If backend is sleeping (free tier), it will wake up on first request (may take 30 sec)

### Build fails on Render?
- Check **Logs** in Render dashboard
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally to verify first

### API calls failing?
1. Open DevTools → Network tab
2. Check if requests go to `https://healthcare-backend-v9rt.onrender.com`
3. Look for CORS errors or 404 responses
4. Verify backend `/doctors` endpoint is accessible

## Git Push for Frontend
```bash
cd healthCare
git add .
git commit -m "Frontend: Ready for Render deployment with live backend URL"
git push origin main
```

Done! Frontend is deployment-ready. 🚀
