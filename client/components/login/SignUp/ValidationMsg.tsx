import { MdError } from "react-icons/md";

interface ValidationMsgProps {
  validationError: string | undefined;
}

const ValidationMsg: React.FC<ValidationMsgProps> = ({ validationError }) => {
  return (
    <p className="py-1.5 border-2 border-red-500/60 bg-red-500/15 rounded flex items-center">
      <MdError className="mx-2 text-lg text-red-500 flex-shrink-0" />
      <strong className="text-red-500 font-semibold text-xs text-justify flex-grow overflow-hidden px-2 max-w-[85%]">
        {validationError}
      </strong>
    </p>
  );
};

export default ValidationMsg;
