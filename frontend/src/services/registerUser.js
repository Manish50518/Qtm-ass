export async function registerUsers(userDetails) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  if (!baseUrl) {
    throw new Error(
      "Configuration error: API base URL is missing. Please contact support."
    );
  }

  const url = `${baseUrl}auth/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = "Signup failed. Please try again.";

      if (response.status === 400) {
        errorMessage = "Invalid input.register with different email.";
      } else if (response.status === 409) {
        errorMessage =
          "User already exists. Please try logging in or use a different email.";
      } else if (response.status >= 500) {
        errorMessage =
          "Server error. Please try again later or contact support.";
      } else {
        errorMessage = `Signup failed: ${
          errorText || "Unknown error occurred."
        }`;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        "Request timed out. Please check your internet connection and try again."
      );
    }

    throw new Error(
      error.message || "An unexpected error occurred. Please try again."
    );
  }
}
