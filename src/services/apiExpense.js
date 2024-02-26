import { PAGE_SIZE } from "../utils/helpers";
import supabase from "./supabase";

export async function getExpense({ page }){
    let query = supabase.from('expense').select('*', { count: 'exact' })

    if(page){
        const from = (page - 1) * PAGE_SIZE
        const to = from + PAGE_SIZE - 1
        query = query.range(from, to)
    }

    const { data, error, count } = await query


    if(error){
        console.error(error)
        throw new Error('Expense Data could not be loaded')
    }

    console.log(data)
    return { data, count };
}

export async function createExpense(newExpense){
    const { data, error } = await supabase.from('expense').insert([newExpense])
    .select()

    if(error){
        console.error(error)
        throw new Error('Expense Data could not be created')
    }

    return data;
}

export async function updateExpense(newExpense, id) {
    const { data, error } = await supabase.from("expense").update({...newExpense}).eq("id", id).select().single();
  
    if (error) {
      console.error(error);
      throw new Error("Expense item could not be updated");
    }
    return data;
}


export async function searchExpense(expense_name){
    try {
        const { data, error } = await supabase 
            .from('expense')
            .select('*')
            .ilike('expense_name', `%${expense_name}%`);


        if (error) {
            console.error(error);
            throw new Error("Medication name not found");
        }

        console.log('gahay', expense_name)
        console.log('data', data)

        if (data && data.length > 0) {
            console.log('data', data)

            return data;
            // document.getElementById("price").value = unitPrice;
        } 
        else {
            console.log(`No data found for expense name: ${expense_name}`);
        }
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching expense details");
    }
}

export async function deleteExpense(id) {
    const { data, error } = await supabase.from("expense").delete().eq("id", id);
  
    if (error) {
      console.error(error);
      throw new Error("Expense Item could not be deleted");
    }
  
    return data;
}