'use client'

import { PlanType } from '@/types/interactive-demo'

interface PlanToggleProps {
  planType: PlanType
  onPlanChange: (plan: PlanType) => void
}

export function PlanToggle({ planType, onPlanChange }: PlanToggleProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="bg-gray-800 rounded-lg p-1 flex">
        <button
          onClick={() => onPlanChange('free')}
          className={`
            px-6 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${planType === 'free'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
            }
          `}
        >
          Free Plan
        </button>
        <button
          onClick={() => onPlanChange('premium')}
          className={`
            px-6 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${planType === 'premium'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
            }
          `}
        >
          Premium Plan
        </button>
      </div>
    </div>
  )
}
