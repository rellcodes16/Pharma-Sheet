function FormRowVertical({ label, error, children }) {
  return (
    <div className="flex flex-col gap-3 px-5">
      {label && <label className="font-bold dark:text-gray-300 text-xl" htmlFor={children.props.id}>{label}</label>}
      {children}
      {error && <span className="text-2xl text-red-700">{error}</span>}
    </div>
  );
}

export default FormRowVertical;
