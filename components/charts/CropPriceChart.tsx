import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { colors } from "../../utils/chartUtils"

const data = [
  { month: "Jan", costPrice: 10, sellingPrice: 15 },
  { month: "Feb", costPrice: 12, sellingPrice: 18 },
  { month: "Mar", costPrice: 11, sellingPrice: 17 },
  { month: "Apr", costPrice: 13, sellingPrice: 20 },
  { month: "May", costPrice: 14, sellingPrice: 22 },
  { month: "Jun", costPrice: 15, sellingPrice: 23 },
]

export function CropPriceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crop Price Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="costPrice" stroke={colors.secondary} strokeWidth={2} name="Cost Price ($/kg)" />
            <Line type="monotone" dataKey="sellingPrice" stroke={colors.accent} strokeWidth={2} name="Selling Price ($/kg)" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

