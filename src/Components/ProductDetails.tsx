import { useBookQuery } from "../queries/useBookQueries";

function ProductDetailsComp({ id }: { id: number }) {
	const { data: book, isLoading, error } = useBookQuery(id);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error loading product</p>;
	}

	if (!book) return <p>No product found</p>;

	return (
		<div>
			<h1>{book["PRODUCT NAME"]}</h1>
			<p>{book.UPC}</p>
			<p>Price: ${book.PRICE}</p>
		</div>
	);
}

export default ProductDetailsComp;
