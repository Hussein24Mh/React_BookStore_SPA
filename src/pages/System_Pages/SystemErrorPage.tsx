// SystemErrorPage.tsx
export function SystemErrorPage() {
	return (
		<div className="min-h-screen w-full m-auto bg-gradient-to-br from-red-900 to-red-800 flex items-center justify-center px-4">
			<div className="text-center max-w-lg">
				{/* Big error indicator */}
				<div className="text-8xl mb-6 animate-bounce">⚠️ 💥 ⚠️</div>

				<h1 className="text-5xl md:text-6xl font-black text-white mb-4">System Error</h1>

				<div className="bg-black/40 rounded-lg p-4 mb-8 font-mono text-left text-gray-200 border border-red-500">
					<p className="text-red-300">[ERROR]</p>
					<p>Something went wrong on our end.</p>
					<p className="text-yellow-300 mt-2">Error code: 0xDEADBEEF</p>
					<p className="text-gray-400 text-sm mt-2">This incident has been reported to the cyber‑gnomes.</p>
				</div>

				<p className="text-white/90 text-lg mb-8">
					Don't panic — it's not you, it's us. Our engineers have been alerted.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href="/"
						className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-semibold rounded-lg transition"
					>
						🏠 Return home
					</a>
				</div>

				{/* Progress bar simulation for extra flair */}
				<div className="mt-8 w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
					<div className="bg-white h-1.5 rounded-full animate-pulse w-3/4"></div>
				</div>
			</div>
		</div>
	);
}
