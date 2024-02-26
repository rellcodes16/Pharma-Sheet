import Modal from "../../ui/Modal"
import ExpenseForm from "./ExpenseForm"

const AddToExpense = () => {
  return (
    <Modal>
        <Modal.Open openModalName='expense-name'>
            <button className=" bg-green-700 p-2 rounded-md mb-3 text-gray-200 ">Add to Expense</button>
        </Modal.Open>
        <Modal.Window name='expense-name'>
            <ExpenseForm />
        </Modal.Window>
    </Modal>
  )
}

export default AddToExpense
