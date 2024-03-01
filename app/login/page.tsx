import "bootstrap/dist/css/bootstrap.min.css";

export default function LoginPage() {
  return (
    <form className="max-w-md mx-auto mt-8">
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email address
        </label>
        <input
          type="email"
          className="shadow-sm form-control"
          id="email"
          placeholder="Enter your email address"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          className="shadow-sm form-control"
          id="password"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        Login
      </button>
    </form>
  );
}
