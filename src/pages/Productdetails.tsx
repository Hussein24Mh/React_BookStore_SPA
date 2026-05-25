import { useParams } from "react-router-dom";
import ProductDetailsComp from "../Components/ProductDetails";

function ProductDetailsPage() {
	const { id } = useParams();
	return <ProductDetailsComp id={Number(id)} />;
}

export default ProductDetailsPage;
