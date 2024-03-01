export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-screen-lg mx-auto p-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold mb-8 text-center">ITRANSFORM365</h1>
          <p className="text-lg text-gray-700 mb-12 text-center">
            technical assignment for full stack JS Post
          </p>
          <div className="flex justify-center">
            <a
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded mr-4"
            >
              Login
            </a>
            <a
              href="/register"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
