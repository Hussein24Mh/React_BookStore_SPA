import useBooks from "../hooks/useBooks";
import BookCard from "./BookCard";

function BookList() {

  const { books, loading } = useBooks();

  if (loading) return <p>Loading...</p>;

  return (

    <div className="grid gird-cols-2 sm:grid-cols-4 book-list">

      {books.map((book) => (<BookCard key={book.ID} book={book} />))}

    </div>


  );
}

export default BookList;