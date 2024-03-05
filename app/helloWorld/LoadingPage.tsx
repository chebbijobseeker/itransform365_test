export default function LoadingPage() {
  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-min-h-screen tw-bg-gray-100">
      <div className="tw-flex tw-flex-col tw-items-center">
        <svg
          className="tw-animate-spin tw-h-12 tw-w-12 tw-text-gray-800 tw-mb-4"
          viewBox="0 0 24 24"
        >
          <circle
            className="tw-opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="tw-opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm10-1.161c-.664.387-1.387.682-2.146.854A7.982 7.982 0 0112 20v4c4.418 0 8-3.582 8-8h-4zm-8-9.13c.762.173 1.487.467 2.146.854A7.982 7.982 0 0112 4V0C7.582 0 4 3.582 4 8h4z"
          ></path>
        </svg>
        <h1 className="tw-text-gray-800 tw-text-3xl tw-font-semibold">
          Itransform365
        </h1>
      </div>
    </div>
  );
}
