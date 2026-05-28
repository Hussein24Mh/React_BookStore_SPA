import { BookCardComp } from "../Components";

import { useBooksListQuery } from "../queries";
import { useAddToCartMutation } from "../mutations";

export function HomePage() {
	const { data: books, isLoading, error } = useBooksListQuery();
	const { mutate: addToCart } = useAddToCartMutation();

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error.message}</p>;
	}

	if (!books) return <p>No product found</p>;

	return (
		<div
			id="home-page"
			className="flex flex-col p-4 gap-6 mx-auto my-10 rounded background-divs-theme h-fit w-[100%] md:w-[90%] lg:w-[80%]"
		>
			<div className="grid grid-cols-[repeat(auto-fill,minmax(230px,230px))] gap-10 justify-center">
				{books.map((book) => (
					<BookCardComp
						key={book.id}
						img_url={book.img_url}
						name={book.name}
						price={book.price}
						add_to_cart={() => addToCart(book.id)}
					/>
				))}
			</div>
		</div>
	);
}
