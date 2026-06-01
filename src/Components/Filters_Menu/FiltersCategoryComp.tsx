interface CategoryFilterProps {
	categories: string[];
	selected: string;
	onChange: (category: string) => void;
}

export function FiltersCategoryComp({ categories, selected, onChange }: CategoryFilterProps) {
	return (
		<div className="flex flex-col gap-1">
			<p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Category</p>
			{categories.map((cat) => (
				<button
					key={cat}
					onClick={() => onChange(cat)}
					className={`
                        text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                        ${
							selected === cat
								? "bg-primary text-white shadow-sm"
								: "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
						}
                    `}
				>
					{cat}
				</button>
			))}
		</div>
	);
}
