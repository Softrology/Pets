export function formatUnderscoredString(inputString) {
  if (inputString?.includes("_")) {
    return inputString
      ?.split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  } else {
    return (
      inputString?.charAt(0).toUpperCase() + inputString?.slice(1).toLowerCase()
    );
  }
}

export function formatTime(timestamp) {
  const date = new Date(timestamp);

  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    // Return a fallback value or error message if the date is invalid
    return "Invalid date";
  }

  // Options for formatting the time and date
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Use 12-hour format (AM/PM)
  };

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format the time and date separately
  const time = new Intl.DateTimeFormat("en-US", timeOptions)?.format(date);
  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions)?.format(
    date
  );

  // Combine time and date with a comma
  return `${time}, ${formattedDate}`;
}

// Helper function to get user token (for API calls)
export const getUserToken = () => {
  try {
    return localStorage.getItem("authToken");
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return null;
  }
};

// Helper function to get current user
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return null;
  }
};
