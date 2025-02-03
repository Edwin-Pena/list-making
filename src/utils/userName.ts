const USER_KEY = "user";

export const saveUserName = (username: string): void => {
  try {
    localStorage.setItem(USER_KEY, username);
  } catch (error) {
    console.error("Failed to save user name to localStorage", error);
  }
};

export const getUserName = (): string | null => {
  try {
    return localStorage.getItem(USER_KEY);
  } catch (error) {
    console.error("Failed to get user name");
    return null;
  }
};
