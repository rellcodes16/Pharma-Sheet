function SortSelect({ options, value, onChange}) {
  return (
    <select value={value} onChange={onChange} className="text-sm py-1 px-1 border border-solid rounded-md bg-gray-100 dark:bg-slate-800 dark:text-gray-300 dark:border-gray-400 font-bold shadow-sm">
        {
            options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)
        }
    </select>
  )
}

export default SortSelect

