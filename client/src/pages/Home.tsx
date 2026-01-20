import { SplineScene } from "../components/SplineScene";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export default function Home() {
  const [showDiscord, setShowDiscord] = useState(false);

  const { data: profile } = useQuery({
    queryKey: [api.discord.profile.path],
    retry: 1,
  });

  const { data: igProfile } = useQuery({
    queryKey: [api.instagram.profile.path],
    retry: 1,
  });

  const defaultProfile = {
    id: "394912002843344898",
    username: "Lord",
    global_name: "Lord",
    avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
    accent_color: 5814783,
  };

  const displayProfile = profile || defaultProfile;
  const avatarUrl = displayProfile.avatar || defaultProfile.avatar;
  const bannerUrl = displayProfile.banner;

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <SplineScene onSequenceComplete={() => setShowDiscord(true)} />

      {/* Discord Profile Widget */}
      <AnimatePresence>
        {showDiscord && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            className="fixed top-6 right-6 z-40 w-64 flex flex-col gap-4"
          >
            {/* Discord Card */}
            <div className="glass-panel overflow-hidden rounded-xl border-primary/20 bg-black/60 backdrop-blur-md shadow-2xl">
              {/* Compact Banner */}
              <div 
                className="h-12 w-full bg-primary/20 relative" 
                style={{ 
                  backgroundColor: displayProfile.accent_color ? `#${displayProfile.accent_color.toString(16).padStart(6, '0')}` : undefined,
                  backgroundImage: bannerUrl ? `url(${bannerUrl})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {!bannerUrl && !displayProfile.accent_color && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20" />
                )}
              </div>
              
              <div className="px-3 pb-3">
                {/* Smaller Avatar */}
                <div className="relative -mt-6 mb-2">
                  <img 
                    src={avatarUrl} 
                    alt={displayProfile.username}
                    className="h-14 w-14 rounded-full border-2 border-black bg-black shadow-lg"
                  />
                  <div className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-black bg-green-500" />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white truncate leading-tight">
                      {displayProfile.global_name || displayProfile.username}
                    </h3>
                    <p className="text-[10px] font-mono text-muted-foreground truncate">
                      @{displayProfile.username}
                    </p>
                  </div>
                  <button 
                    onClick={() => window.open(`https://discord.com/users/${displayProfile.id}`, '_blank')}
                    className="px-2.5 py-1 rounded-full bg-primary text-[10px] font-bold text-black hover:scale-105 transition-transform active:scale-95"
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>

            {/* Instagram Card */}
            {igProfile && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-3 rounded-xl border-pink-500/20 bg-black/60 backdrop-blur-md shadow-2xl"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                      <img 
                        src={igProfile.profile_pic || ""} 
                        alt={igProfile.username}
                        className="h-10 w-10 rounded-full border-2 border-black bg-black"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate leading-tight">
                        @{igProfile.username}
                      </h4>
                      <p className="text-[9px] text-muted-foreground truncate">
                        Instagram Developer
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.open(`https://instagram.com/${igProfile.username}`, '_blank')}
                    className="px-2 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-[9px] font-bold text-white hover:scale-105 transition-transform active:scale-95"
                  >
                    Follow
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
