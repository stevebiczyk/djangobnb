interface CustomButtonProps {
  className?: string;
  label: string;
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  className,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-full py-4 bg-red-400 hover:bg-red-700 text-white text-center rounded-xl transition cursor-pointer ${className}`}
    >
      {label}
    </div>
  );
};
export default CustomButton;
