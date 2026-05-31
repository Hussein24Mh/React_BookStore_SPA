import { useState } from "react";
import { ShoppingCart, Star, Heart, Share2, Check, Minus, Plus, BookOpen, Tag } from "lucide-react";

import type { BookServiceType } from "../../types";

interface ProductDetailsCompProps extends Partial<BookServiceType> {
	add_to_cart?: (quantity?: number) => void;
	onClose?: () => void;
}

export function ProductDetailsCompDeep({
	name = "The Midnight Library",
	price = 24.99,
	category = "Fiction",
	img_url = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop",
	description = "A breathtaking novel about the choices that define our lives. Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right. Every book provides a chance to try another life she could have lived. With the help of an old friend, she can finally undo every decision she regrets—but can she actually fix her life? A dazzling thought-provoking story that will stay with you long after the final page.",
	add_to_cart = () => {},
	onClose = () => {},
}: ProductDetailsCompProps) {
	const [quantity, setQuantity] = useState(1);
	const [isAdded, setIsAdded] = useState(false);
	const [isWishlisted, setIsWishlisted] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);

	const totalPrice = price * quantity;
	const formattedPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(totalPrice);

	const handleAddToCart = () => {
		add_to_cart(quantity);
		setIsAdded(true);
		setTimeout(() => setIsAdded(false), 2000);
	};

	const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 99));
	const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

	// Sample rating (4.7 stars)
	const rating = 4.7;
	const reviewCount = 1423;

	return (
		<div
			className="relative w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-gray-900 shadow-2xl"
			style={{ scrollbarWidth: "thin" }}
		>
			{/* Close button */}
			<button
				onClick={onClose}
				className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
				aria-label="Close"
			>
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>

			<div className="flex flex-col lg:flex-row">
				{/* Image Panel - With zoom and gallery feel */}
				<div className="lg:w-1/2 relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-8">
					<div className="relative group w-full max-w-md mx-auto">
						{!imageLoaded && !imageError && (
							<div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse">
								<BookOpen className="w-12 h-12 text-gray-400" />
							</div>
						)}
						<img
							src={imageError ? "https://placehold.co/600x800/e2e8f0/64748b?text=No+Cover" : img_url}
							alt={name}
							className={`w-full h-auto rounded-2xl shadow-2xl transition-all duration-700 ${
								imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
							} group-hover:scale-105 cursor-zoom-in`}
							onLoad={() => setImageLoaded(true)}
							onError={() => setImageError(true)}
							loading="lazy"
						/>
						{/* Category badge - floating */}
						<div className="absolute top-4 left-4 flex items-center gap-2">
							<span className="bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
								<Tag size={12} />
								{category}
							</span>
						</div>
						{/* Wishlist button overlay */}
						<button
							onClick={() => setIsWishlisted(!isWishlisted)}
							className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white transition-all shadow-md"
						>
							<Heart
								size={20}
								className={`transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"}`}
							/>
						</button>
					</div>
				</div>

				{/* Content Panel - Rich typography and details */}
				<div className="lg:w-1/2 p-6 md:p-8 flex flex-col gap-6">
					{/* Title & Metadata */}
					<div className="space-y-3">
						<h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
							{name}
						</h1>

						{/* Author placeholder - extend from BookServiceType */}
						<p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
							<BookOpen size={14} />
							by Matt Haig
						</p>

						{/* Rating */}
						<div className="flex items-center gap-3 flex-wrap">
							<div className="flex items-center gap-1">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										size={16}
										className={`${
											i < Math.floor(rating)
												? "fill-yellow-400 text-yellow-400"
												: i < rating
													? "fill-yellow-400 text-yellow-400 opacity-50"
													: "text-gray-300 dark:text-gray-600"
										}`}
									/>
								))}
								<span className="ml-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
									{rating}
								</span>
							</div>
							<span className="text-sm text-gray-500 dark:text-gray-400">
								{reviewCount.toLocaleString()} ratings
							</span>
							<span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
								Bestseller
							</span>
						</div>
					</div>

					{/* Description with improved readability */}
					<div className="relative">
						<p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
							{description}
						</p>
					</div>

					{/* Additional Info Grid */}
					<div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
						<div>
							<p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								Publisher
							</p>
							<p className="text-sm font-medium text-gray-800 dark:text-gray-200">Penguin Random House</p>
						</div>
						<div>
							<p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								Language
							</p>
							<p className="text-sm font-medium text-gray-800 dark:text-gray-200">English</p>
						</div>
						<div>
							<p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pages</p>
							<p className="text-sm font-medium text-gray-800 dark:text-gray-200">304 pages</p>
						</div>
						<div>
							<p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">ISBN</p>
							<p className="text-sm font-medium text-gray-800 dark:text-gray-200">978-0525559474</p>
						</div>
					</div>

					{/* Price & Purchase Section */}
					<div className="space-y-4 pt-2">
						<div className="flex items-baseline gap-2">
							<span className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">
								{formattedPrice}
							</span>
							{quantity > 1 && (
								<span className="text-sm text-gray-500 line-through">${price.toFixed(2)} each</span>
							)}
						</div>

						{/* Quantity selector */}
						<div className="flex items-center gap-4 flex-wrap">
							<div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
								<button
									onClick={decrementQuantity}
									className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50"
									disabled={quantity <= 1}
								>
									<Minus size={16} />
								</button>
								<span className="w-12 text-center font-medium">{quantity}</span>
								<button
									onClick={incrementQuantity}
									className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
								>
									<Plus size={16} />
								</button>
							</div>

							<button
								onClick={handleAddToCart}
								className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform active:scale-95 ${
									isAdded
										? "bg-green-500 text-white shadow-lg shadow-green-500/30"
										: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 hover:shadow-xl"
								}`}
							>
								{isAdded ? (
									<>
										<Check size={20} />
										Added to Cart
									</>
								) : (
									<>
										<ShoppingCart size={20} />
										Add to Cart
									</>
								)}
							</button>
						</div>

						{/* Action buttons */}
						<div className="flex gap-3">
							<button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
								<Heart size={18} />
								Wishlist
							</button>
							<button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
								<Share2 size={18} />
								Share
							</button>
						</div>
					</div>

					{/* Stock status / delivery info */}
					<div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
						<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
						In stock • Free delivery on orders over $25
					</div>
				</div>
			</div>
		</div>
	);
}
