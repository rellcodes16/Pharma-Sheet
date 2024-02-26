import Modal from "../../ui/Modal"
import CreateNewSales from "./CreateNewSales"

const AddToSales = () => {
  return (
    <Modal>
        <Modal.Open openModalName='sales-name'>
            <button className=" bg-green-700 p-2 rounded-md mb-3 text-gray-200">Add to Sales</button>
        </Modal.Open>
        <Modal.Window name='sales-name'>
            <CreateNewSales />
        </Modal.Window>
    </Modal>
  )
}

export default AddToSales
