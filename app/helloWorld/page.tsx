export default function HelloWorld() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto p-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Hello, World!</h1>
          <p className="text-lg text-gray-700 mb-12 text-center">
            This is a simple "Hello, World!" page using Tailwind CSS.
          </p>
          <div className="flex justify-center">
            <a
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded "
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
