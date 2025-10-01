'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Code, Key, Zap, Shield, Clock, Copy, Check, AlertCircle, Info, ExternalLink } from 'lucide-react'

const apiEndpoints = [
  {
    method: 'POST',
    path: '/api/v1/separate',
    title: 'Separate Audio Stems',
    description: 'Separate audio file into individual stems using our AI-powered stem separation technology.',
    parameters: [
      {
        name: 'file',
        type: 'File',
        required: true,
        description: 'Audio file (MP3, MP4, WAV, FLAC, M4A, AAC) up to 200MB',
      },
      {
        name: 'stems',
        type: 'Array',
        required: false,
        description: 'Array of stem types to extract: ["vocals", "drums", "bass", "guitar", "piano"]',
      },
      {
        name: 'quality',
        type: 'String',
        required: false,
        description: 'Output quality: "standard", "high", "lossless" (default: "high")',
      },
    ],
    response: {
      success: {
        status: 200,
        data: {
          job_id: 'job_123456789',
          status: 'processing',
          estimated_time: 30,
        },
      },
      error: {
        status: 400,
        data: {
          error: 'Invalid file format',
          message: 'Only MP3, MP4, WAV, FLAC, M4A, and AAC files are supported',
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/api/v1/jobs/{job_id}',
    title: 'Get Job Status',
    description: 'Check the status of a stem separation job and retrieve results when complete.',
    parameters: [
      {
        name: 'job_id',
        type: 'String',
        required: true,
        description: 'Unique identifier for the separation job',
      },
    ],
    response: {
      success: {
        status: 200,
        data: {
          job_id: 'job_123456789',
          status: 'completed',
          stems: {
            vocals: 'https://api.aistemsplitter.com/download/vocals_123456789.wav',
            drums: 'https://api.aistemsplitter.com/download/drums_123456789.wav',
            bass: 'https://api.aistemsplitter.com/download/bass_123456789.wav',
            guitar: 'https://api.aistemsplitter.com/download/guitar_123456789.wav',
            piano: 'https://api.aistemsplitter.com/download/piano_123456789.wav',
          },
          processing_time: 28.5,
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/api/v1/account/usage',
    title: 'Get Usage Statistics',
    description: 'Retrieve your API usage statistics and remaining quota.',
    parameters: [],
    response: {
      success: {
        status: 200,
        data: {
          plan: 'pro',
          monthly_limit: 200,
          used: 45,
          remaining: 155,
          reset_date: '2025-02-01T00:00:00Z',
        },
      },
    },
  },
]

const codeExamples = [
  {
    language: 'JavaScript',
    title: 'Node.js Example',
    code: `const FormData = require('form-data');
const fs = require('fs');

async function separateAudio(filePath) {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));
  form.append('stems', JSON.stringify(['vocals', 'drums', 'bass']));
  form.append('quality', 'high');

  try {
    const response = await fetch('https://api.aistemsplitter.com/api/v1/separate', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        ...form.getHeaders()
      },
      body: form
    });

    const result = await response.json();
    
    if (result.status === 'processing') {
      // Poll for completion
      return await pollJobStatus(result.job_id);
    }
    
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function pollJobStatus(jobId) {
  while (true) {
    const response = await fetch(\`https://api.aistemsplitter.com/api/v1/jobs/\${jobId}\`, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    });
    
    const result = await response.json();
    
    if (result.status === 'completed') {
      return result;
    } else if (result.status === 'failed') {
      throw new Error('Job failed');
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}`,
  },
  {
    language: 'Python',
    title: 'Python Example',
    code: `import requests
import time

def separate_audio(file_path, api_key):
    # Upload file for separation
    with open(file_path, 'rb') as f:
        files = {'file': f}
        data = {
            'stems': '["vocals", "drums", "bass"]',
            'quality': 'high'
        }
        headers = {'Authorization': f'Bearer {api_key}'}
        
        response = requests.post(
            'https://api.aistemsplitter.com/api/v1/separate',
            files=files,
            data=data,
            headers=headers
        )
    
    if response.status_code == 200:
        job_data = response.json()
        job_id = job_data['job_id']
        
        # Poll for completion
        while True:
            status_response = requests.get(
                f'https://api.aistemsplitter.com/api/v1/jobs/{job_id}',
                headers=headers
            )
            
            status_data = status_response.json()
            
            if status_data['status'] == 'completed':
                return status_data
            elif status_data['status'] == 'failed':
                raise Exception('Job failed')
            
            time.sleep(2)

# Usage
api_key = 'YOUR_API_KEY'
result = separate_audio('song.mp3', api_key)
print(f"Vocals: {result['stems']['vocals']}")`,
  },
  {
    language: 'cURL',
    title: 'cURL Example',
    code: `# Start separation job
curl -X POST https://api.aistemsplitter.com/api/v1/separate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@song.mp3" \\
  -F "stems=[\"vocals\",\"drums\",\"bass\"]" \\
  -F "quality=high"

# Response:
# {
#   "job_id": "job_123456789",
#   "status": "processing",
#   "estimated_time": 30
# }

# Check job status
curl -X GET https://api.aistemsplitter.com/api/v1/jobs/job_123456789 \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Response when completed:
# {
#   "job_id": "job_123456789",
#   "status": "completed",
#   "stems": {
#     "vocals": "https://api.aistemsplitter.com/download/vocals_123456789.wav",
#     "drums": "https://api.aistemsplitter.com/download/drums_123456789.wav",
#     "bass": "https://api.aistemsplitter.com/download/bass_123456789.wav"
#   },
#   "processing_time": 28.5
# }`,
  },
]

const errorCodes = [
  {
    code: 400,
    title: 'Bad Request',
    description: 'Invalid request parameters or file format',
    examples: ['Invalid file format', 'File too large', 'Missing required parameters'],
  },
  {
    code: 401,
    title: 'Unauthorized',
    description: 'Invalid or missing API key',
    examples: ['Invalid API key', 'Expired API key', 'Missing Authorization header'],
  },
  {
    code: 403,
    title: 'Forbidden',
    description: 'API key does not have permission for this operation',
    examples: ['Insufficient quota', 'Plan limitations', 'Rate limit exceeded'],
  },
  {
    code: 429,
    title: 'Too Many Requests',
    description: 'Rate limit exceeded',
    examples: ['Too many requests per minute', 'Monthly quota exceeded'],
  },
  {
    code: 500,
    title: 'Internal Server Error',
    description: 'Server error occurred during processing',
    examples: ['Processing failed', 'Temporary service unavailable'],
  },
]

export default function APIDocsPage() {
  const [selectedExample, setSelectedExample] = useState(0)
  const [copiedCode, setCopiedCode] = useState<number | null>(null)

  const copyToClipboard = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(index)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
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
              API Documentation
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
              Integrate our <strong>stem separation</strong> and <strong>vocal remover online</strong> technology 
              into your applications with our powerful REST API.
            </p>
            <div className="mt-8">
              <a
                href="#getting-started"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                <Code className="mr-2 h-5 w-5" />
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div id="getting-started" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Quick Start</h2>
            <p className="mt-4 text-lg text-gray-600">
              Get up and running with our <strong>audio separation by artificial intelligence</strong> API in minutes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 mb-4">
                <Key className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Get API Key</h3>
              <p className="text-gray-600">
                Sign up for a Pro or Enterprise plan to get your API key for accessing our 
                <strong> music separation</strong> endpoints.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Make Request</h3>
              <p className="text-gray-600">
                Upload your audio file and specify which stems to extract using our 
                <strong> instrumental separator</strong> technology.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Get Results</h3>
              <p className="text-gray-600">
                Receive high-quality separated stems for your <strong>voice separation</strong> and 
                <strong> music splitter</strong> applications.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Authentication</h2>
            <p className="mt-4 text-lg text-gray-600">
              All API requests require authentication using your API key.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <Key className="h-6 w-6 text-primary-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">API Key Authentication</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Include your API key in the Authorization header of all requests:
            </p>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <code className="text-green-400">
                Authorization: Bearer YOUR_API_KEY
              </code>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="text-sm font-semibold text-yellow-800">Security Note</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Keep your API key secure and never expose it in client-side code. 
                    Use environment variables or secure key management systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">API Endpoints</h2>
            <p className="mt-4 text-lg text-gray-600">
              Complete reference for our <strong>video vocal remover</strong> and 
              <strong> audio separation</strong> API endpoints.
            </p>
          </div>
          
          <div className="space-y-8">
            {apiEndpoints.map((endpoint, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                        endpoint.method === 'POST' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="ml-4 text-lg font-mono text-gray-900">{endpoint.path}</code>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{endpoint.title}</h3>
                  <p className="text-gray-600 mb-6">{endpoint.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Parameters</h4>
                      <div className="space-y-3">
                        {endpoint.parameters.map((param, paramIndex) => (
                          <div key={paramIndex} className="border-l-4 border-primary-200 pl-4">
                            <div className="flex items-center">
                              <code className="text-sm font-mono text-primary-600">{param.name}</code>
                              <span className="ml-2 text-sm text-gray-500">({param.type})</span>
                              {param.required && (
                                <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                                  Required
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{param.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Response</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <pre className="text-sm text-gray-700 overflow-x-auto">
                          {JSON.stringify(endpoint.response.success, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Code Examples</h2>
            <p className="mt-4 text-lg text-gray-600">
              Get started quickly with these code examples for our <strong>stem separation tool</strong> API.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                {codeExamples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedExample(index)}
                    className={`px-6 py-3 text-sm font-medium ${
                      selectedExample === index
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {example.language}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-900 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{codeExamples[selectedExample].title}</h3>
                  <button
                    onClick={() => copyToClipboard(codeExamples[selectedExample].code, selectedExample)}
                    className="flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === selectedExample ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{codeExamples[selectedExample].code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Handling */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Error Handling</h2>
            <p className="mt-4 text-lg text-gray-600">
              Understanding error responses and status codes for our <strong>vocal remover and isolation</strong> API.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {errorCodes.map((error, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-3">
                  <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                    {error.code}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{error.title}</h3>
                <p className="text-gray-600 mb-4">{error.description}</p>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Common examples:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    {error.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rate Limits */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Rate Limits</h2>
            <p className="mt-4 text-lg text-gray-600">
              API rate limits and usage quotas for our <strong>music separation</strong> services.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Requests per Minute</h3>
                <p className="text-3xl font-bold text-primary-600 mb-2">60</p>
                <p className="text-sm text-gray-600">Maximum requests per minute</p>
              </div>
              
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Quota</h3>
                <p className="text-3xl font-bold text-primary-600 mb-2">200</p>
                <p className="text-sm text-gray-600">Minutes of processing (Pro plan)</p>
              </div>
              
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mx-auto mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">File Size Limit</h3>
                <p className="text-3xl font-bold text-primary-600 mb-2">200MB</p>
                <p className="text-sm text-gray-600">Maximum file size per request</p>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-800">Rate Limit Headers</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    All API responses include rate limit information in the headers:
                    <code className="block mt-2 bg-blue-100 px-2 py-1 rounded text-xs">
                      X-RateLimit-Limit: 60<br/>
                      X-RateLimit-Remaining: 45<br/>
                      X-RateLimit-Reset: 1640995200
                    </code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Integrate?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Start building with our <strong>stem separation</strong> and 
              <strong> audio separation by artificial intelligence</strong> API today.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/pricing"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                <Key className="mr-2 h-5 w-5" />
                Get API Access
              </a>
              <a
                href="/contact"
                className="inline-flex items-center rounded-lg bg-primary-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
