import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const cropData = [
  { name: "Wheat", yield: 40 },
  { name: "Corn", yield: 60 },
  { name: "Soybeans", yield: 50 },
];

const CropYieldChart = () => (
  <Card className="w-full h-[300px]">
    <CardContent>
      <h3 className="text-lg font-semibold mb-2">Crop Yield Comparison</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={cropData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="yield" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default CropYieldChart;

