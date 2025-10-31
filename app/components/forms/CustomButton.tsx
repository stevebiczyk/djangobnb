interface CustomButtonProps {
  className?: string;
  label: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  disabled,
  type = "button",
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-full py-4 bg-red-400 hover:bg-red-700 text-white text-center rounded-xl transition cursor-pointer ${className}`}
    >
      {label}
    </div>
    // <button
    //   type={type}
    //   onClick={onClick}
    //   className={`w-full py-4 bg-red-400 hover:bg-red-700 text-white text-center rounded-xl transition cursor-pointer ${className}`}
    //   disabled={disabled}
    // >
    //   {label}
    // </button>
  );
};
export default CustomButton;
