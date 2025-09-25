import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export type LayoutProps = {
  children?: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const sidebarWidth = collapsed ? 72 : 264;

  // Lock scroll for mobile sidebar
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex h-full flex-col"
        style={{ width: sidebarWidth }}
      >
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
        />
      </aside>
      {/* Mobile Sidebar Flyout */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative h-full w-72 bg-white shadow-lg"
            >
              <Sidebar
                collapsed={false}
                onToggle={() => setMobileOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Main Content (includes Topbar) */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar: aligns flush with the main area */}
        <Topbar
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed((v) => !v)}
          onHamburger={() => setMobileOpen(true)}
        />
        {/* Main area, add px-4 only on small screens, not for layout */}
        <main className="flex-1 py-6">
          <div className="max-w-screen-2xl mx-auto px-4">
            {children ?? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-40 rounded-2xl border bg-white shadow-sm"
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
export default Layout;
