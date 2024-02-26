import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateData(){
    const queryClient = useQueryClient()

    const { mutate: updateUserData, isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({ user }) => {
            toast.success('Account successfully Updated')
            queryClient.setQueryData(['user'], user)
        },
        onError: (err) => {
            console.log(err)
            toast.error(err.message)
        }
    })

    return { updateUserData, isUpdating }
}

