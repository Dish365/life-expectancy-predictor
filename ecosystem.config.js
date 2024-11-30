module.exports = {
  apps: [{
    name: 'life-expectancy-predictor',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      NEXT_PUBLIC_API_BASE_URL: 'https://fsroas.com/api'
    },
    watch: false,
    instances: 1,
    exec_mode: 'cluster',
    max_memory_restart: '500M'
  }]
} 