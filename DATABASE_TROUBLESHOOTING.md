# Database Connection Troubleshooting Guide

## 🚨 Current Issue: Can't reach database server

The error `Can't reach database server at db.njlzydmchpodgshmbajq.supabase.co:5432` indicates a connection problem with your Supabase database.

## 🔧 Quick Fixes

### 1. Check Your Environment Variables

Create or update your `.env.local` file:

```bash
# Database
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.njlzydmchpodgshmbajq.supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### 2. Verify Supabase Project Status

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Check if your project is active
3. Verify the database password
4. Check if your IP is whitelisted

### 3. Test Database Connection

Run the database test script:

```bash
npm run db:test
```

### 4. Reset and Seed Database

If the connection works, reset and seed your database:

```bash
npm run db:reset
```

## 🛠️ Step-by-Step Solution

### Step 1: Install Dependencies
```bash
npm install tsx
```

### Step 2: Test Connection
```bash
npm run db:test
```

### Step 3: Generate Prisma Client
```bash
npm run db:generate
```

### Step 4: Push Schema to Database
```bash
npm run db:push
```

### Step 5: Seed Demo Data
```bash
npm run db:seed
```

### Step 6: Start Development Server
```bash
npm run dev
```

## 🔐 Demo Login Credentials

Once the database is set up, you can use these demo accounts:

- **Producer**: `demo@example.com` / `demo123`
- **Recycler**: `recycler@example.com` / `demo123`  
- **Corporate**: `corporate@example.com` / `demo123`

## 🚀 Fallback Mode

If the database connection continues to fail, the app will automatically fall back to mock authentication in development mode. You can still test the UI and functionality.

## 📞 Common Issues & Solutions

### Issue: "Invalid connection string"
**Solution**: Check your DATABASE_URL format. It should be:
```
postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
```

### Issue: "Authentication failed"
**Solution**: 
1. Verify your database password in Supabase
2. Check if your IP is whitelisted
3. Try resetting your database password

### Issue: "Database does not exist"
**Solution**:
1. Run `npm run db:push` to create tables
2. Run `npm run db:seed` to add demo data

### Issue: "Connection timeout"
**Solution**:
1. Check your internet connection
2. Verify Supabase project is not paused
3. Try connecting from a different network

## 🔍 Debug Commands

```bash
# Test database connection
npm run db:test

# View database in Prisma Studio
npm run db:studio

# Reset database completely
npm run db:reset

# Generate Prisma client
npm run db:generate
```

## 📋 Checklist

- [ ] Environment variables set correctly
- [ ] Supabase project is active
- [ ] Database password is correct
- [ ] IP address is whitelisted
- [ ] Prisma schema is pushed to database
- [ ] Demo data is seeded
- [ ] Development server starts without errors

## 🆘 Still Having Issues?

If you're still experiencing problems:

1. **Check Supabase Status**: Visit [status.supabase.com](https://status.supabase.com)
2. **Review Logs**: Check the browser console and terminal for detailed error messages
3. **Try Different Network**: Sometimes corporate networks block database connections
4. **Contact Support**: Reach out to Supabase support if the issue persists

The app is designed to work with mock data in development mode, so you can continue testing the UI even if the database connection fails.
