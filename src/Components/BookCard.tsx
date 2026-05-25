import { ShoppingCart } from "lucide-react";

import { useBookQuery } from "../queries/useBookQueries";

import { useAddToCartMutation } from "../mutations/useCartMutations";

function BookCardComp({ id }: { id: number }) {
	const { mutate: addToCart } = useAddToCartMutation();
	const { data: bookData } = useBookQuery(id);

	const book_img_url = bookData?.["IMG URL"] || "blank img url";
	const book_name = bookData?.["PRODUCT NAME"] || "blank name";
	const book_price = bookData?.PRICE || "blank price";
	const book_availability = bookData?.AVAILABILITY || "blank availability";


	return (
		<div
			className="group relative flex flex-col h-[350px] rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer main-divs-theme"
		>
			<img
				src={book_img_url}
				alt={book_name}
				className="w-full h-60 object-cover"
			/>
			<div className="flex flex-col flex-1 justify-between p-3">
				<h3 className="font-semibold text-sm line-clamp-2 text-center">
					{book_name}
				</h3>
				<div className="flex items-center justify-between mt-2 mx-2 gap-4">
					<span className="text-emerald-500 font-bold text-center">
						{book_price}
					</span>
					<span
						className={`text-xs px-2 py-1 rounded-full ${book_availability === "In Stock" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"}`}
					>
						{book_availability}
					</span>
				</div>
			</div>
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					addToCart(id);
				}}
				className="absolute -top-px -left-px opacity-0 group-hover:opacity-100 transition-opacity w-0 h-0 border-t-[90px] border-r-[90px] border-t-emerald-500 border-r-transparent"
			>
				<span className="absolute top-[-72px] left-[6px] text-white flex items-center justify-center w-[24px] h-[24px] hover:text-slate-800">
					<ShoppingCart size={30} />
				</span>
			</button>
		</div>
	);
}

export default BookCardComp;
