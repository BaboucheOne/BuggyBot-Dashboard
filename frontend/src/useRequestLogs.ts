const getLogs = async (fetchUrl: string): Promise<any> => {
    try {
      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error('Unable to receive logs from server.');
      }

      return await response.json();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
};

export default getLogs;
