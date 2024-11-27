'use client'

import { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { useQuery } from '@apollo/client'
import { GET_CRYPTO_PRICES } from '@/lib/graphql/queries'

type TimePeriod = 'current' | '1h' | '24h';

interface CryptoCurrency {
  id: string
  name: string
  symbol: string
  price: number
  price1hAgo: number
  price24hAgo: number
  dailyHigh: number
  dailyLow: number
  lastUpdated: string
}

export default function PriceChart() {
  const { data, loading, error } = useQuery(GET_CRYPTO_PRICES, {
    pollInterval: 60000,
  })
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('current')
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [isUpdating, setIsUpdating] = useState(false)
  const [showTrendLine, setShowTrendLine] = useState(false);

  const getPrice = (item: any, period: TimePeriod) => {
    switch (period) {
      case '1h':
        return Number(Number(item.price1hAgo).toFixed(3))
      case '24h':
        return Number(Number(item.price24hAgo).toFixed(3))
      default:
        return Number(Number(item.price).toFixed(3))
    }
  }

  const chartData = (data?.allCryptocurrencies || []).map(item => ({
    ...item,
    price: getPrice(item, timePeriod),
    dailyHigh: Number(Number(item.dailyHigh).toFixed(3)),
    dailyLow: Number(Number(item.dailyLow).toFixed(3))
  }))

  useEffect(() => {
    if (data) {
      setIsUpdating(true);
      setTimeout(() => setIsUpdating(false), 1000);
      setLastUpdate(new Date());
    }
  }, [data]);

const LoadingSkeleton = () => (
  <div className="h-[280px] w-full animate-pulse">
    <div className="h-full w-full bg-[rgba(255,255,255,0.05)] rounded-lg" />
  </div>
)

if (loading) return <LoadingSkeleton />

  const option = {
    backgroundColor: 'rgba(13,25,45,0.2)',
    legend: {
      show: true,
      top: '2%',
      left: 'center',
      padding: [5, 10],
      itemGap: 20,
      textStyle: {
        color: 'rgb(253,248,216)',
        fontSize: 14,
        fontWeight: 'lighter'
      },
      data: [
        {
          name: 'CRV',
          icon: 'roundRect',
          itemStyle: { color: '#FF6B6B' }
        },
        {
          name: 'crvUSD',
          icon: 'roundRect',
          itemStyle: { color: '#4ECDC4' }
        },
        {
          name: 'scrvUSD',
          icon: 'roundRect',
          itemStyle: { color: '#2A9D8F' }
        },
        {
          name: 'Daily High',
          icon: 'line',
          lineStyle: { type: 'dashed', color: 'rgba(255,255,255,0.3)' }
        },
        {
          name: 'Price Range',
          icon: 'rect',
          itemStyle: { color: 'rgba(255,255,255,0.05)' }
        }
      ],
      backgroundColor: 'rgba(13,25,45,0.4)',
      borderRadius: 4
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(13,25,45,0.95)',
      borderColor: 'rgba(255,255,255,0.1)',
      textStyle: {
        color: 'rgba(255,255,255,0.9)'
      },
      formatter: function(params: any) {
        const data = params[0].data;
        const priceLabel = (() => {
          switch (timePeriod) {
            case '1h':
              return 'Price 1h ago'
            case '24h':
              return 'Price 24h ago'
            default:
              return 'Current Price'
          }
        })();
        
        return `
          <div class="p-2">
            <div class="font-bold">${data.name}</div>
            <div>${priceLabel}: $${data.value}</div>
            <div>High: $${data.dailyHigh}</div>
            <div>Low: $${data.dailyLow}</div>
          </div>
        `;
      },
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '8%',
      right: '8%',
      top: '15%',
      bottom: '12%',
      containLabel: true,
      backgroundColor: 'rgba(13,25,45,0.4)',
      borderColor: 'rgba(255,255,255,0.05)',
      show: true,
      shadowColor: 'rgba(0, 0, 0, 0.2)',
      shadowBlur: 10
    },
    xAxis: {
      type: 'category',
      data: chartData.map((item: CryptoCurrency) => item.symbol),
      axisLine: {
        lineStyle: { color: 'rgba(255,255,255,0.1)' }
      },
      axisLabel: {
        color: 'rgb(253,248,216)',
        fontSize: 14,
        fontWeight: 'lighter'
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: { 
          color: 'rgba(255,255,255,0.1)',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: 'rgb(253,248,216)',
        fontSize: 14,
        fontWeight: 'lighter',
        formatter: (value: number) => `$${value}`
      }
    },
    series: [
      {
        name: 'Current Price',
        type: 'bar',
        barWidth: '35%',
        data: chartData.map((item: CryptoCurrency) => ({
          value: item.price,
          dailyHigh: item.dailyHigh,
          dailyLow: item.dailyLow,
          name: item.symbol,
          itemStyle: {
            color: (() => {
              const colorMap = {
                'CRV': '#FF6B6B',
                'crvUSD': '#4ECDC4',
                'scrvUSD': '#2A9D8F',
              } as const;
              return colorMap[item.symbol] || '#45B7D1'
            })()
          }
        })),
        markLine: {
          silent: true,
          name: 'Daily High',
          data: chartData.map((item: CryptoCurrency) => ([
            {
              yAxis: item.dailyHigh,
              x: '10%',
              symbol: 'none'
            },
            {
              yAxis: item.dailyHigh,
              x: '90%',
              symbol: 'none'
            }
          ])),
          lineStyle: {
            color: 'rgba(255,255,255,0.3)',
            type: 'dashed'
          }
        },
        markArea: {
          silent: true,
          name: 'Price Range',
          data: chartData.map((item: CryptoCurrency) => ([
            {
              yAxis: item.dailyHigh,
              itemStyle: {
                color: 'rgba(255,255,255,0.05)'
              }
            },
            {
              yAxis: item.dailyLow
            }
          ]))
        }
      },
      ...(showTrendLine ? [{
        name: 'Trend Line',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 2,
          color: '#ffffff50'
        },
        symbol: 'circle',
        symbolSize: 8,
        data: chartData.map((item: CryptoCurrency) => ({
          value: item.price,
          dailyHigh: item.dailyHigh,
          dailyLow: item.dailyLow,
          name: item.symbol
        })),
        z: 2
      }] : [])
    ]
  }

  const TimeToggle = () => (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={() => setShowTrendLine(!showTrendLine)}
        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
          showTrendLine 
            ? 'bg-[rgba(255,255,255,0.1)] text-[rgb(253,248,216)]' 
            : 'bg-transparent text-gray-400 hover:text-[rgb(253,248,216)]'
        }`}
      >
        Trend Line
      </button>
      <div className="flex space-x-2">
        {(['current', '1h', '24h'] as TimePeriod[]).map((period) => (
          <button
            key={period}
            onClick={() => setTimePeriod(period)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              timePeriod === period
                ? 'bg-[rgba(255,255,255,0.1)] text-[rgb(253,248,216)]'
                : 'bg-transparent text-gray-400 hover:text-[rgb(253,248,216)]'
            }`}
          >
            {period === 'current' ? 'Current' : period === '1h' ? '1h ago' : '24h ago'}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div>
      <TimeToggle />
      <div className={`h-[280px] w-full transition-opacity duration-300 ${isUpdating ? 'opacity-70' : 'opacity-100'}`}>
        <ReactECharts 
          option={option}
          style={{ height: '100%', width: '100%' }}
          theme="dark"
        />
      </div>
      <div className="text-sm text-gray-400 text-right mt-2">
        Last updated: {lastUpdate.toLocaleTimeString()}
      </div>
    </div>
  )
}

const PriceInfo = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-[rgba(13,25,45,0.4)] p-4 rounded-lg">
        <h3 className="text-gray-400 text-sm">Last Updated</h3>
        <p className="text-lg font-medium">{new Date().toLocaleTimeString()}</p>
      </div>
      <div className="bg-[rgba(13,25,45,0.4)] p-4 rounded-lg">
        <h3 className="text-gray-400 text-sm">Update Frequency</h3>
        <p className="text-lg font-medium">Every 60s</p>
      </div>
      <div className="bg-[rgba(13,25,45,0.4)] p-4 rounded-lg">
        <h3 className="text-gray-400 text-sm">Data Source</h3>
        <p className="text-lg font-medium">Live Market Data</p>
      </div>
    </div>
  )
}