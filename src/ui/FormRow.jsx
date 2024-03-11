import Error from "./Error"

const FormRow = ({ label, children, error }) => {
  return (
    <div className="grid gap-3">
        {label && <label className="text-lg text-gray-500 dark:text-gray-300" htmlFor={children.props.id}>{label}</label>}
        {children}
        {error && <Error>{error}</Error>}
    </div>
  )
}

export default FormRow
