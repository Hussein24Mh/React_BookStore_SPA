import type { BookServiceType } from "../types";

export function ProductDetailsComp({
	id = 0,
	name = "",
	price = 0,
	category = "",
	img_url = "",
	description = "",
}: Partial<BookServiceType>) {
	return (
		<div>
			<img src={img_url} alt={name} />
			<h1>{name}</h1>
			<p>{category}</p>
			<p>Price: ${price}</p>
			<p>{description}</p>
		</div>
	);
}
