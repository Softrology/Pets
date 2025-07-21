export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center text-white px-6">
      <div className="text-center space-y-6 animate-fade-in">
        {/* Heading with animated gradient text */}
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-fuchsia-500 via-orange-400 to-yellow-300 text-transparent bg-clip-text">
          Welcome to Tailwind v4 + Vite + React
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
          Lightning-fast setup with beautiful styling and interactivity.
        </p>

        {/* Button with hover effect */}
        <div className="space-x-4">
          <button className="px-6 py-3 rounded-full bg-fuchsia-600 hover:bg-fuchsia-700 transition shadow-lg font-medium">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition text-white font-medium border border-white/20">
            Learn More
          </button>
        </div>

        {/* Cool floating card */}
        <div className="mt-10 max-w-md mx-auto bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/10">
          <p className="text-sm text-gray-300">
            🚀 Tip: Tailwind v4 is built for speed and simplicity. Combine it
            with Vite & React for ultra-fast development.
          </p>
        </div>
      </div>
    </div>
  );
}
