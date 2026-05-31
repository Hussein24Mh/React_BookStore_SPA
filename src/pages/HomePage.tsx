import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import {
	BookCardComp,
	BooksFiltersCategoryComp,
	BooksFiltersPriceRangeComp,
	BooksFiltersSidebarComp,
} from "../Components";

import { ProductDetailsPage } from "../pages";

import { useBooksCategoriesQuery, useBooksUniquePricesQuery, useBooksFiltersListQuery } from "../queries";
import { useAddToCartMutation } from "../mutations";

import { useGlobalContext } from "../providers/GlobalStatusProvider";

export function HomePage() {
	const { openModal } = useGlobalContext();
	const { data: categories = [] } = useBooksCategoriesQuery();

	const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
	const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({});

	const [pendingCategory, setPendingCategory] = useState<string | undefined>(undefined);
	const [pendingPriceRange, setPendingPriceRange] = useState<{ min?: number; max?: number }>({});

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const { data: pricesForCategory = [] } = useBooksUniquePricesQuery(selectedCategory);

	const resolvedMin = priceRange.min ?? pricesForCategory[0] ?? 0;
	const resolvedMax = priceRange.max ?? pricesForCategory[pricesForCategory.length - 1] ?? 9999;

	const { data: books, isLoading, error } = useBooksFiltersListQuery(selectedCategory, priceRange);
	const { mutate: addToCart } = useAddToCartMutation();

	const handleApply = () => {
		setSelectedCategory(pendingCategory);
		setPriceRange(pendingPriceRange);
		setIsSidebarOpen(false); // auto-close on mobile after applying
	};

	const handleReset = () => {
		setPendingCategory(undefined);
		// Reset to full range of the currently shown prices (after reset category = undefined)
		const fullRange = {
			min: pricesForCategory[0],
			max: pricesForCategory[pricesForCategory.length - 1],
		};
		setPendingPriceRange(fullRange);
		// Apply immediately
		setSelectedCategory(undefined);
		setPriceRange(fullRange);
		setIsSidebarOpen(false);
	};

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;
	if (!books) return <p>No product found</p>;

	const activeFiltersCount =
		(selectedCategory ? 1 : 0) + (priceRange.min !== undefined || priceRange.max !== undefined ? 1 : 0);

	return (
		<div id="home-page" className="flex gap-5 mx-auto my-5 w-[100%] md:w-[90%] lg:w-[85%] items-start">
			{/* Sidebar (desktop: always visible / mobile: toggled) */}
			<BooksFiltersSidebarComp
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				onApply={handleApply}
				onReset={handleReset} // NEW
				activeFiltersCount={activeFiltersCount} // NEW
				selectedCategory={selectedCategory} // NEW (for display)
				priceRange={priceRange} // NEW (for display)
			>
				{/* Categories section – made scrollable */}
				<div className="flex-1 overflow-y-auto min-h-0">
					<BooksFiltersCategoryComp
						categories={categories}
						selected={pendingCategory ?? categories[0] ?? ""}
						onChange={setPendingCategory}
					/>
				</div>

				{/* Price range section – fixed at bottom */}
				{pricesForCategory.length > 0 && (
					<BooksFiltersPriceRangeComp
						prices={pricesForCategory}
						min={pendingPriceRange.min ?? pricesForCategory[0] ?? 0}
						max={pendingPriceRange.max ?? pricesForCategory[pricesForCategory.length - 1] ?? 9999}
						onChange={setPendingPriceRange}
					/>
				)}
			</BooksFiltersSidebarComp>

			{/* Main content area */}
			<div className="flex-1 flex flex-col gap-6">
				{/* Mobile filter button */}
				<div id="MobileFiltersButton" className="lg:hidden flex justify-start">
					<button
						type="button"
						onClick={() => setIsSidebarOpen(true)}
						className="fixed top-20 left-2 z-10 flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200
                       dark:border-gray-700 text-sm font-medium shadow-sm
                       bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700
                       transition-colors"
					>
						<SlidersHorizontal /> Filters
						{activeFiltersCount > 0 && (
							<span className="ml-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
								{activeFiltersCount}
							</span>
						)}
					</button>
				</div>

				{/* Book grid */}
				<div className="grid grid-cols-[repeat(auto-fill,minmax(260px,260px))] gap-7 justify-center">
					{books.map((book) => (
						<BookCardComp
							key={book.id}
							img_url={book.img_url}
							name={book.name}
							price={book.price}
							add_to_cart={() => addToCart(book.id)}
							on_view_details={() => openModal(<ProductDetailsPage id={book.id} />)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
