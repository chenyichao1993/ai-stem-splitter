'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CheckCircle, AlertCircle, XCircle, Clock, Activity, Server, Database, Zap, Users, Globe } from 'lucide-react'

interface ServiceStatus {
  name: string
  status: 'operational' | 'degraded' | 'outage'
  uptime: string
  responseTime: string
  lastIncident?: string
}

interface Incident {
  id: string
  title: string
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved'
  severity: 'minor' | 'major' | 'critical'
  startTime: string
  endTime?: string
  description: string
  updates: Array<{
    time: string
    message: string
  }>
}

const services: ServiceStatus[] = [
  {
    name: 'Stem Separation API',
    status: 'operational',
    uptime: '99.9%',
    responseTime: '245ms',
  },
  {
    name: 'Vocal Remover Service',
    status: 'operational',
    uptime: '99.8%',
    responseTime: '189ms',
  },
  {
    name: 'File Upload System',
    status: 'operational',
    uptime: '99.9%',
    responseTime: '156ms',
  },
  {
    name: 'Audio Processing Engine',
    status: 'operational',
    uptime: '99.7%',
    responseTime: '1.2s',
  },
  {
    name: 'User Authentication',
    status: 'operational',
    uptime: '99.9%',
    responseTime: '89ms',
  },
  {
    name: 'Payment Processing',
    status: 'operational',
    uptime: '99.8%',
    responseTime: '234ms',
  },
]

const recentIncidents: Incident[] = [
  {
    id: 'INC-2025-001',
    title: 'Temporary slowdown in audio processing',
    status: 'resolved',
    severity: 'minor',
    startTime: '2025-01-10T14:30:00Z',
    endTime: '2025-01-10T16:45:00Z',
    description: 'Some users experienced slower processing times for stem separation requests.',
    updates: [
      {
        time: '2025-01-10T14:30:00Z',
        message: 'We are investigating reports of slower than usual processing times for our stem separation tool.',
      },
      {
        time: '2025-01-10T15:15:00Z',
        message: 'We have identified the issue as increased load on our audio processing servers.',
      },
      {
        time: '2025-01-10T16:00:00Z',
        message: 'We have scaled up our processing capacity and are monitoring the situation.',
      },
      {
        time: '2025-01-10T16:45:00Z',
        message: 'The issue has been resolved. Processing times are back to normal.',
      },
    ],
  },
  {
    id: 'INC-2025-002',
    title: 'File upload issues for large files',
    status: 'resolved',
    severity: 'major',
    startTime: '2025-01-08T09:00:00Z',
    endTime: '2025-01-08T12:30:00Z',
    description: 'Users were unable to upload files larger than 100MB to our vocal remover service.',
    updates: [
      {
        time: '2025-01-08T09:00:00Z',
        message: 'We are investigating reports of file upload failures for larger audio files.',
      },
      {
        time: '2025-01-08T10:30:00Z',
        message: 'We have identified the issue as a configuration problem with our file upload limits.',
      },
      {
        time: '2025-01-08T11:45:00Z',
        message: 'We are implementing a fix to restore proper file upload functionality.',
      },
      {
        time: '2025-01-08T12:30:00Z',
        message: 'File uploads are now working normally for all supported file sizes.',
      },
    ],
  },
]

const systemMetrics = [
  {
    name: 'Total Requests Today',
    value: '2,847,392',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: Activity,
  },
  {
    name: 'Average Response Time',
    value: '189ms',
    change: '-8.2%',
    changeType: 'positive' as const,
    icon: Clock,
  },
  {
    name: 'Active Users',
    value: '15,847',
    change: '+5.3%',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    name: 'Global Availability',
    value: '99.9%',
    change: '+0.1%',
    changeType: 'positive' as const,
    icon: Globe,
  },
]

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [overallStatus, setOverallStatus] = useState<'operational' | 'degraded' | 'outage'>('operational')

  useEffect(() => {
    // Set initial time on client side only
    setCurrentTime(new Date())
    
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'degraded':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case 'outage':
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800'
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800'
      case 'outage':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'major':
        return 'bg-orange-100 text-orange-800'
      case 'minor':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              System Status
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
              Monitor the real-time status of our <strong>stem separation</strong> and 
              <strong> vocal remover online</strong> services, including <strong>audio separation by artificial intelligence</strong> infrastructure.
            </p>
            <div className="mt-8 flex items-center justify-center">
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-green-400 mr-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                </div>
                <span className="text-white font-medium">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Status */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Current Status</h2>
            <p className="mt-4 text-lg text-gray-600">
              Real-time monitoring of our <strong>music separation</strong> and <strong>instrumental separator</strong> services.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">All Systems Operational</h3>
                  <p className="text-gray-600">
                    Last updated: {currentTime ? currentTime.toLocaleString() : 'Loading...'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-gray-500">Uptime (30 days)</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                      <metric.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">{metric.name}</p>
                      <div className="flex items-center">
                        <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                        <span className={`ml-2 text-sm font-medium ${
                          metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Service Status */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Service Status</h2>
            <p className="mt-4 text-lg text-gray-600">
              Individual status of our <strong>voice separation</strong> and <strong>music splitter</strong> components.
            </p>
          </div>
          
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(service.status)}
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-500">
                        {service.lastIncident ? `Last incident: ${service.lastIncident}` : 'No recent incidents'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-500">Uptime</p>
                      <p className="text-lg font-semibold text-gray-900">{service.uptime}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-500">Response Time</p>
                      <p className="text-lg font-semibold text-gray-900">{service.responseTime}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(service.status)}`}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Recent Incidents</h2>
            <p className="mt-4 text-lg text-gray-600">
              Historical incidents affecting our <strong>video vocal remover</strong> and <strong>audio separation</strong> services.
            </p>
          </div>
          
          <div className="space-y-6">
            {recentIncidents.map((incident) => (
              <div key={incident.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getSeverityColor(incident.severity)}`}>
                      {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                    </span>
                    <span className="ml-3 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800">
                      {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Incident ID</p>
                    <p className="text-sm font-medium text-gray-900">{incident.id}</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{incident.title}</h3>
                <p className="text-gray-600 mb-4">{incident.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Started: {new Date(incident.startTime).toLocaleString()}</span>
                  {incident.endTime && (
                    <>
                      <span className="mx-2">•</span>
                      <span>Resolved: {new Date(incident.endTime).toLocaleString()}</span>
                    </>
                  )}
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Updates:</h4>
                  <div className="space-y-2">
                    {incident.updates.map((update, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex h-2 w-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                        <div>
                          <p className="text-sm text-gray-600">{update.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(update.time).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subscribe to Updates */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Stay Informed
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Subscribe to status updates for our <strong>stem separation tool</strong> and 
              <strong> vocal remover and isolation</strong> services.
            </p>
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-lg border-0 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary-500"
                />
                <button className="rounded-lg bg-white px-6 py-3 text-primary-600 font-semibold hover:bg-primary-50 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
