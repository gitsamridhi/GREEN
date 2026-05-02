import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

// Session config for iframe context
app.use(
  session({
    secret: process.env.SESSION_SECRET || "green-secret-vibes",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,      // Required for SameSite=None
      sameSite: 'none',  // Required for cross-origin iframe
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    },
  })
);

// Google OAuth Endpoints
app.get("/api/auth/google/url", (req, res) => {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['host'];
  const redirectUri = `${protocol}://${host}/auth/google/callback`;

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || "",
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });

  res.json({ url: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}` });
});

app.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['host'];
  const redirectUri = `${protocol}://${host}/auth/google/callback`;

  try {
    const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    });

    const { id_token, access_token } = tokenResponse.data;

    const userResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const googleUser = userResponse.data;
    
    const isAdmin = googleUser.email === process.env.VITE_ADMIN_EMAIL;

    (req.session as any).user = {
      id: googleUser.sub,
      email: googleUser.email,
      name: googleUser.name,
      avatar: googleUser.picture,
      isAdmin: isAdmin || false
    };

    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
              window.close();
            } else {
              window.location.href = '/marketplace';
            }
          </script>
          <p>Authentication successful. Redirecting...</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).send("Authentication failed");
  }
});

app.get("/api/auth/me", (req, res) => {
  res.json({ user: (req.session as any).user || null });
});

app.post("/api/auth/mock", (req, res) => {
  (req.session as any).user = {
    id: 12345,
    login: "demo_user",
    name: "Demo User",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
    isAdmin: false
  };
  res.json({ success: true, user: (req.session as any).user });
});

app.post("/api/auth/mock-admin", (req, res) => {
  (req.session as any).user = {
    id: 1,
    login: "admin",
    name: "System Admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    isAdmin: true
  };
  res.json({ success: true, user: (req.session as any).user });
});

app.post("/api/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.json({ success: true });
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
