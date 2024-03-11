import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useDarkMode } from "../context/ColorModeToggle";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

// const fakeData = [
//   { label: "Jan 09", totalSales: 48000 },
//   { label: "Jan 10", totalSales: 58600},
//   { label: "Jan 11", totalSales: 55000},
//   { label: "Jan 12", totalSales: 60100},
//   { label: "Jan 13", totalSales: 71200},
//   { label: "Jan 14", totalSales: 80220},
//   { label: "Jan 15", totalSales: 70000},
//   { label: "Jan 16", totalSales: 65000},
//   { label: "Jan 17", totalSales: 60000},
//   { label: "Jan 18", totalSales: 55890},
//   { label: "Jan 19", totalSales: 70700},
//   { label: "Jan 20", totalSales: 8000},
//   { label: "Jan 21", totalSales: 71250},
//   { label: "Jan 22", totalSales: 810},
//   { label: "Jan 23", totalSales: 95200},
//   { label: "Jan 24", totalSales: 97100},
//   { label: "Jan 25", totalSales: 90000},
//   { label: "Jan 26", totalSales: 95490},
//   { label: "Jan 27", totalSales: 8500},
//   { label: "Jan 28", totalSales: 900},
//   { label: "Jan 29", totalSales: 800},
//   { label: "Jan 30", totalSales: 9500},
//   { label: "Jan 31", totalSales: 1100},
//   { label: "Feb 01", totalSales: 1200},
//   { label: "Feb 02", totalSales: 1250},
//   { label: "Feb 03", totalSales: 1400},
//   { label: "Feb 04", totalSales: 1500},
//   { label: "Feb 05", totalSales: 140100},
//   { label: "Feb 06", totalSales: 1450},
// ];

function SalesBarChart({ sales, numDays }) {
    const { isDarkMode } = useDarkMode()

    const allDates = eachDayOfInterval({
      start: subDays(new Date(), numDays - 1),
      end: new Date(),
    })
    console.log(allDates)
  
    const data = allDates.map((date) => {
      return {
        label: format(date, 'MMM dd'),
        totalSales: sales.filter(sale => isSameDay(date, new Date(sale.created_at))).reduce((acc, cur) => acc + cur.totalPrice, 0),
      }
    })

    console.log(data)
    
  const colors = isDarkMode
  ? {
      totalSales: { stroke: "#37c561", fill: "#37c561" },
      text: "#e5e7eb",
      background: "#18212f",
    }
  : {
      totalSales: { stroke: "#37c561", fill: "#c7d2fe" },
      text: "#374151",
      background: "#fff",
    };
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold dark:text-gray-400 text-gray-800">Sales from {format(allDates.at(0), 'MMM dd yyyy')} &mdash; {format(allDates.at(-1), 'MMM dd yyyy')} </h1>
    <ResponsiveContainer height={300} width='100%'>
      <AreaChart data={data}>
        <XAxis dataKey='label' tick={{fill: colors.text}} tickLine={{stroke: colors.text}}/>
        <YAxis tick={{fill: colors.text}} tickLine={{stroke: colors.text}}/>
        <CartesianGrid strokeDasharray='4'/>
        <Tooltip contentStyle={{ backgroundColor: colors.background }}/>
        <Area
          dataKey='totalSales' 
          type='monotone' 
          stroke={colors.totalSales.stroke.fill} 
          fill={colors.totalSales.stroke}
          strokeWidth={2}
          name="Total sales"
          unit='$'
        />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  )
}

export default SalesBarChart
