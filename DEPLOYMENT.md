# Deployment Guide

This guide covers multiple deployment options for the Artist Portfolio application.

## 🐳 Docker Deployment (Recommended)

### Prerequisites
- Docker and Docker Compose installed
- Cloudinary account
- Email service (Gmail recommended)

### Steps

1. **Clone and configure**
   ```bash
   git clone <repository-url>
   cd artist-portfolio
   ```

2. **Update environment variables in docker-compose.yml**
   Replace the placeholder values with your actual credentials:
   ```yaml
   environment:
     # Email Configuration
     EMAIL_USER: your-actual-email@gmail.com
     EMAIL_PASSWORD: your-app-specific-password
     ARTIST_EMAIL: your-artist-email@example.com
     
     # Cloudinary Configuration
     CLOUDINARY_CLOUD_NAME: your-actual-cloud-name
     CLOUDINARY_API_KEY: your-actual-api-key
     CLOUDINARY_API_SECRET: your-actual-api-secret
   ```

3. **Deploy**
   ```bash
   # Production deployment (backend only)
   docker-compose up -d

   # Development deployment (backend + frontend)
   docker-compose --profile dev up -d
   ```

4. **Access the application**
   - Production: http://localhost:5000 (serves both API and frontend)
   - Development: http://localhost:3000 (frontend) + http://localhost:5000 (API)

### Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build -d

# Access MongoDB shell
docker exec -it artist-portfolio-mongodb mongosh -u admin -p password123

# Backup database
docker exec artist-portfolio-mongodb mongodump --username admin --password password123 --authenticationDatabase admin --db artist-portfolio --out /backup

# Restore database
docker exec -i artist-portfolio-mongodb mongorestore --username admin --password password123 --authenticationDatabase admin --db artist-portfolio /backup/artist-portfolio
```

## ☁️ Cloud Deployment Options

### 1. Railway

**Backend Deployment:**
1. Connect GitHub repository to Railway
2. Create a new service from the backend folder
3. Set environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<secure-random-string>
   JWT_EXPIRES_IN=7d
   CLIENT_URL=<your-frontend-url>
   EMAIL_SERVICE=gmail
   EMAIL_USER=<your-email>
   EMAIL_PASSWORD=<your-app-password>
   ARTIST_EMAIL=<artist-email>
   CLOUDINARY_CLOUD_NAME=<cloudinary-name>
   CLOUDINARY_API_KEY=<cloudinary-key>
   CLOUDINARY_API_SECRET=<cloudinary-secret>
   ```
4. Deploy automatically

**Frontend Deployment:**
1. Create another Railway service for frontend
2. Set build command: `npm run build`
3. Set start command: `npx serve -s build -l $PORT`
4. Set environment variable: `REACT_APP_API_URL=<backend-url>/api`

### 2. Render

**Backend:**
1. Create a new Web Service
2. Connect GitHub repository
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && node src/server.js`
5. Add environment variables (same as Railway)

**Frontend:**
1. Create a new Static Site
2. Set build command: `cd frontend && npm install && npm run build`
3. Set publish directory: `frontend/build`
4. Add environment variable: `REACT_APP_API_URL=<backend-url>/api`

### 3. Vercel + PlanetScale

**Backend (Vercel Functions):**
1. Install Vercel CLI: `npm i -g vercel`
2. Create `vercel.json` in backend folder:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "src/server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "src/server.js"
       }
     ]
   }
   ```
3. Deploy: `vercel --prod`

**Frontend:**
1. Deploy to Vercel: `vercel --prod`
2. Set environment variables in Vercel dashboard

### 4. AWS EC2

**Setup:**
1. Launch an EC2 instance (Ubuntu 20.04 LTS recommended)
2. Install Node.js, Docker, and Docker Compose
3. Clone repository and configure environment variables
4. Run with Docker Compose

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 Database Options

### 1. MongoDB Atlas (Recommended)
1. Create a free cluster at mongodb.com
2. Whitelist your deployment IPs (or 0.0.0.0/0 for development)
3. Create a database user
4. Use the connection string in your environment variables

### 2. Local MongoDB with Docker
Already configured in docker-compose.yml

### 3. Railway PostgreSQL
If you prefer PostgreSQL, you can modify the models to use Sequelize instead of Mongoose.

## 🔒 Security Checklist

### Environment Variables
- [ ] Change default JWT_SECRET to a secure random string
- [ ] Use strong database passwords
- [ ] Set NODE_ENV=production
- [ ] Configure CORS for your domain only

### Database Security
- [ ] Enable authentication
- [ ] Use SSL/TLS connections
- [ ] Regular backups
- [ ] IP whitelisting

### Application Security
- [ ] Rate limiting enabled
- [ ] Input validation active
- [ ] File upload restrictions in place
- [ ] HTTPS enabled (use reverse proxy)

## 🚀 Performance Optimization

### Frontend
- [ ] Enable gzip compression
- [ ] Use CDN for static assets
- [ ] Implement lazy loading for images
- [ ] Bundle size optimization

### Backend
- [ ] Database indexing
- [ ] Response caching
- [ ] Image optimization (Cloudinary handles this)
- [ ] Connection pooling

### Monitoring
- [ ] Error tracking (Sentry recommended)
- [ ] Performance monitoring
- [ ] Uptime monitoring
- [ ] Log aggregation

## 🔧 Environment Variables Reference

### Required Variables
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=<database-connection-string>
JWT_SECRET=<secure-random-string>
JWT_EXPIRES_IN=7d
CLIENT_URL=<frontend-url>

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=<email-address>
EMAIL_PASSWORD=<app-password>
ARTIST_EMAIL=<artist-email>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
```

### Optional Variables
```env
# Rate limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# File uploads
MAX_FILE_SIZE=10485760
MAX_FILES=5

# Email settings
EMAIL_FROM_NAME=Artist Portfolio
```

## 📝 Post-Deployment Steps

1. **Seed the database**
   ```bash
   # If using Docker
   docker exec artist-portfolio-backend npm run seed
   
   # If deployed directly
   npm run seed
   ```

2. **Test the application**
   - [ ] Homepage loads correctly
   - [ ] Gallery displays artworks
   - [ ] Commission form works
   - [ ] Admin login functions
   - [ ] Email notifications work

3. **Configure analytics** (optional)
   - Google Analytics
   - Facebook Pixel
   - Custom event tracking

4. **Set up monitoring**
   - Health check endpoints
   - Error logging
   - Performance metrics

## 🔄 Maintenance

### Regular Tasks
- Database backups (automated recommended)
- Security updates
- Performance monitoring
- Log rotation
- SSL certificate renewal

### Scaling Considerations
- Database read replicas
- CDN for static assets
- Load balancing
- Horizontal scaling with container orchestration

## 🆘 Troubleshooting

### Common Issues

**Database Connection Failed**
- Check MONGODB_URI format
- Verify network access
- Check credentials

**Email Not Sending**
- Verify EMAIL_USER and EMAIL_PASSWORD
- Check Gmail app password setup
- Confirm EMAIL_SERVICE setting

**Images Not Uploading**
- Verify Cloudinary credentials
- Check file size limits
- Confirm network connectivity

**Frontend Build Fails**
- Check Node.js version compatibility
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall

### Debug Commands
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Test database connection
docker exec artist-portfolio-backend npm run test:db

# Test email service
docker exec artist-portfolio-backend npm run test:email

# Health check
curl http://localhost:5000/api/health
```

---

For additional support, please check the main README.md or create an issue in the repository.
