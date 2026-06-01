import { useBooksListQuery } from "../queries";
import { useAddToCartMutation } from "../mutations";

import { ProductDetailsComp } from "../Components";

interface ProductDetailsPageProps {
	id: number | null;
}

export function ProductDetailsFeature({ id }: ProductDetailsPageProps) {
	const { data: books, isLoading, error } = useBooksListQuery(id ? [id] : []);
	const { mutate: addToCart } = useAddToCartMutation();

	const book = books?.[0];

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error loading product</p>;
	}

	if (!book) return <p>No product found</p>;

	return <ProductDetailsComp {...book} add_to_cart={() => addToCart(book.id)} />;
}
