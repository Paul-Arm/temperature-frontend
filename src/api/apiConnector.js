const apiBaseURL = 'https://easy-temp-backend.vercel.app/';

class ApiConnector {
  async getTemperature() {
    try {
      const response = await fetch(`${apiBaseURL}data/temperature`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch temperature data:', error);
      return null; // You can return a fallback value or handle it as needed
    }
  }

  async getSensors() {
    try {
      const response = await fetch(`${apiBaseURL}data/sensor`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch temperature data:', error);
      return null; // You can return a fallback value or handle it as needed
    }
  }

  async updateSensor(sensorId, updateData) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return null;
    }
    if (token === 'GAST'){
      console.error('No permission');
      return null;
    }
    try {
      const response = await fetch(`${apiBaseURL}data/sensor`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({...updateData, sensorNR: sensorId}),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to update sensor data:', error);
      return null;
    }
  }

  async getHersteller()  {
    try {
      const response = await fetch(`${apiBaseURL}data/hersteller`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch hersteller data:', error);
      return null; // You can return a fallback value or handle it as needed
    }
  }

  async getLogs(dateFrom = None, dateTO = None) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return null;
    }
    if (token === 'GAST'){
      console.error('No permission');
      alert('Fehlende Berechtigungen');
      return null;
    }
    try {
      const queryParams = new URLSearchParams();
      if (dateFrom) queryParams.append('start', dateFrom);
      if (dateTO) queryParams.append('end', dateTO);

      const response = await fetch(`${apiBaseURL}data/logs?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch logs data:', error);
      return null; // You can return a fallback value or handle it as needed
    }
  }

}


export { ApiConnector };
