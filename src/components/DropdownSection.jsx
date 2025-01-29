import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const DropdownSection = ({ title, isOpen, setIsOpen, children }) => (
    <div className="border-t border-gray-200 pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-2 px-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
      >
        <span className="font-medium text-gray-800">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-purple-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-purple-600" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-white rounded-lg shadow-inner p-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  export default DropdownSection