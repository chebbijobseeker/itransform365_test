// LoadingButton.tsx
import React from "react";

type LoadingButtonProps = {
  onClick?: () => void;
  isLoading: boolean;
  buttonText: string;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  onClick,
  isLoading,
  buttonText,
  ...rest
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded relative"
      disabled={isLoading} // Disable the button when loading
      style={{ width: "150px", height: "50px" }}
      {...rest}
    >
      {!isLoading && buttonText}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.09a1 1 0 002 0V4.472c3.572.805 6.395 3.628 7.472 7.472h-3.09a1 1 0 000 2h3.09c-1.077 3.844-3.9 6.667-7.472 7.472v-3.09a1 1 0 00-2 0v3.09c-3.844-1.077-6.667-3.9-7.472-7.472h3.09a1 1 0 000-2H4zm7-2.709A5.002 5.002 0 007 12.791h2a3 3 0 016 0h2a5.002 5.002 0 00-5-5.418v2z"
            ></path>
          </svg>
        </span>
      )}
    </button>
  );
};

export default LoadingButton;
