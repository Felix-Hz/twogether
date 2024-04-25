import { MdError } from "react-icons/md";

interface ErrorMsgProps {
  validationError: string | undefined;
}

const ErrorMsg: React.FC<ErrorMsgProps> = ({ validationError }) => {
  return (
    <p className="py-1.5 border-2 border-red-500/60 bg-red-500/15 rounded flex items-center max-w-[485px]">
      <MdError className="mx-2 text-lg text-red-500 flex-shrink-0" />
      <strong className="text-red-500 font-semibold text-xs text-justify flex-grow overflow-hidden px-2 max-w-[85%]">
        {validationError}
      </strong>
    </p>
  );
};

export default ErrorMsg;
