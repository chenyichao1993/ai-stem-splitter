'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // 监听滚动事件
  useEffect(() => {
    const toggleVisibility = () => {
      // 当页面滚动超过300px时显示按钮
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // 添加滚动事件监听器
    window.addEventListener('scroll', toggleVisibility)

    // 清理函数
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // 滚动到页面顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="回到页面顶部"
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
