import React, { useState, useEffect } from 'react';
import { getData } from '../services/apiService';

const LaunchesList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(); 
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
     <div className="container mt-4">
      <h2>Fetched Data</h2>
      <ul className="list-group">
        {data.map(item => (
          <li key={item.flight_number} className="list-group-item">
            {item.mission_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LaunchesList;
