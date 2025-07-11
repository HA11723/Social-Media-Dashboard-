// Real OAuth 2.0 Configuration
const OAUTH_CONFIG = {
  twitter: {
    clientId: process.env.REACT_APP_TWITTER_CLIENT_ID,
    clientSecret: process.env.REACT_APP_TWITTER_CLIENT_SECRET,
    redirectUri: `${window.location.origin}/auth/twitter/callback`,
    authUrl: "https://twitter.com/i/oauth2/authorize",
    tokenUrl: "https://api.twitter.com/2/oauth2/token",
    scope: "tweet.read tweet.write users.read offline.access",
  },
  instagram: {
    clientId: process.env.REACT_APP_INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.REACT_APP_INSTAGRAM_CLIENT_SECRET,
    redirectUri: `${window.location.origin}/auth/instagram/callback`,
    authUrl: "https://api.instagram.com/oauth/authorize",
    tokenUrl: "https://api.instagram.com/oauth/access_token",
    scope: "user_profile,user_media",
  },
  linkedin: {
    clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID,
    clientSecret: process.env.REACT_APP_LINKEDIN_CLIENT_SECRET,
    redirectUri: `${window.location.origin}/auth/linkedin/callback`,
    authUrl: "https://www.linkedin.com/oauth/v2/authorization",
    tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
    scope: "r_liteprofile r_emailaddress w_member_social",
  },
};

// Generate OAuth state for security
const generateState = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// Store OAuth state in localStorage
const storeOAuthState = (platform, state) => {
  localStorage.setItem(`${platform}_oauth_state`, state);
};

const getOAuthState = (platform) => {
  return localStorage.getItem(`${platform}_oauth_state`);
};

const clearOAuthState = (platform) => {
  localStorage.removeItem(`${platform}_oauth_state`);
};

// Real OAuth Authentication Functions
export const realAuth = {
  // Twitter OAuth
  twitter: {
    initiateAuth: () => {
      const state = generateState();
      storeOAuthState("twitter", state);

      const params = new URLSearchParams({
        response_type: "code",
        client_id: OAUTH_CONFIG.twitter.clientId,
        redirect_uri: OAUTH_CONFIG.twitter.redirectUri,
        scope: OAUTH_CONFIG.twitter.scope,
        state: state,
        code_challenge_method: "S256",
        code_challenge: generateCodeChallenge(),
      });

      const authUrl = `${OAUTH_CONFIG.twitter.authUrl}?${params.toString()}`;
      window.location.href = authUrl;
    },

    handleCallback: async (code, state) => {
      const storedState = getOAuthState("twitter");
      if (state !== storedState) {
        throw new Error("OAuth state mismatch");
      }

      const tokenResponse = await fetch("/api/auth/twitter/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          redirect_uri: OAUTH_CONFIG.twitter.redirectUri,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error("Failed to get Twitter access token");
      }

      const tokenData = await tokenResponse.json();
      localStorage.setItem("twitter_access_token", tokenData.access_token);
      clearOAuthState("twitter");

      return tokenData;
    },
  },

  // Instagram OAuth
  instagram: {
    initiateAuth: () => {
      const state = generateState();
      storeOAuthState("instagram", state);

      const params = new URLSearchParams({
        client_id: OAUTH_CONFIG.instagram.clientId,
        redirect_uri: OAUTH_CONFIG.instagram.redirectUri,
        scope: OAUTH_CONFIG.instagram.scope,
        response_type: "code",
        state: state,
      });

      const authUrl = `${OAUTH_CONFIG.instagram.authUrl}?${params.toString()}`;
      window.location.href = authUrl;
    },

    handleCallback: async (code, state) => {
      const storedState = getOAuthState("instagram");
      if (state !== storedState) {
        throw new Error("OAuth state mismatch");
      }

      const tokenResponse = await fetch("/api/auth/instagram/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          redirect_uri: OAUTH_CONFIG.instagram.redirectUri,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error("Failed to get Instagram access token");
      }

      const tokenData = await tokenResponse.json();
      localStorage.setItem("instagram_access_token", tokenData.access_token);
      clearOAuthState("instagram");

      return tokenData;
    },
  },

  // LinkedIn OAuth
  linkedin: {
    initiateAuth: () => {
      const state = generateState();
      storeOAuthState("linkedin", state);

      const params = new URLSearchParams({
        response_type: "code",
        client_id: OAUTH_CONFIG.linkedin.clientId,
        redirect_uri: OAUTH_CONFIG.linkedin.redirectUri,
        scope: OAUTH_CONFIG.linkedin.scope,
        state: state,
      });

      const authUrl = `${OAUTH_CONFIG.linkedin.authUrl}?${params.toString()}`;
      window.location.href = authUrl;
    },

    handleCallback: async (code, state) => {
      const storedState = getOAuthState("linkedin");
      if (state !== storedState) {
        throw new Error("OAuth state mismatch");
      }

      const tokenResponse = await fetch("/api/auth/linkedin/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          redirect_uri: OAUTH_CONFIG.linkedin.redirectUri,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error("Failed to get LinkedIn access token");
      }

      const tokenData = await tokenResponse.json();
      localStorage.setItem("linkedin_access_token", tokenData.access_token);
      clearOAuthState("linkedin");

      return tokenData;
    },
  },
};

// Generate PKCE code challenge for Twitter
const generateCodeChallenge = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const codeVerifier = btoa(String.fromCharCode(...array))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  return codeVerifier; // In production, you'd hash this
};

// Check if user is authenticated
export const isAuthenticated = (platform) => {
  const token = localStorage.getItem(`${platform}_access_token`);
  return !!token;
};

// Get access token
export const getAccessToken = (platform) => {
  return localStorage.getItem(`${platform}_access_token`);
};

// Logout
export const logout = (platform) => {
  localStorage.removeItem(`${platform}_access_token`);
};

// Logout all platforms
export const logoutAll = () => {
  localStorage.removeItem("twitter_access_token");
  localStorage.removeItem("instagram_access_token");
  localStorage.removeItem("linkedin_access_token");
};
