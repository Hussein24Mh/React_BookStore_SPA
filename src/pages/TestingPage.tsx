import { useState } from "react";
import { useBooksUniquePricesQuery } from "../queries";

import { BooksFiltersPriceRangeComp } from "../Components";
import { useGlobalContext } from "../providers/GlobalStatusProvider";

export function TestingPage() {
	const { data: prices = [] } = useBooksUniquePricesQuery();

	const [priceRange, setPriceRange] = useState<{ min: number; max: number } | undefined>(undefined);

	const resolvedMin = priceRange?.min ?? prices[0] ?? 0;
	const resolvedMax = priceRange?.max ?? prices[prices.length - 1] ?? 9999;

	const { openModal } = useGlobalContext();

	return <BooksFiltersPriceRangeComp prices={prices} min={resolvedMin} max={resolvedMax} onChange={setPriceRange} />;
}
