import toast from "react-hot-toast";
import supabase from "../../services/supabase"
import Button from "../../ui/Button";
import { useLogin } from "./useLogin";

function DemoAccount({ setEmail, setPassword }) {
    const handleDemoLogin = async () => {
        try{
            const { user, session, error } = await supabase.auth.signInWithPassword({
                email: 'boyaf25710@gexige.com',
                password: 'abcde1234'
            });

            if(error){
                throw new Error('Something went wrong while trying to sign in with demo account')
            }

            setEmail('boyaf25710@gexige.com');
            setPassword('abcde1234');
            toast.success('Login Credentials Filled. You can now log in to test the app.')
        }
        catch(error){
            console.error('Error Logging in:', error.message)
            toast.error('Error Filling Credentials')
        }
    }
  return (
    <Button type='demo' onClick={handleDemoLogin}>Demo Account Details</Button>
  )
}

export default DemoAccount