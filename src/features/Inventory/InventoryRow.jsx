import { HiBeaker, HiPencil, HiTrash } from "react-icons/hi2"
import Table from "../../ui/Table"
import Modal from "../../ui/Modal"
import CreateInventoryForm from "./CreateInventoryForm"
import ConfirmDeletion from "../../ui/ConfirmDeletion"
import { Menu, List, Toggle, Button } from "../../ui/Menu"
import { useDeleteInventory } from "./useDeleteInventory"
import { formatCurrency } from "../../utils/helpers"
import RefillInventory from "./RefillInventory"


const InventoryRow = ({ inventoryItem }) => {
    const { id: inventoryId, medication_name, units, unitPrice, costPrice, status} = inventoryItem

    const { isDeleting, deleteInventoryItem } = useDeleteInventory()
    
  return (
    <Table.Row role='row' className="grid sm:gap-2 gap-5 p-3 items-center min-w-[1000px] bg-gray-50 dark:bg-slate-800 dark:text-gray-300 border border-solid text-center dark:border-gray-600 border-gray-100 font-bold text-gray-600 sm:py-[1.1rem] sm:px-[2rem]" style={{ gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1fr 0.5fr'}}>
        <p className="min-w-[200px]">{medication_name}</p>
        <p className="min-w-[50px]">{units}</p>
        <p className="min-w-[80px]">{formatCurrency(unitPrice)}</p>
        <p className="min-w-[80px]">{formatCurrency(costPrice)}</p>
        <p className={`rounded-full text-gray-200 w-40 className="min-w-[160px]" ${status === 'Filled' && 'bg-green-600'} ${status === 'Limited' &&'bg-gray-500'} ${status === 'Empty' && 'bg-red-500'}`}>{status}</p>
        
        <Modal>
          <div className="flex items-center justify-end">
            <Menu>
            <Toggle id={inventoryId}/>
            <List id={inventoryId}>
                <Modal.Open openModalName='edit'>
                  <Button icon={<HiPencil />}>Edit</Button>
                </Modal.Open>
                <Modal.Open openModalName='delete'>
                  <Button icon={<HiTrash />}>Delete</Button>
                </Modal.Open>
                <Modal.Open openModalName='refill'>
                  <Button icon={<HiBeaker />}>Refill</Button>
                </Modal.Open>
            </List>
            </Menu>
            <Modal.Window name='edit'>
              <CreateInventoryForm inventoryToUpdate={inventoryItem}/>
            </Modal.Window>
            <Modal.Window name='delete'>
              <ConfirmDeletion itemName='inventory' disabled={isDeleting} onConfirm={() => deleteInventoryItem(inventoryId)}/>
            </Modal.Window>
            <Modal.Window name='refill'>
              <RefillInventory inventoryId={inventoryId}/>
            </Modal.Window>
          </div>
        </Modal>
    </Table.Row>
  )
}

export default InventoryRow