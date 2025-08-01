/**
 * Formats an underscored string into readable format
 * Example: "hello_world" → "Hello World"
 */
export function formatUnderscoredString(inputString) {
  if (!inputString) return '';
  
  if (inputString.includes("_")) {
    return inputString
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  } else {
    return (
      inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
    );
  }
}

/**
 * Formats a timestamp into readable date and time
 * Example: "2023-05-15T14:30:00Z" → "2:30 PM, May 15, 2023"
 */
export function formatTime(timestamp) {
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const time = new Intl.DateTimeFormat("en-US", timeOptions).format(date);
  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(date);

  return `${time}, ${formattedDate}`;
}

// ======== Local Storage Management ======== //

/**
 * Gets authentication token from localStorage
 */
export const getUserToken = () => {
  try {
    return localStorage.getItem("authToken");
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

/**
 * Gets current user data from localStorage
 */
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

/**
 * Sets data in localStorage with optional expiration (in hours)
 */
export const setLocalStorage = (key, value, expiresInHours = null) => {
  try {
    const item = {
      data: value,
      timestamp: expiresInHours ? new Date().getTime() : null
    };
    localStorage.setItem(key, JSON.stringify(item));
    
    if (expiresInHours) {
      const expirationKey = `${key}_expiration`;
      const expirationTime = new Date().getTime() + (expiresInHours * 60 * 60 * 1000);
      localStorage.setItem(expirationKey, expirationTime.toString());
    }
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

/**
 * Gets data from localStorage, checking expiration if set
 */
export const getLocalStorage = (key) => {
  try {
    const expirationKey = `${key}_expiration`;
    const expirationTime = localStorage.getItem(expirationKey);
    
    if (expirationTime && new Date().getTime() > Number(expirationTime)) {
      localStorage.removeItem(key);
      localStorage.removeItem(expirationKey);
      return null;
    }
    
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item).data : null;
  } catch (error) {
    console.error(`Error getting localStorage key "${key}":`, error);
    return null;
  }
};

/**
 * Removes data from localStorage
 */
export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}_expiration`);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
};

/**
 * Clears all app-related data from localStorage
 */
export const clearAppStorage = () => {
  try {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    // Add any other app-specific keys you want to clear
  } catch (error) {
    console.error("Error clearing app storage:", error);
  }
};

// ======== Enhanced User Functions ======== //

/**
 * Sets the authenticated user data
 */
export const setCurrentUser = (userData) => {
  setLocalStorage("user", userData);
};

/**
 * Sets the authentication token
 */
export const setAuthToken = (token) => {
  setLocalStorage("authToken", token);
};

/**
 * Checks if user is authenticated (has valid token)
 */
export const isAuthenticated = () => {
  return !!getUserToken();
};

/**
 * Gets user role if available
 */
export const getUserRole = () => {
  const user = getCurrentUser();
  return user?.role || null;
};