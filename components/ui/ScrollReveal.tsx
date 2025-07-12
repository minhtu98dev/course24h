"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

type ScrollRevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export default function ScrollReveal({
  children,
  delay = 0,
  className,
}: ScrollRevealProps) {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },

          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.7, delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
