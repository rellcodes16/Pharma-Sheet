import Modal from "../../ui/Modal"
import CreateInventoryForm from "./CreateInventoryForm"

const AddToInventory = () => {
  return (
    <Modal>
        <Modal.Open openModalName='inventory-name'>
            <button className=" bg-green-700 p-2 rounded-md mb-3 text-gray-200">Add to Inventory</button>
        </Modal.Open>
        <Modal.Window name='inventory-name'>
            <CreateInventoryForm />
        </Modal.Window>
    </Modal>
  )
}

export default AddToInventory
