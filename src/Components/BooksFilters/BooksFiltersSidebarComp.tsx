import { ReactNode } from "react";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;                 // NEW
  activeFiltersCount: number;          // NEW
  selectedCategory?: string;           // NEW
  priceRange: { min?: number; max?: number }; // NEW
  children: ReactNode;
}

export function BooksFiltersSidebarComp({
  isOpen,
  onClose,
  onApply,
  onReset,
  activeFiltersCount,
  selectedCategory,
  priceRange,
  children,
}: FilterSidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/40 z-20 lg:hidden backdrop-blur-sm" onClick={onClose} />}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 z-30 flex flex-col
          bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800
          shadow-xl transition-transform duration-300 ease-in-out
          lg:sticky lg:top-0 lg:h-screen lg:shadow-sm
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">Filters</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close filters"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Active filters summary (highlight chosen filters) */}
        {activeFiltersCount > 0 && (
          <div className="px-6 pt-4 text-sm">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Active filters:</p>
            <div className="flex flex-wrap gap-2">
              {selectedCategory && (
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                  Category: {selectedCategory}
                </span>
              )}
              {(priceRange.min !== undefined || priceRange.max !== undefined) && (
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                  Price: ${priceRange.min ?? 0} – ${priceRange.max ?? '∞'}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Scrollable content: categories will grow, price stays at bottom */}
        <div className="flex-1 flex flex-col min-h-0 px-6 py-4 gap-6">
          {children}
        </div>

        {/* Action buttons */}
        <div className="p-6 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
          <button
            onClick={onReset}
            className="w-full py-2.5 rounded-xl border border-gray-300 dark:border-gray-600
                       text-sm font-medium text-gray-700 dark:text-gray-200
                       hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95 transition-all"
          >
            Reset all filters
          </button>
          <button
            onClick={onApply}
            className="w-full py-2.5 rounded-xl bg-primary text-white text-sm font-medium
                       hover:opacity-90 active:scale-95 transition-all"
          >
            Apply filters
          </button>
        </div>
      </aside>
    </>
  );
}