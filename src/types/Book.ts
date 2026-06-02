export interface BookType {
	ID: number;
	URL: string;
	PRODUCT_NAME: string;
	CATEGORY: string;
	IMG_URL: string;
	UPC: string;
	PRICE: string;
	TAX: string;
	STOCK: string;
	DESCRIPTION: string;
}

export interface BookServiceType {
	id: number;
	name: string;
	price: number;
	category: string;
	img_url: string;
	description: string;
}

export interface BooksEnrichedCartType extends BookServiceType {
	quantity: number;
	item_total: number;
}

export interface BooksListFiltersType {
	category: string | undefined;
	minvalue: number | undefined;
	maxvalue: number | undefined;
	sortBy?: "price_asc" | "price_desc" | undefined;
}
