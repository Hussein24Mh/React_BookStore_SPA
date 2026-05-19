import type { Book } from '../types/Book';

interface Props {
  book: Book;
}

function BookCard({book}: Props){
    return(
        <div className='flex flex-col justify-center p-4'>
            <img src={book["IMG URL"]} alt={book["PRODUCT NAME"]} className='w-30 h-60 object-contain'/>
            <h3>{book["PRODUCT NAME"]}</h3>
            <p>{book.PRICE}</p>
            <span>{book.ID}</span>
            <span>{book.AVAILABILITY}</span>
        </div>
    )
}

export default BookCard;