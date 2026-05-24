const ROUTES = {
	home: "/",
	login: "/login",
	profile: "/profile",
	checkout: "/checkout",
	productdetails: "/product/:id",
	navigatProductdetails: (id: string) => `/product/${id}`,
	notFound: "*",
};

export default ROUTES;
