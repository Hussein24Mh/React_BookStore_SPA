import { useBooksListQuery } from "../queries/useBookQueries";
import BookCardComp from "./BookCard";

function BookListComp() {
	const { data: books, isLoading, error } = useBooksListQuery();

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error loading product</p>;
	}

	if (!books) return <p>No product found</p>;

	return (
		<div className="grid grid-cols-[repeat(auto-fill,minmax(230px,230px))] gap-10 justify-center">
			{books.map((book) => (
				<BookCardComp key={book.ID} id={book.ID} />
			))}
		</div>
	);
}

export default BookListComp;
