import axios from "axios";

// Social Media API Configuration
const API_CONFIG = {
  twitter: {
    baseURL: "https://api.twitter.com/2",
    endpoints: {
      post: "/tweets",
      user: "/users/me",
      followers: "/users/me/followers",
      analytics: "/tweets/search/recent",
    },
  },
  instagram: {
    baseURL: "https://graph.instagram.com/v12.0",
    endpoints: {
      post: "/me/media",
      user: "/me",
      followers: "/me/followers",
      analytics: "/me/insights",
    },
  },
  linkedin: {
    baseURL: "https://api.linkedin.com/v2",
    endpoints: {
      post: "/ugcPosts",
      user: "/me",
      followers: "/connections",
      analytics: "/organizationalEntityShareStatistics",
    },
  },
};

// Authentication tokens (in production, these would be stored securely)
let authTokens = {
  twitter: null,
  instagram: null,
  linkedin: null,
};

// Initialize API clients
const createApiClient = (platform) => {
  const config = API_CONFIG[platform];
  return axios.create({
    baseURL: config.baseURL,
    headers: {
      Authorization: `Bearer ${authTokens[platform]}`,
      "Content-Type": "application/json",
    },
  });
};

// Twitter API Functions
export const twitterApi = {
  // Authenticate with Twitter
  authenticate: async (code) => {
    try {
      // In production, this would use OAuth 2.0 flow
      const response = await axios.post("/api/auth/twitter", { code });
      authTokens.twitter = response.data.access_token;
      return response.data;
    } catch (error) {
      console.error("Twitter authentication failed:", error);
      throw error;
    }
  },

  // Post to Twitter
  createPost: async (content, media = null) => {
    try {
      const client = createApiClient("twitter");
      const postData = {
        text: content,
      };

      if (media) {
        // Handle media upload first
        const mediaId = await twitterApi.uploadMedia(media);
        postData.media = { media_ids: [mediaId] };
      }

      const response = await client.post(
        API_CONFIG.twitter.endpoints.post,
        postData
      );
      return response.data;
    } catch (error) {
      console.error("Twitter post failed:", error);
      throw error;
    }
  },

  // Upload media to Twitter
  uploadMedia: async (mediaFile) => {
    try {
      const client = createApiClient("twitter");
      const formData = new FormData();
      formData.append("media", mediaFile);

      const response = await client.post("/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.media_id_string;
    } catch (error) {
      console.error("Twitter media upload failed:", error);
      throw error;
    }
  },

  // Get Twitter analytics
  getAnalytics: async (tweetId) => {
    try {
      const client = createApiClient("twitter");
      const response = await client.get(
        `/tweets/${tweetId}?tweet.fields=public_metrics`
      );
      return response.data;
    } catch (error) {
      console.error("Twitter analytics failed:", error);
      throw error;
    }
  },
};

// Instagram API Functions
export const instagramApi = {
  // Authenticate with Instagram
  authenticate: async (code) => {
    try {
      const response = await axios.post("/api/auth/instagram", { code });
      authTokens.instagram = response.data.access_token;
      return response.data;
    } catch (error) {
      console.error("Instagram authentication failed:", error);
      throw error;
    }
  },

  // Post to Instagram
  createPost: async (content, media, caption = "") => {
    try {
      const client = createApiClient("instagram");

      // Instagram requires media for posts
      if (!media) {
        throw new Error("Instagram posts require media");
      }

      // Upload media first
      const mediaId = await instagramApi.uploadMedia(media);

      // Create post with media
      const postData = {
        image_url: mediaId,
        caption: content,
        access_token: authTokens.instagram,
      };

      const response = await client.post(
        API_CONFIG.instagram.endpoints.post,
        postData
      );
      return response.data;
    } catch (error) {
      console.error("Instagram post failed:", error);
      throw error;
    }
  },

  // Upload media to Instagram
  uploadMedia: async (mediaFile) => {
    try {
      const client = createApiClient("instagram");
      const formData = new FormData();
      formData.append("source_type", "file");
      formData.append("file", mediaFile);

      const response = await client.post("/media", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.id;
    } catch (error) {
      console.error("Instagram media upload failed:", error);
      throw error;
    }
  },

  // Get Instagram analytics
  getAnalytics: async (mediaId) => {
    try {
      const client = createApiClient("instagram");
      const response = await client.get(
        `/${mediaId}/insights?metric=impressions,reach,engagement`
      );
      return response.data;
    } catch (error) {
      console.error("Instagram analytics failed:", error);
      throw error;
    }
  },
};

// LinkedIn API Functions
export const linkedinApi = {
  // Authenticate with LinkedIn
  authenticate: async (code) => {
    try {
      const response = await axios.post("/api/auth/linkedin", { code });
      authTokens.linkedin = response.data.access_token;
      return response.data;
    } catch (error) {
      console.error("LinkedIn authentication failed:", error);
      throw error;
    }
  },

  // Post to LinkedIn
  createPost: async (content, visibility = "PUBLIC") => {
    try {
      const client = createApiClient("linkedin");

      const postData = {
        author: `urn:li:person:${authTokens.linkedin.user_id}`,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
              text: content,
            },
            shareMediaCategory: "NONE",
          },
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": visibility,
        },
      };

      const response = await client.post(
        API_CONFIG.linkedin.endpoints.post,
        postData
      );
      return response.data;
    } catch (error) {
      console.error("LinkedIn post failed:", error);
      throw error;
    }
  },

  // Get LinkedIn analytics
  getAnalytics: async (postId) => {
    try {
      const client = createApiClient("linkedin");
      const response = await client.get(`/socialMetrics/${postId}`);
      return response.data;
    } catch (error) {
      console.error("LinkedIn analytics failed:", error);
      throw error;
    }
  },
};

// Multi-platform posting function
export const postToMultiplePlatforms = async (
  content,
  platforms,
  media = null
) => {
  const results = {};
  const errors = [];

  for (const platform of platforms) {
    try {
      let result;

      switch (platform) {
        case "twitter":
          result = await twitterApi.createPost(content, media);
          break;
        case "instagram":
          result = await instagramApi.createPost(content, media, content);
          break;
        case "linkedin":
          result = await linkedinApi.createPost(content);
          break;
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }

      results[platform] = result;
    } catch (error) {
      errors.push({ platform, error: error.message });
    }
  }

  return { results, errors };
};

// Get authentication status
export const getAuthStatus = () => {
  return {
    twitter: !!authTokens.twitter,
    instagram: !!authTokens.instagram,
    linkedin: !!authTokens.linkedin,
  };
};

// Clear authentication
export const clearAuth = (platform) => {
  if (platform) {
    authTokens[platform] = null;
  } else {
    authTokens = { twitter: null, instagram: null, linkedin: null };
  }
};
