import { useState } from "react";

import { BooksListFeature, FilterMenuFeature } from "../Features";

export function HomePage() {
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

	return (
		<div id="home-page" className="flex gap-10 mx-auto my-10 w-full md:w-[90%] lg:w-[85%] items-start">
			<FilterMenuFeature
				isOpen={isFilterMenuOpen}
				setFilterMenuOn={() => setIsFilterMenuOpen(true)}
				setFilterMenuOff={() => setIsFilterMenuOpen(false)}
			/>
			<div className="flex flex-1 flex-col">
				<div className="grid grid-cols-[repeat(auto-fill,minmax(260px,260px))] gap-7 justify-center">
					<BooksListFeature />
				</div>
			</div>
		</div>
	);
}
