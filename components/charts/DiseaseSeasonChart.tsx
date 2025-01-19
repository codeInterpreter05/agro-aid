import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { colors } from "../../utils/chartUtils"

const data = [
  { month: "Jan", fungal: 20, viral: 10, bacterial: 5 },
  { month: "Feb", fungal: 25, viral: 15, bacterial: 8 },
  { month: "Mar", fungal: 30, viral: 20, bacterial: 12 },
  { month: "Apr", fungal: 35, viral: 25, bacterial: 15 },
  { month: "May", fungal: 40, viral: 30, bacterial: 20 },
  { month: "Jun", fungal: 35, viral: 25, bacterial: 18 },
]

export function DiseaseSeasonChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disease Prevalence by Season</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="fungal" stackId="1" stroke={colors.primary} fill={colors.primary} name="Fungal Diseases" />
            <Area type="monotone" dataKey="viral" stackId="1" stroke={colors.secondary} fill={colors.secondary} name="Viral Diseases" />
            <Area type="monotone" dataKey="bacterial" stackId="1" stroke={colors.warning} fill={colors.warning} name="Bacterial Diseases" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

