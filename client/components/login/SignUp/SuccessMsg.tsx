import { FaCheckCircle } from "react-icons/fa";

interface SuccessMsgProps {
  successMsg: string | undefined;
}

const SuccessMsg: React.FC<SuccessMsgProps> = ({ successMsg }) => {
  return (
    <p className="py-1.5 border-2 border-green-500/60 bg-green-500/15 rounded flex items-center max-w-[485px]">
      <FaCheckCircle className="mx-2 text-lg text-green-500 flex-shrink-0" />
      <strong className="text-green-500 font-semibold text-xs text-justify flex-grow overflow-hidden px-2 max-w-[85%]">
        {successMsg}
      </strong>
    </p>
  );
};

export default SuccessMsg;
