import supabase from "./supabase";

export async function getNotification() {
    const { data: notificationData, error: notificationError } = await supabase.from('notification').select('*');

    if (notificationError) {
        throw new Error('Notification data could not be fetched');
    }

    console.log(notificationData);

    return notificationData;
}


export async function deleteNotification(id){
    const { data, error } = await supabase.from('notification').delete().eq('id', id)

    if(error) {
        throw new Error('Notification data could not be fetched')
    }
    console.log(data)

    return data;
}




