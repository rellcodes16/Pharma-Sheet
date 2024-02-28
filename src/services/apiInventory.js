import { PAGE_SIZE } from "../utils/helpers";
import supabase from "./supabase";

export async function getInventory({ page }){
    let query = supabase.from('inventory').select('*', { count: 'exact' })

    if(page){
        const from = (page - 1) * PAGE_SIZE
        const to = from + PAGE_SIZE - 1
        query = query.range(from, to)
    }

    const { data, error, count } = await query


    if(error){
        console.error(error)
        throw new Error('Inventory Data could not be loaded')
    }

    console.log(data)
    return { data, count };
}

export async function getInventoryWithoutPagination(){
  const { data, error } = await supabase.from('inventory').select('*')

  if(error){
    console.error(error)
    throw new Error('Inventory Data could not be loaded')
  }

  console.log(data)
  return data;
}

export async function createInventory(newInventory){
    const { data, error } = await supabase.from('inventory').insert([newInventory])
    .select()

    if(error){
        console.error(error)
        throw new Error('Inventory Data could not be loaded')
    }

    return data;
}

export async function checkForDuplicateMedication(medication_name){
  const { data, error } = await supabase.from('inventory').select('id').eq('medication_name', medication_name).single();

  // if (error) {
  //   console.error(error);
  //   throw new Error("Error checking for duplicate medication");
  // }

  // No matching record found, so add the medication
  if (data === null) {
    return false; // No duplicate found
  }

  return true; // Duplicate found
}



export async function updateInventory(newInventory, id) {
    const { data, error } = await supabase.from("inventory").update({...newInventory}).eq("id", id).select().single();
  
    if (error) {
      console.error(error);
      throw new Error("Inventory item could not be updated");
    }
    return data;
}

export async function getExistingUnit(id) {
    const { data: existingData, error } = await supabase.from('inventory').select('*').eq('id', id).single();

    
    if (error) {
        console.error(error);
        throw new Error("Inventory item could not be updated");
    }
    console.log(existingData)
    return existingData;
}


export async function searchInventory(medication_name){
    try {
        const { data, error } = await supabase 
            .from('inventory')
            .select('*')
            .ilike('medication_name', `%${medication_name}%`);


        if (error) {
            console.error(error);
            throw new Error("Medication name not found");
        }

        console.log('gahay', medication_name)
        console.log('data', data)

        if (data && data.length > 0) {
            console.log('data', data)

            return data;
            // document.getElementById("price").value = unitPrice;
        } 
        else {
            console.log(`No data found for medication name: ${medication_name}`);
        }
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching medication details");
    }
}

export async function deleteInventory(id) {
    const { data, error } = await supabase.from("inventory").delete().eq("id", id);
  
    if (error) {
      console.error(error);
      throw new Error("Inventory Item could not be deleted");
    }
  
    return data;
}

  export const fetchInventoryById = async (inventoryId) => {
    const { data, error } = await supabase
      .from('inventory')
      .select('units')
      .eq('id', inventoryId)
      .single();
    
    if (error) {
      throw new Error('Error fetching inventory data: ' + error.message);
    }
  
    return data;
  };
  
  export const updateInventoryUnits = async (inventoryId, newQuantity) => {
    const { data, error } = await supabase
      .from('inventory')
      .update({ units: newQuantity })
      .eq('id', inventoryId);
    
    if (error) {
      throw new Error('Error updating inventory units: ' + error.message);
    }
  
    return data;
  };