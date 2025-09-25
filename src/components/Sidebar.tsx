import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ArrowLeftRight,
  WalletMinimal,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type SidebarItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
};

const ITEMS: SidebarItem[] = [
  { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { key: "transactions", label: "Transactions", icon: <ArrowLeftRight size={20} /> },
  { key: "expenses", label: "Expenses", icon: <WalletMinimal size={20} /> },
  { key: "users", label: "Users", icon: <Users size={20} /> },
  { key: "settings", label: "Settings", icon: <Settings size={20} /> },
];

export type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
  activeKey?: string;
  onSelect?: (key: string) => void;
};

export function Sidebar({ collapsed, onToggle, activeKey = "dashboard", onSelect }: SidebarProps) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 264 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={`h-screen sticky top-0 z-40 flex flex-col border-r bg-gray-100/60 backdrop-blur supports-[backdrop-filter]:bg-gray-100/50`}
    >
      <div className="flex items-center justify-between gap-2 px-3 pt-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="h-9 w-9 shrink-0 rounded-xl bg-black text-white grid place-items-center font-bold">A</div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm font-semibold"
            >
              AttestationHub
            </motion.span>
          )}
        </div>
        <button
          onClick={onToggle}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="mt-4 flex-1">
        <ul className="px-2 space-y-1">
          {ITEMS.map((item) => {
            const isActive = activeKey === item.key;
            return (
              <li key={item.key}>
                <button
                  onClick={() => onSelect?.(item.key)}
                  className={`group relative w-full flex items-center gap-3 rounded-xl px-2 py-2 text-sm transition-colors hover:bg-gray-200 ${
                    isActive ? "bg-white border-l-4 border-black" : ""
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <span className={`grid place-items-center h-8 w-8 shrink-0 rounded-lg ${
                    isActive ? "bg-black text-white" : "bg-gray-200 text-gray-700 group-hover:bg-gray-300"
                  }`}>{item.icon}</span>

                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3">
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-gray-500">
            v0.1.0
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
}

export default Sidebar;


