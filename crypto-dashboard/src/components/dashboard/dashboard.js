import React from "react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [coins, setCoins] = useState();

  const fetchData = async () => {
    const url = "http://localhost:4445/";
    const query = `
  query  {
    AllCoins {
      asset_id
      name
      price
      gain
      time
    }
  }
  `;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const responseBody = await response.json();
    setCoins(responseBody?.data?.AllCoins);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {coins && (
        <table>
          <tbody>
            {coins.map((coin, index) => (
              <tr key={index}>
                <td>{coin.asset_id}</td>
                <td>{coin.name}</td>
                <td>{coin.price}</td>
                <td>{coin.gain}</td>
                <td>{coin.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Dashboard;
