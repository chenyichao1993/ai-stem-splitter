const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Supabase配置
const supabaseUrl = process.env.SUPABASE_URL || 'https://vantbrqbbsvwqsrilmoo.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhbnRicnFiYnN2d3FzcmlsbW9vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTM4NzkwMCwiZXhwIjoyMDc0OTYzOTAwfQ.FVPj2-3Qx7V-Gk5SHMP6ZcG0qrvVHvza-jjL0I8e4bs';

// 创建Supabase客户端（使用service role key，可以绕过RLS）
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 存储桶名称
const BUCKET_NAME = 'audio-files';

module.exports = {
  supabase,
  BUCKET_NAME
};
