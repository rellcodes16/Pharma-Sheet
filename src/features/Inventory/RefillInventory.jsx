import { useState } from 'react'
import Button from "../../ui/Button"
import supabase from '../../services/supabase'
import { useQueryClient } from '@tanstack/react-query'
// import { useRefillInventory } from './useRefillInventory'

function RefillInventory({ inventoryId, onCloseModal }) {
    const [unit, setUnit] = useState(0)
    const queryClient = useQueryClient()

    // const { refill, isRefilling } = useRefillInventory()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data: prevData, error: prevError } = await supabase.from('inventory').select('units').eq('id', inventoryId).single();

        if(prevError){
            console.log('Error fetching previous quantity', prevError.message)
            return;
        }

        const previousQuantity = parseInt(prevData.units)

        const newQuantity = (previousQuantity + parseInt(unit))

        const { data: updatedData, error: updateError } = await supabase.from('inventory').update({ units: newQuantity}).eq('id', inventoryId)

        if(updateError){
            console.log('Error updating inventory', updateError.message)
            return;
        }

        console.log('Inventory updated successfully:', updatedData)

        setUnit(0)
        onCloseModal()

        queryClient.invalidateQueries('inventory');
    }

  return (
    <form className="flex flex-col gap-2 justify-center items-start" onSubmit={handleSubmit}>
        <h1 className="mb-3 font-bold text-xl p-2">Refill Units</h1>
        <input type="number" name="unit" className="border border-black rounded-lg" value={unit} onChange={(e) => setUnit(parseInt(e.target.value))}/>
        <Button type='primary'>Refill</Button>
    </form>
  )
}

export default RefillInventory

// import { useState } from 'react';
// import supabase from '../../services/supabase'; // Import your Supabase client
// import Button from "../../ui/Button";
// import { useInventory } from './useInventory';

// function RefillInventory() {
//     const [unit, setUnit] = useState('');
//     const { inventory } = useInventory()
//     const { id } = inventory

//     const handleRefill = async (e) => {
//         e.preventDefault()
//         try {
//             // Fetch the current unit value from the inventory table
//             const { data, error } = await supabase
//                 .from('inventory')
//                 .select('units')
//                 .eq('id', id); // Replace 'inventoryItemId' with the actual ID of the inventory item

//             if (error) {
//                 throw error;
//             }

//             const currentUnit = data[0].units;
//             console.log(currentUnit)

//             // Calculate the new unit value by adding the refill units
//             const newUnit = parseInt(currentUnit) + parseInt(unit);
//             console.log(newUnit)

//             // Update the inventory table with the new unit value
//             const { updateError } = await supabase
//                 .from('inventory')
//                 .update({ units: newUnit })
//                 .eq('id', id); // Replace 'inventoryItemId' with the actual ID of the inventory item

//             if (updateError) {
//                 throw updateError;
//             }

//             // Reset the unit state after successful refill
//             setUnit('');
//             console.log('Refill successful');
//         } catch (error) {
//             console.error('Error refilling inventory:', error.message);
//         }
//     };

//     return (
//         <form className="flex flex-col gap-2 justify-center items-start">
//             <h1 className="mb-3 font-bold text-xl p-2">Refill Units</h1>
//             <input
//                 type="number"
//                 name="unit"
//                 className="border border-black rounded-lg"
//                 value={unit}
//                 onChange={(e) => setUnit(e.target.value)}
//             />
//             <Button type='primary' onClick={handleRefill}>Refill</Button>
//         </form>
//     );
// }

// export default RefillInventory;
