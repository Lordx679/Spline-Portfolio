import { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

export function SplineScene({ onSequenceComplete }: { onSequenceComplete?: () => void }) {
  const [loading, setLoading] = useState(true);
  const [messageIndex, setMessageIndex] = useState(-1);
  const [, setLocation] = useLocation();
  const splineApp = useRef<any>(null);

  const messages = [
    // EDIT ROBOT TEXT HERE:
    // Change the "text" property to update what the robot says.
    // The sequence will automatically repeat.
    { text: "Who am I? I'm Lord, a specialized developer turning 'impossible' ideas into reality.", trigger: "wave" },
    { text: "What do I do? I bridge the gap between automation and immersive web engineering.", trigger: "interact" },
    { text: "I specialize in Discord.js, Node.js, and high-performance React applications.", trigger: "point" },
    { text: "From massive community bots to web experiences, I manifest digital products.", trigger: "spin" },
    { text: "Ready to build your 'impossible' idea? Let's contact on Discord!", trigger: "jump" },
  ];

  function onLoad(spline: any) {
    splineApp.current = spline;
    setLoading(false);
  }

  useEffect(() => {
    if (!loading) {
      let timeout: NodeJS.Timeout;
      
      const showNextMessage = (index: number) => {
        if (index < messages.length) {
          setMessageIndex(index);
          
          // Trigger Spline animation/event if available
          if (splineApp.current && messages[index].trigger) {
            try {
              splineApp.current.emitEvent('mouseHover', messages[index].trigger);
              // Fallback for different spline event names
              splineApp.current.emitEvent('keyDown', messages[index].trigger);
            } catch (e) {
              console.warn("Spline event failed:", e);
            }
          }

          // Trigger Discord profile reveal on the last message if it's the first time
          if (index === messages.length - 1 && onSequenceComplete) {
            onSequenceComplete();
          }

          timeout = setTimeout(() => {
            showNextMessage((index + 1) % messages.length);
          }, 6000);
        }
      };

      timeout = setTimeout(() => showNextMessage(0), 1000);
      return () => clearTimeout(timeout);
    }
  }, [loading, onSequenceComplete]);

  return (
    <div className="w-full h-screen absolute inset-0 z-0 overflow-hidden bg-background">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground font-mono text-sm animate-pulse">Loading Identity...</p>
          </div>
        </div>
      )}

      {/* Speech Bubble */}
      <AnimatePresence mode="wait">
        {messageIndex >= 0 && messageIndex < messages.length && (
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-[30%] left-1/2 -translate-x-1/2 z-30 w-full max-w-[400px] px-4 pointer-events-none"
          >
            <div className="glass-panel p-6 rounded-2xl border-primary/30 text-center">
              <p className="text-white text-lg font-medium leading-relaxed italic">
                "{messages[messageIndex].text}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="w-full h-full"
      >
        <Spline 
          scene="https://prod.spline.design/NXxiJR0LI4j-uoBQ/scene.splinecode"
          onLoad={onLoad}
          className="w-full h-full"
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />
    </div>
  );
}
