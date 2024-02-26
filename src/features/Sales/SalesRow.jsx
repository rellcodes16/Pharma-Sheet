import { HiMiniDocumentText, HiPencil, HiTrash } from "react-icons/hi2"
import Table from "../../ui/Table"
import Modal from "../../ui/Modal"
import ConfirmDeletion from "../../ui/ConfirmDeletion"
import { Menu, List, Toggle, Button } from "../../ui/Menu"
import { convertTimestamp, formatCurrency } from "../../utils/helpers"
import CreateNewSales from "./CreateNewSales"
import { useDeleteSale } from "./useDeleteSales"
import SalesInvoice from "./SalesInvoice"


const SalesRow = ({ salesItem }) => {
  console.log(salesItem)
    const { id: salesId, medName, clientName, batchNo, price, quantity, dateAndTime, dosage, totalPrice, costPrice, totalCost } = salesItem

    const { isDeleting, deleteSale } = useDeleteSale()

    
  return (
    <Table.Row role='row' className="grid sm:gap-2 gap-5 p-3 items-center min-w-[1900px] dark:bg-slate-800 dark:text-gray-300 dark:border-gray-600 bg-gray-50 border border-solid text-center border-gray-100 font-bold text-gray-600 sm:py-[0.8rem] sm:px-[1rem]" style={{ gridTemplateColumns: '2fr 1.1fr 1.7fr 1.1fr 1.1fr 1fr 1.5fr 1fr 1.1fr 1.1fr 0.2fr'}}>
        <p className="min-w-[200px]">{medName}</p>
        <p className="min-w-[120px]">{clientName}</p>
        <p className="min-w-[200px]">{batchNo}</p>
        <p className="min-w-[200px]">{costPrice}</p>
        <p className="min-w-[200px]">{price}</p>
        <p className="min-w-[200px]">{quantity}</p>
        <p className="min-w-[80px]">{convertTimestamp(dateAndTime)}</p>
        <p className="min-w-[200px]">{dosage}</p>
        <p className="min-w-[120px]">{formatCurrency(totalCost)}</p>
        <p className="min-w-[120px]">{formatCurrency(totalPrice)}</p>

                 
        <Modal>
          <div className="flex items-center justify-end">
            <Menu>
            <Toggle id={salesId}/>
            <List id={salesId}>
                <Modal.Open openModalName='edit'>
                  <Button icon={<HiPencil />}>Edit</Button>
                </Modal.Open>
                <Modal.Open openModalName='delete'>
                  <Button icon={<HiTrash />}>Delete</Button>
                </Modal.Open>
                <Modal.Open openModalName='invoice'>
                  <Button icon={<HiMiniDocumentText />}>Invoice</Button>
                </Modal.Open>
            </List>
            </Menu>
            <Modal.Window name='edit'>
              <CreateNewSales saleToUpdate={salesItem}/>
            </Modal.Window>
            <Modal.Window name='delete'>
              <ConfirmDeletion disabled={isDeleting} onConfirm={() => deleteSale(salesId)}/>
            </Modal.Window>
            <Modal.Window name='invoice'>
              <SalesInvoice salesId={salesId}/>
            </Modal.Window>
          </div>
        </Modal>
    </Table.Row>
  )
}

export default SalesRow