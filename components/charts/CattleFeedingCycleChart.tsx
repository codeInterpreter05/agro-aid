import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts"
import { colors } from "../../utils/chartUtils"

const data = [
  { name: "Grazing", value: 40 },
  { name: "Hay", value: 30 },
  { name: "Silage", value: 20 },
  { name: "Concentrate", value: 10 },
]

const COLORS = [colors.primary, colors.secondary, colors.accent, colors.muted];

export function CattleFeedingCycleChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cattle Feeding Cycle Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

