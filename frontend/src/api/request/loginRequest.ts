import {LOGIN_URL,} from "../../config/constant";

const loginRequest = async (username: string, password: string): Promise<any> => {
  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

export default loginRequest;
