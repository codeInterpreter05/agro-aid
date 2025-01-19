import { CropProductionChart } from "./charts/CropProductionChart"
import { CropPriceChart } from "./charts/CropPriceChart"
import { DiseaseSeasonChart } from "./charts/DiseaseSeasonChart"
import { CattleWeightDistributionChart } from "./charts/CattleWeightDistributionChart"
import { CattleFeedingCycleChart } from "./charts/CattleFeedingCycleChart"

export function Dashboard() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Crop and Cattle Analysis Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CropProductionChart />
        <CropPriceChart />
        <DiseaseSeasonChart />
        <CattleWeightDistributionChart />
        <CattleFeedingCycleChart />
      </div>
    </div>
  )
}

