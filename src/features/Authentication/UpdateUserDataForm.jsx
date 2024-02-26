import { useState } from "react";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useUser } from "./useUser";
import { useUpdateData } from "./useUpdateData";


function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { isUpdating, updateUserData } = useUpdateData()

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if(!fullName) return;
    
    updateUserData({ fullName, avatar }, {
      onSuccess: (e) => {
        setAvatar(null);
        e.target.reset();
      }
    })
  }

  function handleCancel(){
    setFullName(currentFullName);
    setAvatar(null)
  }


  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <h1 className="text-3xl text-gray-600 dark:text-gray-300">Update Employee Data</h1> 
      <p className="text-gray-600 mb-4 mt-[-7px] italic dark:text-gray-300">(For Existing Accounts ONLY)</p>
      <FormRow label="Email address">
        <input value={email} className="border border-gray-600 rounded-lg sm:w-[50%] w-[100%] px-2" disabled />
      </FormRow>
      <FormRow label="Full name">
        <input
          type="text"
          value={fullName}
          className="border border-gray-600 rounded-lg sm:w-[50%] w-[100%] px-2"
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <input
          type="file"
          id="avatar"
          accept="image/*"
          className="file"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>
      <div className="flex justify-between">
        <Button type="reset" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type='primary' disabled={isUpdating}>Update account</Button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;


