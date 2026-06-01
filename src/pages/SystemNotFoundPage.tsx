// NotFoundPage.tsx
export function SystemNotFoundPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 m-auto">
      <div className="text-center max-w-lg">
        {/* Animated 404 number */}
        <div className="text-9xl font-black text-white mb-4 animate-pulse">
          4<span className="text-indigo-400">0</span>4
        </div>

        {/* Glitchy subtitle */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
          Page not found
        </h1>

        <p className="text-gray-300 text-lg mb-8">
          The page you're looking for doesn't exist, has been moved, or is hiding from you.
        </p>

        {/* Fun ASCII / terminal style */}
        <div className="bg-black/30 rounded-lg p-4 mb-8 font-mono text-sm text-left text-gray-300 border border-gray-700">
          <span className="text-green-400">$</span> find / --name="lost-page"
          <br />
          <span className="text-red-400">✗</span> No such file or directory
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition transform hover:scale-105"
          >
            🏠 Go home
          </a>
        </div>

        {/* Hidden easter egg */}
        <p className="text-gray-500 text-sm mt-8">
          (Psst… even the best explorers get lost sometimes)
        </p>
      </div>
    </div>
  );
}