import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import type { RootState } from '../../store'


const PieChartComponent = () => {
    const workouts = useSelector((state: RootState) => state.workouts.workouts)
    
    const pieData = useMemo(() => {
      const counts: Record<string, number> = {}
      workouts.forEach(w => {
        w.name
          .split(',')
          .map(tag => tag.trim())
          .filter(Boolean)
          .forEach(tag => {
            counts[tag] = (counts[tag] || 0) + 1
          })
        })
    
        return Object.entries(counts).map(([name, value]) => ({
          name,
          value,
        }))
    }, [workouts])

    const totalMentions = useMemo(
        () => pieData.reduce((sum, d) => sum + d.value, 0),
        [pieData]
    ) 

  return (
    <>
        <PieChart style={{ background: 'gray', width: '100%', height: '400px', paddingTop: '20px' }}>
            <Pie 
            data={pieData} 
            dataKey="value" 
            nameKey="name" 
            stroke="#000"
            label={slice => {
              const percent = ((slice.value / totalMentions) * 100).toFixed(0)
              return `${slice.name} - ${percent}% (${slice.value})`
            }}
            >
            {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#fb923c' : '#003c82'} />
            ))}
            </Pie>
            <Tooltip />
        </PieChart>
    </>
  )
}

export default PieChartComponent