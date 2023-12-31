import { AnimatePresence, motion } from "framer-motion";
import { cn } from "~/lib/util";

const scaleCrossFadeVariants = {
  initial: {
    scale: 0.95,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { bounce: 0, duration: 0.2 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, bounce: 0 },
  },
};
export function ScaleCrossFadeContent({
  component,
  id,
}: {
  component: React.ReactNode;
  id: string;
}) {
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        className="relative"
        key={id}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={scaleCrossFadeVariants}
      >
        {component}
      </motion.div>
    </AnimatePresence>
  );
}

const crossFadeVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { bounce: 0, duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, bounce: 0 },
  },
};

export function CrossFadeContent({
  component,
  id,
  className = "",
}: {
  component: React.ReactNode;
  id: string;
  className?: string;
}) {
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        className={cn("relative", className)}
        key={id}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={crossFadeVariants}
      >
        {component}
      </motion.div>
    </AnimatePresence>
  );
}

const crossFadeFastVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { bounce: 0, duration: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1, bounce: 0 },
  },
};

export function CrossFadeContentFast({
  component,
  id,
}: {
  component: React.ReactNode;
  id: string;
}) {
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        className="relative"
        key={id}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={crossFadeFastVariants}
      >
        {component}
      </motion.div>
    </AnimatePresence>
  );
}
