"use client";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface AnimatedImageProps extends ImageProps {}

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

const AnimatedImage = forwardRef<HTMLDivElement, AnimatedImageProps>(
  ({ src, alt }, forwardedRef) => {
    const [isInView, setIsInView] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const internalRef = useRef<HTMLDivElement>(null);

    // Use the useScroll hook outside of useEffect
    const { scrollYProgress } = useScroll({
      target: internalRef, // Use internalRef directly
      offset: ["start end", "end end"],
    });

    // Define the scale transform outside of useEffect
    const scale = useTransform(scrollYProgress, [0, 1], [0.001, 2.5]);

    useEffect(() => {
      if (forwardedRef && typeof forwardedRef === "function") {
        forwardedRef(internalRef.current);
      } else if (forwardedRef && "current" in forwardedRef) {
        forwardedRef.current = internalRef.current;
      }
    }, [internalRef, forwardedRef]);

    return (
      <div className="rounded-lg overflow-hidden h-[400px] w-[300px]">
        <motion.div
          initial={false}
          animate={
            isLoaded && isInView
              ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
              : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
          }
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
          onViewportEnter={() => setIsInView(true)}
          style={{ scale }}
          ref={forwardedRef}
          className="w-full h-full rounded-lg"
        >
          <Image
            src={src}
            alt={alt}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-lg"
            onLoadingComplete={() => setIsLoaded(true)}
          />
        </motion.div>
      </div>
    );
  }
);

export default AnimatedImage;
