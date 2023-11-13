// components/LeftBar.tsx
import React, { useState, useEffect } from 'react';
import Route from "../types/Route";
import axios from 'axios';

interface LeftBarProps {
  onSelectRoute: (routeId: string) => void;
}

const LeftBar: React.FC<LeftBarProps> = ({ onSelectRoute }) => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // Fetch routes data
    axios.get('http://localhost:8000/routes')
      .then((response) => {
        setRoutes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching routes:', error);
      });
  }, []);

  const handleRouteClick = (routeId :any) => {
    onSelectRoute(routeId);
  };

  return (
    <div className="w-1/3 bg-gray-200 p-4">
      <h2 className="text-lg font-bold mb-4">Routes</h2>
      <ul>
        {routes.map((route: Route) => (
          <li key={route.ID} className="cursor-pointer" onClick={() => handleRouteClick(route.ID)}>
            {route.Departure} to {route.Arrival}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftBar;
