import { FaPlus } from "react-icons/fa6";

export default function ButtonCospace() {
  return (
    <div className="bg-green-400 hover:bg-green-400 hover:cursor-pointer p-3 rounded-xl space-x-2 flex items-center">
      <FaPlus className="text-md inline" />
    </div>
  );
}
