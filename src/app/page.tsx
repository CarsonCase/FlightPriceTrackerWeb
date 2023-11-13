"use client";
import React, { useState } from 'react';
import LeftBar from '../../components/LeftBar';
import RightSide from '../../components/RightSide';

const Home: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const handleSelectRoute = (routeId: string) => {
    setSelectedRoute(routeId);
  };

  return (
    <div className="flex">
      <LeftBar onSelectRoute={handleSelectRoute} />
      <RightSide selectedRoute={selectedRoute} />
    </div>
  );
};

export default Home;
