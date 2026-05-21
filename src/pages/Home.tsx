import BookList from "../Components/BookList";

function HomePage() {
	return (
		<div className="flex flex-col p-4 gap-6 mx-auto my-10 rounded background-divs-theme h-fit w-[100%] md:w-[90%] lg:w-[80%]">
			<BookList />
		</div>
	);
}

export default HomePage;
