'use client'

import { useState } from 'react'
import { PlanType } from '@/types/interactive-demo'
import { PlanToggle } from './PlanToggle'
import { FreePlanDemo } from './FreePlanDemo'
import { PremiumPlanDemo } from './PremiumPlanDemo'

export function InteractiveDemoSection() {
  const [planType, setPlanType] = useState<PlanType>('free')

  const handlePlanChange = (plan: PlanType) => {
    setPlanType(plan)
  }

  return (
    <div className="py-16 sm:py-20 bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 标题和描述 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Experience Our AI Stem Separation
          </h2>
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            Try our interactive demo to see how precisely you can extract individual instrument tracks from any song. 
            Switch between Free and Premium plans to compare features.
          </p>
        </div>

        {/* 计划切换 */}
        <PlanToggle planType={planType} onPlanChange={handlePlanChange} />

        {/* 音频界面 - 根据计划类型渲染不同组件 */}
        {planType === 'free' ? (
          <FreePlanDemo />
        ) : (
          <PremiumPlanDemo />
        )}

        {/* 使用说明 */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Click on tracks to select them, adjust volume with sliders, use Solo/Mute buttons, 
            and control playback with the bottom controls. This is a demo - actual processing requires file upload.
          </p>
        </div>
      </div>
    </div>
  )
}
