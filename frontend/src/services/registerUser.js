export async function registerUsers(userDetails) {
  const baseUrl = "http://localhost:5000/api";

  const url = `${baseUrl}/auth/register`;

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
      throw new Error(
        `Sigup failed: ${response.status} ${response.statusText} - ${errorText}`
      );
    }
  } catch (error) {
    console.error("Fetch error details:", error.message);
    throw error;
  }
}
