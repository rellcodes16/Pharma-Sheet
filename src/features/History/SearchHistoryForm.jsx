import { useForm } from "react-hook-form"
import FormRow from "../../ui/FormRow"
import Button from "../../ui/Button"
import { useSearch } from "../../services/SearchContext"
import { searchHistory } from "../../services/apiHistory"

function SearchHistoryForm({ onCloseModal }) {
    const { register, handleSubmit, reset, formState } = useForm()
    const { setSearchResult } = useSearch()

    console.log("setSearchResult is a function: ", typeof setSearchResult === 'function');

    const { errors } = formState

    const handleSearchHistory = async (formData) => {
        try {
            const { clientName } = formData;
            const result = await searchHistory(clientName);
            console.log('result', result)
            setSearchResult(result);
            reset();
            onCloseModal?.();
        } catch (error) {
            console.error(error.message); 
        }
    };

  return (
    <form onSubmit={handleSubmit(handleSearchHistory)}>
        <FormRow label='Search Client&apos; Name' error={errors?.name?.message}>
            <input type="text" id="search-name" className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3" 
                {...register ('clientName',{required: 'This field is required'})
            }/>
        </FormRow>
        <FormRow>
            <Button type='primary' >
                Search
            </Button>
        </FormRow>
    </form>
  )
}

export default SearchHistoryForm


