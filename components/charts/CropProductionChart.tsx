import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { colors } from "../../utils/chartUtils"

const data = [
  { name: "Wheat", production: 120, disease: 20 },
  { name: "Rice", production: 100, disease: 15 },
  { name: "Corn", production: 80, disease: 10 },
  { name: "Soybeans", production: 60, disease: 5 },
]

export function CropProductionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crop Production vs Disease Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="production" fill={colors.primary} name="Production (tons)" />
            <Bar dataKey="disease" fill={colors.warning} name="Disease Impact (tons)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

