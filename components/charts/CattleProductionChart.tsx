import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const cattleData = [
  { month: "Jan", milk: 100, meat: 50 },
  { month: "Feb", milk: 120, meat: 60 },
  { month: "Mar", milk: 110, meat: 55 },
];

const CattleProductionChart = () => (
  <Card className="w-full h-[300px]">
    <CardContent>
      <h3 className="text-lg font-semibold mb-2">Cattle Production Trends</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={cattleData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="milk" stroke="#8884d8" />
          <Line type="monotone" dataKey="meat" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default CattleProductionChart;

