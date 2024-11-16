import {Cell, Pie, PieChart, Legend} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {data} = props

  return (
    <PieChart width={1000} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        startAngle={0}
        endAngle={360}
        dataKey="count"
      >
        <Cell name="18-44" fill="#2d87bb" />
        <Cell name="44-60" fill=" #a3df9f" />
        <Cell name="Above 60" fill=" #64c2a6" />
      </Pie>
      <Legend iconType="circle" verticalAlign="bottom" layout="horizontal" />
    </PieChart>
  )
}
export default VaccinationByAge
