import { useModalContext } from "../providers";
import { useFilters } from "../hooks";

import { useBooksFiltersListQuery } from "../queries";
import { useAddToCartMutation } from "../mutations";

import { ProductDetailsFeature } from ".";
import { BookCardComp } from "../Components";

export function BooksListFeature() {
	const { openModal } = useModalContext();
	const { mutate: addToCart } = useAddToCartMutation();

	const { filters } = useFilters();

	const { data: booksFilterList, isLoading, error } = useBooksFiltersListQuery(filters);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;
	if (!booksFilterList) return <p>No product found</p>;

	return (
		<>
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
		</>
	);
}
