const ROUTES = {
	home: "/",
	login: "/login",
	profile: "/profile",
	cart: "/cart",
	productdetails: "/product/:id",
	navigatProductdetails: (id: string) => `/product/${id}`,
	notFound: "*",
};

export default ROUTES;
