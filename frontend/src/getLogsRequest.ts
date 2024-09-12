import {COOKIES_TOKEN_KEY, GET_LOG_URL, NUMBER_OF_LOG_TO_REQUEST} from "./constant";
import Cookies from "js-cookie";

const getLogsRequest = async (): Promise<any> => {
    try {
      const response = await fetch(`${GET_LOG_URL}/${NUMBER_OF_LOG_TO_REQUEST}`, {
        headers: { Authorization: `Bearer ${Cookies.get(COOKIES_TOKEN_KEY)}` },
      });

      if (!response.ok) {
        throw new Error('Unable to receive logs from server.');
      }

      return await response.json();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
};

export default getLogsRequest;
