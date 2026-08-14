import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeId: controlledActiveId, onChange, className }: TabsProps) {
  const [internalActiveId, setInternalActiveId] = useState(tabs[0]?.id);
  
  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;
  
  const handleTabClick = (id: string) => {
    if (onChange) onChange(id);
    else setInternalActiveId(id);
  };

  return (
    <div className={cn("flex space-x-1 border-b border-slate-200 dark:border-slate-800", className)}>
      {tabs.map((tab) => {
        const isActive = activeId === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "relative px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none",
              isActive ? "text-primary-600 dark:text-primary-400" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            )}
          >
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-500"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
