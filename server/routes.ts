import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.messages.create.path, async (req, res) => {
    // ... existing message code
  });

  app.get(api.discord.profile.path, async (req, res) => {
    const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
    const DISCORD_USER_ID = process.env.DISCORD_USER_ID;

    if (!DISCORD_TOKEN || !DISCORD_USER_ID) {
      // Fallback/Mock data if not configured yet
      return res.json({
        id: "0",
        username: "Lord",
        discriminator: "0",
        avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
        banner: null,
        accent_color: 5814783,
        global_name: "Lord",
      });
    }

    try {
      const response = await fetch(`https://discord.com/api/v10/users/${DISCORD_USER_ID}`, {
        headers: { Authorization: `Bot ${DISCORD_TOKEN}` },
      });
      const data = await response.json();
      
      // Map Discord API response to our schema if necessary
      res.json({
        id: data.id,
        username: data.username,
        discriminator: data.discriminator,
        avatar: data.avatar ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png` : null,
        banner: data.banner ? `https://cdn.discordapp.com/banners/${data.id}/${data.banner}.png?size=600` : null,
        accent_color: data.accent_color,
        global_name: data.global_name,
      });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch Discord profile" });
    }
  });

  app.get(api.instagram.profile.path, async (req, res) => {
    // Get the Discord profile first to sync the avatar
    const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
    const DISCORD_USER_ID = process.env.DISCORD_USER_ID;
    let syncedAvatar = "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=150&h=150&fit=crop";

    if (DISCORD_TOKEN && DISCORD_USER_ID) {
      try {
        const response = await fetch(`https://discord.com/api/v10/users/${DISCORD_USER_ID}`, {
          headers: { Authorization: `Bot ${DISCORD_TOKEN}` },
        });
        const data = await response.json();
        if (data.avatar) {
          syncedAvatar = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`;
        }
      } catch (err) {
        console.error("Failed to sync IG avatar from Discord:", err);
      }
    }

    res.json({
      username: "lordx679",
      profile_pic: syncedAvatar,
      biography: "Turning impossible ideas into reality.",
      followers_count: 1337
    });
  });

  return httpServer;
}
