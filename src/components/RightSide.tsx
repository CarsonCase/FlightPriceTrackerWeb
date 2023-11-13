// components/RightSide.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Flight } from "../../types/Flight";
import { CategoryScale, LinearScale, Chart } from 'chart.js';
import { PointElement, LineElement } from "chart.js";

Chart.register(LineElement);
Chart.register(PointElement);
Chart.register(CategoryScale);
Chart.register(LinearScale)

interface RightSideProps {
  selectedRoute: string | null;
}

const RightSide: React.FC<RightSideProps> = (selectedRoute) => {
  const [flightData, setFlightData] = useState<Flight[]>([]);
  console.log("Selected route: " + selectedRoute);
  useEffect(() => {
    if (selectedRoute) {
      console.log("Selected route: " + selectedRoute);
      axios.get<Flight[]>(`http://localhost:8000/flights?route=${selectedRoute}`)
        .then((response) => {
          setFlightData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching flight data:', error);
        });
    }
  }, [selectedRoute]);
  // Example chart data (modify based on your actual data structure)
  const chartData = {
    labels: flightData.map((flight: Flight) => flight.Date).reverse(),
    datasets: [
      {
        label: 'Flight Prices',
        data: flightData.map((flight: Flight) => flight.Price).reverse(),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="w-2/3 p-4">
      <h2 className="text-lg font-bold mb-4">Animated Graph</h2>
      <div className="border border-gray-300 p-4 rounded-md">
        {selectedRoute && flightData.length > 0 ? (
          <Line data={chartData} />
        ) : (
          <p className="text-gray-500">Select a route to display the animated graph.</p>
        )}
      </div>
    </div>
  );
};

export default RightSide;