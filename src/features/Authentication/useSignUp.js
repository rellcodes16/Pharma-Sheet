import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp(){
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: signupApi,
        onSuccess: (user) => {
            console.log(user)
            toast.success('Account successfully created. Verify account from your email address')
        }
    })

    return { signup, isLoading }
}

