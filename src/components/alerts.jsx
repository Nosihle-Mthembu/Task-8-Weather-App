const Alerts = ({ alerts }) => {
    if (!alerts || alerts.length === 0) return <p>No weather alerts available.</p>;
  
    return (
      <div className="alerts">
        {alerts.map((alert, index) => (
          <div key={index} className="alert">
            <h4>{alert.event}</h4>
            <p>{alert.description}</p>
            <p>{new Date(alert.start * 1000).toLocaleString()} - {new Date(alert.end * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
    );
  };
  

export default Alerts