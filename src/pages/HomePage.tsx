import { useState } from "react";

import { useModalContext, useFiltersContext } from "../providers";

import { useBooksFiltersListQuery } from "../queries";
import { useAddToCartMutation } from "../mutations";

import { ProductDetailsFeature, FilterMenuFeature } from "../Features";
import { BookCardComp } from "../Components";

export function HomePage() {
	const { openModal } = useModalContext();
	const { mutate: addToCart } = useAddToCartMutation();

	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

	const { filters } = useFiltersContext();

	const { data: booksFilterList, isLoading, error } = useBooksFiltersListQuery(filters);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;
	if (!booksFilterList) return <p>No product found</p>;

	return (
		<div id="home-page" className="flex gap-10 mx-auto my-10 w-full md:w-[90%] lg:w-[85%] items-start">
			<FilterMenuFeature
				isOpen={isFilterMenuOpen}
				setFilterMenuOn={() => setIsFilterMenuOpen(true)}
				setFilterMenuOff={() => setIsFilterMenuOpen(false)}
			/>

			<div className="flex flex-1 flex-col">
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
