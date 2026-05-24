import { useParams } from "react-router-dom";
import ProductDetails from "../Components/ProductDetails";

function ProductDetailsPage() {
	const { id } = useParams();
	return <ProductDetails id={Number(id)} />;
}

export default ProductDetailsPage;
