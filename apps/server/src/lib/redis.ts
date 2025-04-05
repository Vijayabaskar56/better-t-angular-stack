import Redis from 'ioredis'

const redis = new Redis({
  host: process.env.REDIS_URI,
  port: 6379,
  password: process.env.REDIS_PASSWORD ?? '',
  enableOfflineQueue: false
})
export default redis
