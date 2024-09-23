import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const hourlyTempData = hourlyWeather.slice(0, 12).map(hour => ({
  time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit' }),
  temp: hour.temp
}));

return (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={hourlyTempData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="temp" stroke="#8884d8" />
    </LineChart>
  </ResponsiveContainer>
);
