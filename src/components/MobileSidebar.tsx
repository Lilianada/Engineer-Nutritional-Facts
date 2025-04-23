import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, setIsOpen, children }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-40 md:hidden">
        {/* Backdrop with dissolve animation */}
        <AnimatePresence>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black bg-opacity-30"
            aria-label="Close customization panel backdrop"
            onClick={() => setIsOpen(false)}
          />
        </AnimatePresence>
        {/* Sliding sidebar panel */}
        <motion.div
          key="mobile-sidebar-panel"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          className="absolute inset-y-0 left-0 w-4/5 max-w-sm h-full bg-white shadow-2xl overflow-y-auto"
          style={{ maxWidth: 400 }}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default MobileSidebar;
