# 🍽️ Smart Canteen - Digital Food Ordering System

A modern, full-featured digital canteen management system built with React, Firebase, and Stripe. This application enables students and staff to browse food items, place orders, and manage their cart seamlessly.

## 🌟 Features

### User Features
- **Browse Food Items**: View all available food items with detailed information
- **Food Details**: Check comprehensive details including ingredients, price, and availability
- **Smart Cart System**: Add/remove items with real-time cart updates
- **Secure Checkout**: Integrated Stripe payment gateway for safe transactions
- **Order History**: Track all past and current orders
- **User Authentication**: Secure login/signup with Firebase Authentication
- **Password Recovery**: Reset forgotten passwords easily
- **Profile Management**: Update user information and preferences

### Admin Features
- **Admin Dashboard**: Comprehensive overview of canteen operations
- **Secure Admin Login**: Separate authentication for administrative access
- **Order Management**: View and manage all customer orders
- **Food Management**: Add, update, or remove food items (assumed)

### Technical Features
- **Responsive Design**: Works seamlessly across mobile, tablet, and desktop
- **State Management**: Efficient cart state management with Zustand
- **Real-time Updates**: Firebase integration for live data synchronization
- **Error Handling**: Comprehensive error pages and user feedback
- **Loading States**: Smooth loading indicators for better UX
- **Firebase Hosting**: Optimized deployment configuration

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework (assumed from modern React project)

### Backend & Services
- **Firebase**
  - Authentication (User & Admin)
  - Firestore Database
  - Hosting
- **Stripe** - Payment processing

### State Management
- **Zustand** - Lightweight state management (cartStore.js)

### Code Quality
- **ESLint** - Code linting and formatting

## 📁 Project Structure

```
smart-canteen-client/
├── public/                  # Static assets
├── src/
│   ├── admin/              # Admin-specific features
│   │   └── pages/
│   │       ├── AdminDashboard/
│   │       └── AdminLogin/
│   ├── assets/             # Images, icons, etc.
│   ├── components/         # Reusable components
│   │   ├── Card/           # Food item cards
│   │   ├── Footer/         # Site footer
│   │   ├── Loader/         # Loading spinner
│   │   ├── Navbar/         # Navigation bar
│   │   └── StripeProvider/ # Stripe integration wrapper
│   ├── config/             # Configuration files
│   │   └── firebase.config.js
│   ├── pages/              # Page components
│   │   ├── AllFood/        # Browse all food items
│   │   ├── Cart/           # Shopping cart
│   │   ├── Checkout/       # Payment & order confirmation
│   │   ├── FoodDetails/    # Individual food item details
│   │   ├── Home/           # Landing page
│   │   ├── Login/          # User authentication
│   │   ├── Signup/         # User registration
│   │   ├── ForgotPassword/ # Password recovery
│   │   ├── Orders/         # Order history
│   │   ├── Profile/        # User profile
│   │   └── Error/          # 404 & error pages
│   ├── Root/               # Root layout component
│   ├── routes/             # Route definitions
│   └── store/              # State management
│       └── cartStore.js    # Cart state with Zustand
├── eslint.config.js        # ESLint configuration
├── firebase.json           # Firebase hosting config
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smart-canteen-client.git
   cd smart-canteen-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore Database
   - Copy your Firebase config
   - Update `src/config/firebase.config.js` with your credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. **Configure Stripe**
   - Get your Stripe publishable key from [Stripe Dashboard](https://dashboard.stripe.com/)
   - Add it to your environment variables or config file

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🔐 Authentication

### User Authentication
- Users can sign up with email and password
- Secure login system with Firebase Authentication
- Password reset functionality via email

### Admin Authentication
- Separate admin login portal
- Role-based access control
- Protected admin routes

## 💳 Payment Integration

The application uses Stripe for secure payment processing:
- Add items to cart
- Proceed to checkout
- Enter payment details
- Complete order with confirmation

## 🎨 Key Components

### Navbar
Global navigation with links to all major sections and cart indicator

### Card
Reusable component for displaying food items in grid/list layouts

### StripeProvider
Wraps the application to enable Stripe functionality

### Loader
Consistent loading UI across the application

### Footer
Site footer with relevant links and information

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktops (1024px and up)
- 🖥️ Large screens (1440px and up)

## 🔒 Security Features

- Firebase Authentication for secure user management
- Protected routes for authenticated users only
- Admin-only routes with role verification
- Secure payment processing through Stripe
- Environment variables for sensitive data

## 🚢 Deployment

### Firebase Hosting

```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy
```

### Other Platforms
The build output in `dist/` folder can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Future Enhancements

- [ ] Real-time order tracking
- [ ] Push notifications for order updates
- [ ] Multiple payment options
- [ ] Food reviews and ratings
- [ ] Search and filter functionality
- [ ] Favorites/Wishlist feature
- [ ] Order scheduling
- [ ] Admin analytics dashboard
- [ ] Inventory management
- [ ] Discount codes and offers

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.



## 🙏 Acknowledgments

- Firebase for backend services
- Stripe for payment processing
- React community for amazing tools and libraries
- All contributors who help improve this project

---

⭐ If you find this project useful, please consider giving it a star on GitHub!

## 📞 Support

For support, open an issue in the GitHub repository.