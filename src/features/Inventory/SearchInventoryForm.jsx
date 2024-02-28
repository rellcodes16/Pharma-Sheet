import { useForm } from "react-hook-form"
import FormRow from "../../ui/FormRow"
import Button from "../../ui/Button"
import { useSearchInventory } from "./useSearchInventory"
import { searchInventory } from "../../services/apiInventory"
import { useSearch } from "../../services/SearchContext"
import toast from "react-hot-toast"

function SearchInventoryForm({ onCloseModal }) {
    const { register, handleSubmit, reset, formState } = useForm()
    const { setSearchResult } = useSearch()
    // const { isSearching, searchInventory } = useSearchInventory()

    console.log("setSearchResult is a function: ", typeof setSearchResult === 'function');

    const { errors } = formState

    const handleSearch = async (formData) => {
        try {
            const { medication_name } = formData;
            const result = await searchInventory(medication_name);
            console.log('result', result)
            if (!result || result === undefined) {
                toast.error('Result could not be found');
                reset();
                onCloseModal?.();
            } else {
                setSearchResult(result);
                reset();
                onCloseModal?.();
            }
        } catch (error) {
            console.error(error.message); // Log the error
        }
    };

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
        <FormRow label='Search Med. Name' error={errors?.name?.message}>
            <input type="text" id="search-name" className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3" 
                {...register ('medication_name',{required: 'This field is required'})
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

export default SearchInventoryForm


