import { useBooksQuery } from "../queries/booksQuery";
import BookCard from "./BookCard";

function BookList() {
	const { data: books, isLoading, error } = useBooksQuery();

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
				<BookCard key={book.ID} book={book} />
			))}
		</div>
	);
}

export default BookList;
