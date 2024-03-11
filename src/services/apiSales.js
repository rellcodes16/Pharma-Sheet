import { PAGE_SIZE, getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getSales({ page }){
    let salesQuery = supabase.from('sales').select('*', { count: 'exact' })

    if(page){
        const from = (page - 1) * PAGE_SIZE
        const to = from + PAGE_SIZE - 1
        salesQuery = salesQuery.range(from, to)
    }

    const { data, error, count } = await salesQuery


    if(error){
        console.error(error)
        throw new Error('Sales Data could not be loaded')
    }


    console.log(data)
    return {data, count};
}

export async function getInventoryData() {
  const { data, error } = await supabase.from('inventory').select('*');

  if (error) {
    console.error(error);
    throw new Error("Inventory Data could not be loaded");
  }
  return data;
}
  

export async function createSales(newSale){
    const { data: salesData, error: salesError } = await supabase.from('sales').insert([newSale]).select()
    const { data: historyData, error: historyError } = await supabase.from('history').insert([newSale]).select()

    if(historyError){
        console.error(historyError)
        throw new Error('Sales Data could not be loaded')
    }

    if(salesError){
        console.error(salesError)
        throw new Error('Sales Data could not be loaded')
    }

    return { salesData, historyData };
}



export async function updateSales(newSale, id) {
    const { data: updateSaleData, error: updateSaleError } = await supabase.from("sales").update({...newSale}).eq("id", id).select().single();
  
    if (updateSaleError) {
      console.error(updateSaleError);
      throw new Error("Sale data could not be updated");
    }

    const updatedData = { id, ...newSale}
    console.log(updatedData)
    const { data: updateHistoryData, error: updateHistoryError } = await supabase.from("history").insert([updatedData]);
  
    if (updateHistoryError) {
      console.error(updateHistoryError);
      throw new Error("History data could not be updated");
    }
    console.log('smjjs', { updateSaleData, updateHistoryData })
    return { updateSaleData, updateHistoryData };
}

export async function deleteSales(id) {
    const { data, error } = await supabase.from("sales").select('*').eq("id", id).single();

    if (error) {
        console.error(error);
        throw new Error("Failed to fetch sale data for deletion");
    }

    const deletedSale = data;

    const { insertError } = await supabase.from("history").insert([deletedSale]);

    if (insertError) {
        console.error(insertError);
        throw new Error("Failed to archive sale data");
    }

    const { deleteError } = await supabase.from("sales").delete().eq("id", id);

    if (deleteError) {
        console.error(deleteError);
        throw new Error("Sale Item could not be deleted");
    }

    console.log(id);
    return data;
}

//FOR HANDLING RECEIVING DATA FROM INVENTORY
export async function getMedicationDetails(medDetails) {
    try {
        const { data, error } = await supabase
            .from("inventory")
            .select('*').ilike('medication_name', medDetails);

        if (error) {
            console.error(error);
            throw new Error("Failed to fetch medication details");
        }

        console.log('details', medDetails)
        console.log('data', data)

        if (data && data.length > 0) {
            console.log('data', data)
            const costPrice = data[0].costPrice
            const unitPrice = data[0].unitPrice; 
            const units = data[0].units;
            console.log(`Unit Price: ${unitPrice}`);
            console.log(`Units : ${units}`)
            console.log(data)
            return {unitPrice, costPrice};
            // document.getElementById("price").value = unitPrice;
        } 
        else {
            console.log(`No data found for medication name: ${medDetails}`);
        }
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching medication details");
    }
}


export const getInventoryDetails = async (medName) => {
  console.log(medName)
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .ilike('medication_name', medName)

    if (error) {
      throw new Error(`Error fetching inventory details: ${error.message}`);
    }

    if (data) {
      console.log(data)
      return data; 
    } else {
      throw new Error(`Inventory details not found for medication: ${medName}`);
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const updateInventoryQuantity = async (medName, newQuantity) => {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .update({ units: newQuantity })
      .eq('medication_name', medName);

    if(data){
        return data;
    }

    if (error) {
      throw new Error(`Error updating inventory quantity: ${error.message}`);
    }

    console.log(`Inventory quantity updated for medication: ${medName}`);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};


export async function getSaleInvoice(salesId){
    const { data, error } = await supabase.from('sales').select('*').eq('id', salesId).single();

    if (error) {
        console.error(error);
        throw new Error("Sale Item could not be deleted");
    }
    
    // return data;
    console.log('data', data)
    return data;
}

export async function getSalesAfterDate(date) {
  const { data, error } = await supabase.from("history").select("created_at, totalPrice, totalCost").gte("created_at", date).lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Sales could not get loaded");
  }

  console.log('sales data', data)
  return data;
}
