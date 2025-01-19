import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const landUsageData = [
  { name: "Cropland", value: 40 },
  { name: "Pastureland", value: 30 },
  { name: "Other", value: 30 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const LandUsageChart = () => (
  <Card className="w-full h-[300px]">
    <CardContent>
      <h3 className="text-lg font-semibold mb-2">Land Usage Distribution</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={landUsageData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {landUsageData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default LandUsageChart;

