import { HiPencil, HiTrash } from "react-icons/hi2"
import Table from "../../ui/Table"
import Modal from "../../ui/Modal"
import ConfirmDeletion from "../../ui/ConfirmDeletion"
import { Menu, List, Toggle, Button } from "../../ui/Menu"
import { formatCurrency } from "../../utils/helpers"
import { useDeleteExpense } from "./useDeleteExpense"
import ExpenseForm from "./ExpenseForm"



const ExpenseCard = ({ expenseItem }) => {
    const { isDeleting, deleteExpense } = useDeleteExpense()

    const { id: expenseId, expense_name, expense_price  } = expenseItem
    
  return (
    <Table.Row role='row' className="grid sm:gap-2 gap-5 p-3 items-center overflow-x-auto min-w-[500px] bg-gray-50 dark:bg-slate-800 dark:text-gray-300 border border-solid text-center dark:border-gray-600 border-gray-100 font-bold text-gray-600 sm:py-[1.1rem] sm:px-[2rem]" style={{ gridTemplateColumns: '0.3fr 1.8fr 1fr 0.5fr'}}>
        <p className="min-w-[50px]">{expenseId}</p>
        <p className="min-w-[180px]">{expense_name}</p>
        <p className="min-w-[100px]">{formatCurrency(expense_price)}</p>
        
        <Modal>
          <div className="flex items-center justify-end">
            <Menu>
            <Toggle id={expenseId}/>
            <List id={expenseId}>
                <Modal.Open openModalName='edit'>
                  <Button icon={<HiPencil />}>Edit</Button>
                </Modal.Open>
                <Modal.Open openModalName='delete'>
                  <Button icon={<HiTrash />}>Delete</Button>
                </Modal.Open>
            </List>
            </Menu>
            <Modal.Window name='edit'>
              <ExpenseForm expenseToUpdate={expenseItem}/>
            </Modal.Window>
            <Modal.Window name='delete'>
              <ConfirmDeletion itemName='expense' disabled={isDeleting} onConfirm={() => deleteExpense(expenseId)}/>
            </Modal.Window>
          </div>
        </Modal>
    </Table.Row>
  )
}

export default ExpenseCard