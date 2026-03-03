interface AlertIconProps {
  type: "error" | "confirm" | "complete";
}

const AlertIcon = ({ type }: AlertIconProps) => {
  return (
    <div className="flex justify-center">
      {type === "error" && (
        <svg
          data-testid="alert-icon-error"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="24" fill="#FF5A4F" />
          <path
            d="M24 35.5C25.1046 35.5 26 34.6046 26 33.5C26 32.3954 25.1046 31.5 24 31.5C22.8954 31.5 22 32.3954 22 33.5C22 34.6046 22.8954 35.5 24 35.5Z"
            fill="white"
          />
          <rect x="22.5" y="12.5" width="3" height="16" rx="1.5" fill="white" />
        </svg>
      )}
      {type === "confirm" && (
        <svg
          data-testid="alert-icon-confirm"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="24" fill="#AEB4B7" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 15C21.8662 15 20.0874 16.7204 20.0874 18.902C20.0874 19.7305 19.3962 20.402 18.5437 20.402C17.6911 20.402 17 19.7305 17 18.902C17 15.1167 20.1069 12 24 12C27.8931 12 31 15.1167 31 18.902C31 22.1714 28.6824 24.942 25.5423 25.6365C25.5418 26.2557 25.5413 27.0454 25.5413 27.9054C25.5413 28.7339 24.8502 29.4054 23.9976 29.4054C23.1451 29.4054 22.4539 28.7339 22.4539 27.9054C22.4539 26.9104 22.4545 26.0096 22.4551 25.3576L22.4563 24.3031C22.4575 23.4755 23.1483 22.8041 24 22.8041C26.1338 22.8041 27.9126 21.0836 27.9126 18.902C27.9126 16.7204 26.1338 15 24 15ZM24 32.6111C24.8526 32.6111 25.5437 33.2827 25.5437 34.1111V34.5C25.5437 35.3284 24.8526 36 24 36C23.1474 36 22.4563 35.3284 22.4563 34.5V34.1111C22.4563 33.2827 23.1474 32.6111 24 32.6111Z"
            fill="white"
          />
        </svg>
      )}
      {type === "complete" && (
        <svg
          data-testid="alert-icon-complete"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="24" fill="#EEF5FC" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33.2399 17.9255C33.5572 18.2428 33.5572 18.7572 33.2399 19.0745L21.3232 30.9912C21.0059 31.3085 20.4915 31.3085 20.1742 30.9912L14.7575 25.5745C14.4402 25.2572 14.4402 24.7428 14.7575 24.4255C15.0748 24.1082 15.5893 24.1082 15.9066 24.4255L20.7487 29.2676L32.0908 17.9255C32.4081 17.6082 32.9226 17.6082 33.2399 17.9255Z"
            fill="#4B9AFD"
            stroke="#4B9AFD"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default AlertIcon;
