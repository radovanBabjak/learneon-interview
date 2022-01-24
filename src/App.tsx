import React, { useState, useEffect } from 'react';

const LAUNCHES_QUERY = `
{
  launchesPast(limit: 10) {
    mission_name
    launch_date_local
    rocket {
      rocket_name
    }
  }
}
`

function App() {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    fetch('https://api.spacex.land/graphql/', {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ query: LAUNCHES_QUERY })
    }).then(response => response.json())
    .then(data => setLaunches(data))
  }, [])

  return (
    <div>
      {JSON.stringify(launches, null, 2)}
    </div>
  );
}

export default App;
