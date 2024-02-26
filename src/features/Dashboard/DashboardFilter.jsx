import DashboardSelect from "../../ui/DashboardSelect"

function DashboardFilter() {
  return (
    <div className="text-end mb-7">
        <DashboardSelect filterField='duration' options={[
            {value: '7', label: 'One Week'},
            {value: '30', label: 'One Month'},
            {value: '365', label: 'One Year'},
        ]}/>
    </div>
  )
}

export default DashboardFilter
