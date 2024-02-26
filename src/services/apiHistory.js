import { PAGE_SIZE } from "../utils/helpers";
import supabase from "./supabase";

export async function getHistory({ page }){
    let historyQuery = supabase.from('history').select('*')

    // if(page){
    //     const from = (page - 1) * PAGE_SIZE
    //     const to = from + PAGE_SIZE - 1
    //     historyQuery = historyQuery.range(from, to)
    // }

    const { data, error } = await historyQuery

    if(error){
        console.error(error)
        throw new Error('History Data could not be loaded')
    }


    console.log(data)
    return data;
}


export async function searchHistory(clientName){
    try {
        const { data, error } = await supabase 
            .from('history')
            .select('*')
            .ilike('clientName', `%${clientName}%`);


        if (error) {
            console.error(error);
            throw new Error("Client name not found");
        }

        console.log('gahay', clientName)
        console.log('data', data)

        if (data && data.length > 0) {
            console.log('data', data)

            return data;
            // document.getElementById("price").value = unitPrice;
        } 
        else {
            console.log(`No data found for client name: ${clientName}`);
        }
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching client history details");
    }
}


