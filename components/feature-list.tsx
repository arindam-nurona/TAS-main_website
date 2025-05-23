import { Check } from "lucide-react"

const features = [
  "Save recruiter time and costs by automating technical screening, coding tests, and phone interviews.",
  "More objective, unbiased evaluations based on real coding ability and communication skills.",
  "Scale effortlessly — screen 10x more candidates without increasing your hiring team's workload.",
  "Deliver a better candidate experience with flexible, anytime interviews and instant feedback.",
]

export default function FeatureList() {
  return (
    <ul className="space-y-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-4 group">
          <div className="mt-1 flex-shrink-0 bg-violet-600/20 p-1 rounded-full group-hover:bg-violet-600/30 transition-colors">
            <Check className="h-5 w-5 text-violet-400" />
          </div>
          <p className="text-gray-300 text-lg">{feature}</p>
        </li>
      ))}
    </ul>
  )
}
