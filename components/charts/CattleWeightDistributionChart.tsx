import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { colors } from "../../utils/chartUtils"

const data = [
  { breed: "Angus", maleAvgWeight: 900, femaleAvgWeight: 750 },
  { breed: "Hereford", maleAvgWeight: 950, femaleAvgWeight: 800 },
  { breed: "Charolais", maleAvgWeight: 1100, femaleAvgWeight: 900 },
  { breed: "Simmental", maleAvgWeight: 1050, femaleAvgWeight: 850 },
]

export function CattleWeightDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cattle Weight Distribution by Breed and Gender</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="breed" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="maleAvgWeight" fill={colors.muted} name="Male Avg Weight (kg)" />
            <Bar dataKey="femaleAvgWeight" fill={colors.accent} name="Female Avg Weight (kg)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

