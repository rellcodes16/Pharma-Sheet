import { useSearchParams } from "react-router-dom";
import SortSelect from "./SortSelect";

function DashboardSelect({ options, filterField }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get(filterField) || options[0].value;

    function handleClick(event) {
        const value = event.target.value;
        searchParams.set(filterField, value);
        if (searchParams.get('page')) searchParams.set('page', '1');
        setSearchParams(searchParams.toString());
    }

    return (
        <SortSelect options={options} value={currentFilter} onChange={handleClick}/>
    );
}

export default DashboardSelect;
