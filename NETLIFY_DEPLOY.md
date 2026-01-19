# Netlify Configuration for Lord's Portfolio

## Build Settings
- **Build command:** `npm run build`
- **Publish directory:** `client/dist`

## Environment Variables
Since you're using Netlify for the frontend, you'll need to set these in the Netlify dashboard:
- `VITE_DISCORD_USER_ID`: Your Discord User ID

## Backend Notice
This project uses a Node.js backend for:
1. Live Discord profile updates
2. Message storage (PostgreSQL)

**Netlify is for static hosting.** To keep the backend features, you would need to:
- Deploy the backend separately (e.g., Railway, Render, or keep it on Replit).
- Update `client/src/lib/queryClient.ts` to point to your deployed backend URL.

---
**Recommendation:** 
If you want everything to work "out of the box" with one click, use **Replit's Publish** button. It handles the server and database automatically.
