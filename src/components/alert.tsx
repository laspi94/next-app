'use client'

import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription, AlertTitle, } from "@/components/ui/alert";

interface BannerProps {
  title?: string,
  message: string | null,
  hiddenDelay?: number,
  showTitle: boolean
}

const motionConfig = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.5 }
}

export function Banner({ title, message, hiddenDelay = 5000, showTitle = true }: BannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (message) {
      setVisible(true)
    }

    timer = setTimeout(() => {
      setVisible(false);
    }, hiddenDelay);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [message]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={motionConfig.initial}
          animate={motionConfig.animate}
          exit={motionConfig.exit}
          transition={motionConfig.transition}>
          <Alert variant="warning" className="mt-2">
            <AlertCircle className="w-100" />
            {showTitle && <AlertTitle>{title}</AlertTitle>}
            <AlertDescription>
              {message}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
