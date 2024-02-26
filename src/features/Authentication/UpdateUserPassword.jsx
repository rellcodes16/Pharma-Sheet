import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useUpdateData } from "./useUpdateData";


function UpdateUserPassword() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUserData, isUpdating } = useUpdateData();

  function onSubmit({ password }) {
    updateUserData({ password }, { onSuccess: reset });
  }

  return (
    <form className="flex flex-col gap-5 my-24" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-3xl text-gray-600 dark:text-gray-300">Update Employee Password</h1> 
      <p className="text-gray-600 mb-4 mt-[-7px] italic dark:text-gray-300">(For Existing Accounts ONLY)</p>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <input
          type="password"
          id="password"
          className="border border-gray-600 rounded-lg sm:w-[50%] w-[100%] px-2"
          autoComplete="current-password"
        //   disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <input
          type="password"
          autoComplete="new-password"
          className="border border-gray-600 rounded-lg sm:w-[50%] w-[100%] px-2"
          id="passwordConfirm"
        //   disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <div className="flex justify-between">
        <Button onClick={reset} type="reset">
          Cancel
        </Button>
        <Button type='primary' disabled={isUpdating}>Update password</Button>
      </div>
    </form>
  );
}

export default UpdateUserPassword;
