import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLaunches } from '../store/launchesSlice';

const LaunchesList = () => {
  const dispatch = useDispatch();
  const { launches, loading, error } = useSelector(state => state.launches);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [launchYear, setLaunchYear] = useState('');
  const [launchStatus, setLaunchStatus] = useState('');

  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);

  useEffect(() => {
    filterLaunches();
  }, [searchTerm, launchYear, launchStatus, launches]);

  const filterLaunches = () => {
    let filtered = launches.filter(launch =>
      launch.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (launchYear) {
      filtered = filtered.filter(launch =>
        new Date(launch.date_local).getFullYear().toString() === launchYear
      );
    }

    if (launchStatus) {
      filtered = filtered.filter(launch =>
        launchStatus === 'success' ? launch.success : !launch.success
      );
    }

    setFilteredLaunches(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleYearChange = (e) => {
    setLaunchYear(e.target.value);
  };

  const handleStatusChange = (e) => {
    setLaunchStatus(e.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a launch..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col">
          <select className="form-control" value={launchYear} onChange={handleYearChange}>
            <option value="">Select Year</option>
            {[...new Set(launches.map(launch => new Date(launch.date_local).getFullYear()))]
              .sort((a, b) => b - a)
              .map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
          </select>
        </div>
        <div className="col">
          <select className="form-control" value={launchStatus} onChange={handleStatusChange}>
            <option value="">Select Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>
      <div className="row">
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching launches: {error}</p>}
        {!loading && !error && filteredLaunches.map(launch => (
          <div key={launch.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={launch.links.patch.small || 'https://via.placeholder.com/150'} className="card-img-top" alt={launch.name} />
              <div className="card-body">
                <h5 className="card-title">{launch.name}</h5>
                <p className="card-text">
                  Date: {new Date(launch.date_local).toLocaleDateString('en-GB')}<br />
                  Rocket: {launch.rocket.name}<br />
                  Launch Site: {launch.launchpad.name}<br />
                  Status: {launch.success ? 'Success' : 'Failed'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaunchesList;
