import {GET_LOG_URL, NUMBER_OF_LOG_TO_REQUEST} from "./constant";

const getLogs = async (): Promise<any> => {
    try {
      const response = await fetch(`${GET_LOG_URL}/${NUMBER_OF_LOG_TO_REQUEST}`);
      if (!response.ok) {
        throw new Error('Unable to receive logs from server.');
      }

      return await response.json();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
};

export default getLogs;
