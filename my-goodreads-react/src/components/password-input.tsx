import { forwardRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Input } from "../components/ui/input";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ placeholder = "Enter your password", ...field }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword((prevState) => !prevState);
    };

    return (
      <div className="relative w-full">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="pr-10"
          ref={ref}
          {...field}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="h-5 w-5" aria-hidden="true" />
          ) : (
            <AiOutlineEye className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
    );
  },
);

export default PasswordInput;
