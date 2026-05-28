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

export interface BooksEnrichedCart extends BookServiceType {
	quantity: number;
	item_total: number;
}
