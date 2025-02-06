import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const RefundPolicyModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden text-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold ">Refund Policy</h2>
              <button
                onClick={onClose}
                className="  transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <h3 className="text-xl font-semibold mb-4">Scent Zone Refund Policy</h3>
              <p className="mb-4">
                We appreciate your business at Scent Zone! We want to ensure you're happy with your purchase. 
                This policy outlines the conditions for refunds and exchanges.
              </p>

              <h4 className="text-lg font-semibold mb-2">Return Window</h4>
              <p className="mb-4">
                You have 3 days from the date of purchase to return or exchange your item(s). 
                Unfortunately, we cannot accept returns or exchanges after 3 days.
              </p>

              <h4 className="text-lg font-semibold mb-2">Eligible Items for Return/Exchange</h4>
              <ul className="list-disc pl-5 mb-4">
                <li>Unworn, unused items in their original packaging with receipt or proof of purchase.</li>
                <li>Regular-priced items only. Sale, discounted, or customized items (color, size, etc.) are not eligible for return or exchange.</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Return/Exchange Fees</h4>
              <ul className="list-disc pl-5 mb-4">
                <li>A 15% return fee will be applied to the invoice amount if your return request is approved.</li>
                <li>A 10% exchange fee will be applied to the invoice amount if your exchange request is approved.</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Damaged or Incorrect Items</h4>
              <p className="mb-4">
                Please inspect your order upon arrival. If you receive a damaged, defective, or incorrect item, 
                contact us immediately at <a href="mailto:info@Pramanikfurniture.com" className="text-blue-600 hover:underline">info@Pramanikfurniture.com</a> so 
                we can resolve the issue. Damage reports may not be accepted after the delivery personnel leave, 
                following the delivery company's policy.
              </p>

              <h4 className="text-lg font-semibold mb-2">How to Return or Exchange</h4>
              <ol className="list-decimal pl-5 mb-4">
                <li>Contact us at <a href="mailto:info@Pramanikfurniture.com" className="text-blue-600 hover:underline">info@Pramanikfurniture.com</a> within 3 days of purchase to initiate a return or exchange.</li>
                <li>We will review your request and, if approved, provide a return shipping label and instructions.</li>
                <li>Do not return items without contacting us first.</li>
              </ol>

              <h4 className="text-lg font-semibold mb-2">Exchanges</h4>
              <p className="mb-4">
                The fastest way to get the item you want is to return your original item and then place a separate order for the new one.
              </p>

              <h4 className="text-lg font-semibold mb-2">Refunds</h4>
              <p className="mb-4">
                Once we receive and inspect your returned item, we will notify you of the refund approval decision. 
                If approved, your refund will be automatically issued to your original payment method within 10 business days.
              </p>

              <h4 className="text-lg font-semibold mb-2">Non-Returnable Items</h4>
              <p className="mb-4">
                Sale, discounted, or customized items (color, size, etc.)
              </p>

              <h4 className="text-lg font-semibold mb-2">Questions?</h4>
              <p className="mb-4">
                If you have any questions about our return or exchange policy, please don't hesitate to contact us at 
                <a href="mailto:info@Pramanikfurniture.com" className="text-blue-600 hover:underline"> info@Pramanikfurniture.com</a>.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RefundPolicyModal;