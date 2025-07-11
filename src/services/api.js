import axios from "axios";

// Mock data for development (in production, this would be real API endpoints)
const mockData = {
  platforms: {
    twitter: {
      followers: 15420,
      following: 892,
      tweets: 1247,
      engagement: 8.5,
      recentPosts: [
        {
          id: 1,
          content: "Just launched our new product! 🚀",
          likes: 234,
          retweets: 45,
          comments: 12,
          date: "2024-01-15",
        },
        {
          id: 2,
          content: "Great feedback from our users today!",
          likes: 189,
          retweets: 23,
          comments: 8,
          date: "2024-01-14",
        },
        {
          id: 3,
          content: "Tech conference was amazing!",
          likes: 156,
          retweets: 34,
          comments: 15,
          date: "2024-01-13",
        },
      ],
      analytics: {
        impressions: [1200, 1350, 1100, 1400, 1600, 1800, 2000],
        engagement: [8.2, 8.7, 7.9, 8.8, 9.1, 8.9, 8.5],
        reach: [5000, 5200, 4800, 5500, 6000, 6500, 7000],
      },
    },
    instagram: {
      followers: 23450,
      following: 1200,
      posts: 456,
      engagement: 12.3,
      recentPosts: [
        {
          id: 1,
          content: "Product showcase",
          likes: 892,
          comments: 67,
          date: "2024-01-15",
        },
        {
          id: 2,
          content: "Behind the scenes",
          likes: 756,
          comments: 45,
          date: "2024-01-14",
        },
        {
          id: 3,
          content: "Team celebration",
          likes: 634,
          comments: 38,
          date: "2024-01-13",
        },
      ],
      analytics: {
        impressions: [8000, 8500, 7800, 9000, 9500, 10000, 11000],
        engagement: [12.1, 12.5, 11.8, 12.8, 13.2, 12.9, 12.3],
        reach: [15000, 16000, 14500, 17000, 18000, 19000, 20000],
      },
    },
    linkedin: {
      followers: 8900,
      connections: 1200,
      posts: 234,
      engagement: 6.8,
      recentPosts: [
        {
          id: 1,
          content: "Industry insights and trends",
          likes: 156,
          comments: 23,
          date: "2024-01-15",
        },
        {
          id: 2,
          content: "Professional development tips",
          likes: 134,
          comments: 18,
          date: "2024-01-14",
        },
        {
          id: 3,
          content: "Company culture highlights",
          likes: 98,
          comments: 12,
          date: "2024-01-13",
        },
      ],
      analytics: {
        impressions: [3000, 3200, 2900, 3400, 3600, 3800, 4000],
        engagement: [6.5, 6.9, 6.2, 7.1, 7.3, 7.0, 6.8],
        reach: [8000, 8500, 7800, 9000, 9500, 10000, 10500],
      },
    },
  },
  overview: {
    totalFollowers: 47770,
    totalPosts: 1937,
    avgEngagement: 9.2,
  },
};

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch dashboard data
export const fetchDashboardData = async () => {
  try {
    // Simulate API call delay
    await delay(800);

    // In production, this would be a real API call
    // const response = await axios.get('/api/dashboard');
    // return response.data;

    return mockData;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error("Failed to fetch dashboard data");
  }
};

// Schedule a post
export const schedulePost = async (postData) => {
  try {
    // Simulate API call delay
    await delay(1000);

    // In production, this would be a real API call
    // const response = await axios.post('/api/schedule-post', postData);
    // return response.data;

    // Simulate success response
    return {
      success: true,
      message: `Post scheduled for ${postData.platform} on ${postData.scheduledDate}`,
      post: postData,
    };
  } catch (error) {
    console.error("Error scheduling post:", error);
    throw new Error("Failed to schedule post");
  }
};

// Fetch platform-specific data
export const fetchPlatformData = async (platform) => {
  try {
    await delay(500);

    // In production, this would be a real API call
    // const response = await axios.get(`/api/platform/${platform}`);
    // return response.data;

    return mockData.platforms[platform];
  } catch (error) {
    console.error(`Error fetching ${platform} data:`, error);
    throw new Error(`Failed to fetch ${platform} data`);
  }
};

// Get analytics data for a specific platform
export const fetchAnalytics = async (platform, timeRange = "7d") => {
  try {
    await delay(600);

    // In production, this would be a real API call with timeRange parameter
    // const response = await axios.get(`/api/analytics/${platform}?range=${timeRange}`);
    // return response.data;

    return mockData.platforms[platform].analytics;
  } catch (error) {
    console.error(`Error fetching ${platform} analytics:`, error);
    throw new Error(`Failed to fetch ${platform} analytics`);
  }
};

// Get recent posts for a specific platform
export const fetchRecentPosts = async (platform, limit = 10) => {
  try {
    await delay(400);

    // In production, this would be a real API call
    // const response = await axios.get(`/api/posts/${platform}?limit=${limit}`);
    // return response.data;

    return mockData.platforms[platform].recentPosts.slice(0, limit);
  } catch (error) {
    console.error(`Error fetching ${platform} posts:`, error);
    throw new Error(`Failed to fetch ${platform} posts`);
  }
};
