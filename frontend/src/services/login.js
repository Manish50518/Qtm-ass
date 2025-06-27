export async function loginUser(userDetails) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  if (!baseUrl) {
    throw new Error(
      "Configuration error: API base URL is missing. Please contact support."
    );
  }
  const url = `${baseUrl}auth/login`;

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
      let errorMessage = "Login failed. Please try again.";

      if (response.status === 401) {
        errorMessage =
          "Invalid email or password. Please check your credentials.";
      } else if (response.status === 400) {
        errorMessage =
          "Invalid Email or Password. Please Provide right credentials.";
      } else if (response.status >= 500) {
        errorMessage =
          "Server error. Please try again later or contact support.";
      } else {
        errorMessage = `Login failed: ${
          errorText || "Unknown error occurred."
        }`;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    const jwtToken = data.token;
    if (!jwtToken) {
      throw new Error("Authentication error: No token received from server.");
    }

    localStorage.setItem("token", jwtToken);
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
