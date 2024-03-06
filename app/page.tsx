export default function HomePage() {
  return (
    <div className="tw-bg-gray-100 tw-min-h-screen tw-flex tw-items-center tw-justify-center">
      <div className="tw-w-full tw-max-w-screen-lg tw-mx-auto tw-p-8">
        <div className="tw-bg-white tw-rounded-lg tw-shadow-xl tw-p-8">
          <h1 className="tw-text-4xl tw-font-bold tw-mb-8 tw-text-center">
            ITRANSFORM365
          </h1>
          <p className="tw-text-lg tw-text-gray-700 tw-mb-12 tw-text-center">
            technical assignment for full stack JS Post
          </p>
          <div className="tw-flex tw-justify-center">
            <a
              href="/login"
              className="tw-bg-blue-500 tw-hover:bg-blue-600 tw-text-white tw-font-bold tw-py-3 tw-px-6 tw-rounded tw-mr-4"
            >
              Login
            </a>
            <a
              href="/register"
              className="tw-bg-gray-300 tw-hover:bg-gray-400 tw-text-gray-800 tw-font-bold tw-py-3 tw-px-6 tw-rounded"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
