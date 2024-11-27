interface props {
  bgColor?: string;
  borderColor?: string;
  className?: string;
}
const ButtonLoader: React.FC<props> = ({ bgColor, borderColor, className }) => {
  return (
    <div
      className={`flex h-5 w-5 m-auto items-center justify-center  ${
        bgColor ? bgColor : 'bg-primary'
      }`}
    >
      <div
        className={`h-5 w-5 animate-spin rounded-full border-2 border-solid  border-t-transparent ${
          borderColor ? borderColor : 'border-white'
        } ${className}`}
      ></div>
    </div>
  );
};

export default ButtonLoader;
