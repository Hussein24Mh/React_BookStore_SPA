import { useState } from "react";

import { BookCardComp } from "../Components";

import { ProductDetailsFeature, FilterMenuFeature } from "../Features";

import { useBooksFiltersListQuery } from "../queries";
import { useAddToCartMutation } from "../mutations";
import { useGlobalContext } from "../providers/GlobalStatusProvider";

export function HomePage() {
	const { openModal } = useGlobalContext();
	const { mutate: addToCart } = useAddToCartMutation();

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
	const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({});

	const { data: booksFilterList, isLoading, error } = useBooksFiltersListQuery(selectedCategory, priceRange);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;
	if (!booksFilterList) return <p>No product found</p>;

	return (
		<div id="home-page" className="flex gap-5 mx-auto my-5 w-full md:w-[90%] lg:w-[85%] items-start">

			<FilterMenuFeature
				isOpen={isSidebarOpen}
				onOpen={() => setIsSidebarOpen(true)}
				onClose={() => setIsSidebarOpen(false)}
				onApply={(category, range) => {
					setSelectedCategory(category);
					setPriceRange(range);
					setIsSidebarOpen(false);
				}}
			/>

			<div className="flex flex-col flex-1 gap-4">

				{/* Book grid */}
				<div className="grid grid-cols-[repeat(auto-fill,minmax(260px,260px))] gap-7 justify-center">
					{booksFilterList.map((book) => (
						<BookCardComp
							key={book.id}
							img_url={book.img_url}
							name={book.name}
							price={book.price}
							add_to_cart={() => addToCart(book.id)}
							on_view_details={() => openModal(<ProductDetailsFeature id={book.id} />)}
						/>
					))}
				</div>
			</div>

		</div>
	);
}
