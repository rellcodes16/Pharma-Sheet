import { useForm } from "react-hook-form"
import FormRow from "../../ui/FormRow"
import Button from "../../ui/Button"
import { useCreateExpense } from "./useCreateExpense"
import { useUpdateExpense } from "./useUpdateExpense"

const ExpenseForm = ({ onCloseModal, expenseToUpdate = {} }) => {
  const {id: expenseId, ...updateValues} = expenseToUpdate;
  const isUpdateSession = Boolean(expenseId)

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isUpdateSession ? updateValues : {}
  })

  const { errors } = formState

  const { isCreating, createExpense } = useCreateExpense()
  const { isUpdating, updateExpense } = useUpdateExpense()

  const isWorking = isCreating || isUpdating

  const handleSubmitExpense = (data) => {
    if(isUpdateSession)
      updateExpense({ newExpenseData: {...data}, id:expenseId}, 
      {
        onSuccess: () => {
          reset();
          onCloseModal?.()
        }
      }
    )

    else
      createExpense({...data},
      {
        onSuccess: () => {
          reset();
          onCloseModal?.()
        }
      }
    )


  }

  const handleReset = () => {
    reset();
    onCloseModal()
  }

  const handleError = (errors) => {
    console.log(errors)
  }
  return (
    <form onSubmit={handleSubmit(handleSubmitExpense, handleError)} className="p-5">
      <FormRow label='Expense name' error={errors?.expense_name?.message}>
        <input type="text" id="name" className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3" disabled={isWorking} {...register ('expense_name',{required: 'This field is required'})}/>
      </FormRow>
      <FormRow label='Expense price' error={errors?.expense_price?.message}>
        <input type="number" id="price" className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3" disabled={isWorking} {...register ('expense_price', 
        {required: 'This field is required', 
          min: {
            value: 0,
            message: 'Unit must be at least 1'
          }})}/>
      </FormRow>
      <FormRow>
        <div className="flex justify-between gap-5">
        <button type="button" className="p-2 rounded-md mb-3 text-gray-600 inline-block cursor:pointer bg-gray-400 dark:text-gray-900" onClick={handleReset} disabled={isWorking}>
          Cancel
        </button>

        <Button disabled={isWorking} type='primary'>
          {
            isUpdateSession ? 'Edit Expense' : 'Add Expense'
          }
        </Button>
        </div>
      </FormRow>
    </form>
  )
}

export default ExpenseForm
