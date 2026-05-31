import { useState } from "react";
import { useGlobalContext } from "../providers/GlobalStatusProvider";

import { useLogoutMutation } from "../mutations";
import { useCurrentUserDataQuery, useCurrentUserCartCountQuery } from "../queries";

import { NavComp, NavLinksComps } from "../Components";

function HeaderComp() {
	const [menu, setOpen] = useState(false);
	const { theme, toggleTheme } = useGlobalContext();
	const { data: user } = useCurrentUserDataQuery();
	const { data: cartCount } = useCurrentUserCartCountQuery();
	const { mutate: logout } = useLogoutMutation();

	const toggleMenu = () => setOpen((prev) => !prev);

	return (
		<NavComp
			menu={menu}
			toggleMenu={toggleMenu}
			navLinks={
				<NavLinksComps
					user={user}
					theme={theme}
					toggleTheme={toggleTheme}
					logout={logout}
					cartCount={cartCount}
				/>
			}
		/>
	);
}

export default HeaderComp;
