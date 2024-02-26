import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useSignUp } from "./useSignUp";


// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm()
  const { errors } = formState;

  const { signup, isLoading } = useSignUp()

  function handleSubmitForm({ fullName, email, password }){
    signup({ fullName, email, password }, {
      onSettled: () => reset()
    })
  }
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(handleSubmitForm)}>
      <FormRow label="Employee name" error={errors?.fullName?.message}>
        <input 
          type="text" 
          id="employeeName" 
          className="border border-gray-600 rounded-lg sm:w-[50%] w-[100%] px-2"
          disabled={isLoading}
          {...register('fullName', { required: 'This field is required' })} 
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <input 
          type="email" 
          id="email"
          className="border border-gray-600 rounded-lg sm:w-[50%] w-[100%] px-2"
          disabled={isLoading}
          {...register('email', { required: 'This field is required', 
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address'
            } 
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <input 
          type="password" 
          id="password"
          className="border border-gray-600 rounded-lg sm:w-[50%] w-[100%] px-2"
          disabled={isLoading} 
          {...register('password', { required: 'This field is required', 
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters'
            } 
          })}
        />
      </FormRow>

      <FormRow label="Confirm password" error={errors?.passwordConfirm?.message}>
        <input 
          type="password" 
          id="passwordConfirm"
          className="border border-gray-600 rounded-lg sm:w-[50%] w-[100%] px-2"
          disabled={isLoading}
          {...register('passwordConfirm', { required: 'This field is required',
          validate: (value) => value === getValues().password || 'Passwords need to match'
       })}/>
      </FormRow>

      <div className="flex justify-between">
        <Button type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button type='primary'>Create new account</Button>
      </div>
    </form>
  );
}

export default SignupForm;
