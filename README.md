# Social Media Dashboard - React.js

A professional social media dashboard built with React.js, featuring real-time analytics, post scheduling, and beautiful data visualization with modern animations.

## 🚀 Features

### 📊 Analytics Dashboard

- **Multi-platform Integration**: Twitter, Instagram, and LinkedIn analytics
- **Real-time Data**: Live follower counts, engagement rates, and post performance
- **Interactive Charts**: Beautiful line charts using Chart.js with hover effects
- **Overview Cards**: Quick stats with animated counters and trend indicators

### 📱 Post Management

- **Real API Integration**: Connect to Twitter, Instagram, and LinkedIn APIs
- **Multi-platform Posting**: Post to multiple platforms simultaneously
- **Media Upload**: Support for images and videos with preview
- **Smart Scheduling**: Schedule posts with platform-specific character limits
- **Auto-posting**: Immediate posting or scheduled publishing
- **Post Analytics**: Detailed engagement metrics for each post

### 🎨 Modern UI/UX

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Glass Morphism**: Modern glassmorphism design with backdrop blur effects
- **Smooth Animations**: Framer Motion animations for delightful interactions
- **Component-based**: Modular React components for easy maintenance

### ⚡ Performance & Developer Experience

- **React Hooks**: Modern state management with useState and useEffect
- **Optimized Charts**: Efficient Chart.js integration with react-chartjs-2
- **Auto-refresh**: Data updates every 5 minutes
- **Error Handling**: Graceful error states and loading indicators

## 🛠️ Technology Stack

- **Frontend**: React.js 18 with Hooks
- **Styling**: CSS3 with modern design patterns
- **Charts**: Chart.js with react-chartjs-2
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Date Handling**: date-fns
- **HTTP Client**: Axios for API integration
- **Social Media APIs**: Twitter, Instagram, LinkedIn integration

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd social-media-dashboard-react
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### Dashboard Overview

- View real-time analytics across all social media platforms
- Monitor follower growth and engagement rates
- Track post performance and reach with interactive charts

### Connecting Social Media Accounts

1. Click "Connect Accounts" in the header
2. Connect your Twitter, Instagram, and LinkedIn accounts
3. Authorize the app to post on your behalf
4. Manage your connected accounts

### Creating & Scheduling Posts

1. Click the "Schedule Post" button in the header
2. Select multiple platforms for cross-posting
3. Write your content (with character count limits)
4. Upload media (images/videos) with preview
5. Choose immediate posting or schedule for later
6. Set visibility options (public/private)
7. Submit to post across all selected platforms

### Platform Analytics

- Click on any platform card to view detailed analytics
- Charts show 7-day trends for impressions and reach
- Hover over charts for detailed data points

### Keyboard Shortcuts

- `Ctrl/Cmd + N`: Open schedule post modal
- `Escape`: Close modal

## 📁 Project Structure

```
social-media-dashboard-react/
├── public/
│   └── index.html              # Main HTML file
├── src/
│   ├── components/
│   │   ├── Header.js           # Dashboard header component
│   │   ├── OverviewCards.js    # Statistics cards
│   │   ├── PlatformCards.js    # Platform analytics cards
│   │   ├── PlatformChart.js    # Chart component
│   │   ├── RecentPosts.js      # Recent posts display
│   │   └── ScheduleModal.js    # Post scheduling modal
│   ├── services/
│   │   └── api.js             # API service functions
│   ├── App.js                 # Main app component
│   ├── App.css                # Main app styles
│   ├── index.js               # React entry point
│   └── index.css              # Global styles
├── package.json               # Project dependencies
└── README.md                 # Project documentation
```

## 🔧 API Integration

The dashboard currently uses mock data for demonstration. To integrate with real APIs:

1. **Update API endpoints** in `src/services/api.js`
2. **Replace mock data** with real API calls
3. **Add authentication** for social media platforms
4. **Implement real-time updates** using WebSockets

### Example API Structure

```javascript
// Real API endpoints (replace mock functions)
export const fetchDashboardData = async () => {
  const response = await axios.get("/api/dashboard");
  return response.data;
};

export const schedulePost = async (postData) => {
  const response = await axios.post("/api/schedule-post", postData);
  return response.data;
};
```

## 🎨 Customization

### Colors and Themes

The dashboard uses CSS custom properties for easy theming. Modify the CSS variables:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #28a745;
  --danger-color: #dc3545;
}
```

### Adding New Platforms

1. Add platform data to the mock data in `src/services/api.js`
2. Create platform-specific styling in `src/App.css`
3. Update the `PlatformCards.js` component
4. Add chart creation logic in `PlatformChart.js`

### Component Customization

Each component is modular and can be easily customized:

- **Header.js**: Modify title, date format, or add new actions
- **OverviewCards.js**: Add new statistics cards
- **PlatformCards.js**: Add new social media platforms
- **ScheduleModal.js**: Customize the scheduling form

## 🚀 Deployment

### Development

```bash
npm start
```

### Production Build

```bash
npm run build
```

### Deploy to Netlify/Vercel

```bash
npm run build
# Upload the build folder to your hosting platform
```

### Environment Variables

Create a `.env` file for production settings:

```env
REACT_APP_API_URL=https://your-api.com
REACT_APP_ENVIRONMENT=production
```

## 📈 Future Enhancements

- [ ] Real social media API integration (Twitter, Instagram, LinkedIn)
- [ ] User authentication and accounts
- [ ] Advanced analytics and reporting
- [ ] Bulk post scheduling
- [ ] Content calendar view
- [ ] Export functionality for reports
- [ ] Real-time notifications
- [ ] Dark/Light theme toggle
- [ ] Advanced chart customization
- [ ] Mobile app version (React Native)

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- React.js team for the amazing framework
- Chart.js for beautiful data visualization
- Framer Motion for smooth animations
- React Icons for the icon library
- date-fns for date handling

---

**Built with ❤️ using React.js**
