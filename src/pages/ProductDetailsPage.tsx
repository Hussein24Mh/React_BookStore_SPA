import { useParams } from "react-router-dom";

import { useBooksListQuery } from "../queries";

import { ProductDetailsComp } from "../Components";

export function ProductDetailsPage() {
	const { id } = useParams();
	const { data: books, isLoading, error } = useBooksListQuery([Number(id)]);

	const book = books?.[0];

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error loading product</p>;
	}

	if (!book) return <p>No product found</p>;

	return <ProductDetailsComp {...book} />;
}
