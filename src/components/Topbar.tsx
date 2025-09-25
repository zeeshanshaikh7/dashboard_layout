import React from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Menu,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export type TopbarProps = {
  collapsed: boolean;
  onToggleSidebar: () => void;
  onHamburger?: () => void;
};

export function Topbar({
  collapsed,
  onToggleSidebar,
  onHamburger,
}: TopbarProps) {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="sticky top-0 z-30 h-16 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
    >
      <div className="h-full px-4 flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="hidden lg:inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        <button
          onClick={onHamburger}
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1 flex items-center justify-center lg:justify-start">
          <div className="relative w-full max-w-xl">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              placeholder="Search..."
              className="w-full rounded-xl border bg-white py-2 pl-9 pr-3 text-sm outline-none ring-0 focus:border-gray-300 focus:bg-white"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <button className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-gray-100">
            <img
              src="https://i.pravatar.cc/100?img=5"
              alt="avatar"
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="hidden sm:block text-sm font-medium">Alex</span>
            <ChevronDown size={16} className="hidden sm:block" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}

export default Topbar;
