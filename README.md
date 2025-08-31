# Artist Portfolio & Custom Commissions

A full-stack MERN application for showcasing artworks and managing custom commission requests. This application provides a beautiful, responsive interface for visitors to view artworks and request custom paintings, along with a powerful admin dashboard for artists to manage their portfolio and commissions.

## 🌟 Features

### Public Features
- **Home Page**: Hero section with featured artworks and call-to-action
- **Gallery**: Filterable artwork collection with pagination
- **Artwork Details**: Individual artwork pages with full information
- **Commission System**: Complete commission request form with file uploads
- **About Page**: Artist information and commission process
- **Contact Page**: Contact form for general inquiries
- **Responsive Design**: Mobile-first design with Tailwind CSS

### Admin Features
- **JWT Authentication**: Secure login system for artists
- **Dashboard**: Overview of artworks, commissions, and analytics
- **Artwork Management**: CRUD operations for artworks with image uploads
- **Commission Management**: View and manage commission requests
- **Settings Management**: Configure pricing and business information
- **Real-time Updates**: Live commission notifications

### Technical Features
- **Image Management**: Cloudinary integration for optimized image storage
- **Email Notifications**: Automated emails for commission confirmations
- **Form Validation**: Client and server-side validation
- **Price Calculations**: Dynamic pricing based on size and number of persons
- **Security**: Rate limiting, input sanitization, and CORS protection
- **Testing**: Jest test suite for critical functionality

## 🛠 Technology Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Cloudinary** for image storage and optimization
- **Nodemailer** for email notifications
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **express-rate-limit** for rate limiting
- **helmet** for security headers

### Frontend
- **React 18** with modern hooks
- **React Router v6** for routing
- **React Query** for server state management
- **React Hook Form** for form handling
- **Tailwind CSS** for styling
- **Heroicons** for icons
- **React Hot Toast** for notifications
- **Axios** for API communication

### Development Tools
- **Jest** for testing
- **Nodemon** for development
- **ESLint** for code linting
- **PostCSS** and **Autoprefixer** for CSS processing

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image uploads)
- Email service (Gmail recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd artist-portfolio
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` file in the backend directory:
   ```bash
   cp backend/.env.example backend/.env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/artist-portfolio
   JWT_SECRET=your-super-secure-jwt-secret-key
   JWT_EXPIRES_IN=7d
   CLIENT_URL=http://localhost:3000
   
   # Email Configuration
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-specific-password
   ARTIST_EMAIL=artist@example.com
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

5. **Database Setup**
   
   Seed the database with sample data:
   ```bash
   cd backend
   npm run seed
   ```

6. **Start the development servers**
   
   Backend (in one terminal):
   ```bash
   cd backend
   npm run dev
   ```
   
   Frontend (in another terminal):
   ```bash
   cd frontend
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin Dashboard: http://localhost:3000/login

### Default Admin Credentials
- **Email**: admin@artistportfolio.com
- **Password**: admin123

## 📁 Project Structure

```
artist-portfolio/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   └── server.js        # Express app setup
│   ├── tests/               # Test files
│   ├── .env.example         # Environment template
│   └── package.json
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utility functions
│   │   ├── App.js           # Main app component
│   │   └── index.js         # Entry point
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── package.json
├── docker-compose.yml       # Docker configuration
├── Dockerfile              # Docker image definition
└── README.md               # This file
```

## 🔧 Configuration

### Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an app-specific password
3. Use your Gmail address and app password in the environment variables

### Cloudinary Setup
1. Create a free Cloudinary account
2. Get your cloud name, API key, and API secret from the dashboard
3. Add these credentials to your environment variables

### MongoDB Setup
- **Local MongoDB**: Install MongoDB locally and use `mongodb://localhost:27017/artist-portfolio`
- **MongoDB Atlas**: Create a free cluster and use the connection string

## 🎨 Commission System

The commission system allows customers to:
- Select artwork size (S/M/L) with different pricing multipliers
- Choose medium (oil, watercolor, acrylic, digital)
- Specify number of persons for pricing calculation
- Upload reference images (up to 5 files, 10MB each)
- Provide detailed descriptions and requirements
- Set deadlines and shipping information

### Pricing Formula
```
Total Price = Number of Persons × Rate Per Person × Size Multiplier
```

Default settings:
- Rate per person: $150
- Size multipliers: S=1x, M=1.5x, L=2x

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Server-side validation with express-validator
- **CORS Protection**: Configured for specific origins
- **Helmet.js**: Security headers for Express
- **File Upload Security**: File type and size validation

## 🧪 Testing

Run the test suite:
```bash
cd backend
npm test
```

Tests cover:
- Commission creation and validation
- Price calculation logic
- Email notification handling
- API endpoint functionality

## 🐳 Docker Deployment

### Using Docker Compose

1. **Build and start services**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Application: http://localhost:3000
   - API: http://localhost:5000
   - MongoDB: localhost:27017

### Manual Docker Build

```bash
# Build the image
docker build -t artist-portfolio .

# Run the container
docker run -p 3000:3000 -p 5000:5000 artist-portfolio
```

## 🌐 Deployment Options

### Railway
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy both frontend and backend services

### Render
1. Create web services for frontend and backend
2. Connect to MongoDB Atlas
3. Set environment variables

### Vercel + MongoDB Atlas
1. Deploy frontend to Vercel
2. Deploy backend to Vercel Functions or separate service
3. Use MongoDB Atlas for database

## 📊 API Documentation

### Public Endpoints
- `GET /api/artworks` - Get all visible artworks
- `GET /api/artworks/:id` - Get specific artwork
- `POST /api/commissions` - Create commission request
- `GET /api/commissions/price-calculation` - Calculate commission price
- `GET /api/settings/public` - Get public settings

### Protected Endpoints (Admin)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token
- `GET /api/commissions` - Get all commissions
- `PUT /api/commissions/:id` - Update commission
- `POST /api/artworks` - Create artwork
- `PUT /api/artworks/:id` - Update artwork
- `DELETE /api/artworks/:id` - Delete artwork
- `GET /api/settings` - Get all settings
- `PUT /api/settings` - Update settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🎯 Roadmap

- [ ] Payment integration (Stripe/PayPal)
- [ ] Advanced image gallery with zoom
- [ ] Blog/News section
- [ ] Social media integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app (React Native)

---

**Made with ❤️ for artists and art lovers**
