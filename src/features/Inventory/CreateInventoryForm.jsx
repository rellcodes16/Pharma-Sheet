import { useForm } from "react-hook-form"
import FormRow from "../../ui/FormRow"
import Button from "../../ui/Button"
import { useCreateInventory } from "./useCreateInventory"
import { useUpdateInventory } from "./useUpdateInventory"

const CreateInventoryForm = ({ onCloseModal, inventoryToUpdate = {} }) => {
  const {id: inventoryId, ...updateValues} = inventoryToUpdate;
  const isUpdateSession = Boolean(inventoryId)

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isUpdateSession ? updateValues : {}
  })

  const { errors } = formState

  const { isCreating, createInventory } = useCreateInventory()
  const { isUpdating, updateInventory } = useUpdateInventory()

  const isWorking = isCreating || isUpdating

  const handleSubmitInventory = (data) => {
    if(isUpdateSession)
      updateInventory({ newInventoryData: {...data}, id:inventoryId}, 
      {
        onSuccess: () => {
          reset();
          onCloseModal?.()
        }
      }
    )

    else
      createInventory({...data},
      {
        onSuccess: () => {
          reset();
          onCloseModal?.()
        }
      }
    )


  }

  const handleError = (errors) => {
    console.log(errors)
  }
  return (
    <form onSubmit={handleSubmit(handleSubmitInventory, handleError)} className="p-5">
      <FormRow label='Med name' error={errors?.name?.message}>
        <input type="text" id="name" className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3" disabled={isWorking} {...register ('medication_name',{required: 'This field is required'})}/>
      </FormRow>
      <FormRow label='Units' error={errors?.name?.message}>
        <input type="number" id="units" className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3" disabled={isWorking} {...register ('units', 
        {required: 'This field is required', 
          min: {
            value: 0,
            message: 'Unit must be at least 1'
          }})}/>
      </FormRow>
      <FormRow label='Unit Price' error={errors?.name?.message}>
        <input type="number" id="unitPrice" className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3" disabled={isWorking} {...register ('unitPrice', 
        {required: 'This field is required', 
          min: {
            value: 1,
            message: 'Unit must be at least 1'
          }})}/>
      </FormRow>
      <FormRow label='Cost Price' error={errors?.name?.message}>
        <input type="number" id="costPrice" className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3" disabled={isWorking} {...register ('costPrice', 
        {required: 'This field is required', 
          min: {
            value: 1,
            message: 'Unit must be at least 1'
          }})}/>
      </FormRow>
      <FormRow>
        <div className="flex justify-between gap-5">
        <Button type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking} type='primary'>
          {
            isUpdateSession ? 'Edit Item' : 'Add Item'
          }
        </Button>
        </div>
      </FormRow>
    </form>
  )
}

export default CreateInventoryForm
