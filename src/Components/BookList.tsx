import useBooks from "../services/useBooks";
import BookCard from "./BookCard";

function BookList() {
	const { books, loading } = useBooks();

	if (loading) return <p>Loading...</p>;

	return (
		<div className="grid grid-cols-[repeat(auto-fill,minmax(230px,230px))] gap-10 justify-center">
			{books.map((book) => (
				<BookCard key={book.ID} book={book} />
			))}
		</div>
	);
}

export default BookList;
