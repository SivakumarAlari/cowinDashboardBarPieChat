import {BarChart, XAxis, YAxis, Legend, Bar} from 'recharts'

import './index.css'

// Write your code here
const VaccinationCoverage = props => {
  const {data} = props
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <BarChart
      width={950}
      height={350}
      data={data}
      margin={{
        top: 15,
      }}
    >
      <XAxis dataKey="vaccineDate" tick={{stroke: 'grey', strokeWidth: 1}} />
      <YAxis
        tickFormatter={DataFormatter}
        tick={{stroke: 'gray', strokeWidth: 1}}
      />
      <Legend wrapperStyle={{padding: 30}} />
      <Bar
        dataKey="dose1"
        name="Dose 1"
        fill="#5a8dee"
        barSize="30%"
        borderRadius="10%"
      />
      <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="10%" />
    </BarChart>
  )
}

export default VaccinationCoverage
