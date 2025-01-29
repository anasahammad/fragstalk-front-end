import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const ShippingPolicyModal = ({ isOpen, onClose }) => {
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
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Shipping Policy</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <h3 className="text-xl font-semibold mb-4">Pramanik Furniture Shipping Policy</h3>

              <h4 className="text-lg font-semibold mb-2">Delivery Timeframes</h4>
              <ul className="list-disc pl-5 mb-4">
                <li><strong>Standard Delivery:</strong> Expect your order within 7-10 business days for Dhaka and surrounding areas. Deliveries outside Dhaka may take longer.</li>
                <li><strong>Production Time:</strong> Since we produce furniture on-demand, delivery times may vary based on current factory workload. We'll keep you informed throughout the process.</li>
                <li><strong>Delivery Delays:</strong> Unforeseen circumstances may impact delivery dates. We'll communicate any changes promptly.</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Delivery Methods</h4>
              <ul className="list-disc pl-5 mb-4">
                <li><strong>Dhaka City Area:</strong> Enjoy home delivery with free assembly (excluding wall mounting) by our or a trusted third-party delivery team.</li>
                <li><strong>Outside Dhaka City:</strong> We offer door-to-door shipping. While self-assembly is required, we can assist via video call if needed.</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Assembly</h4>
              <ul className="list-disc pl-5 mb-4">
                <li><strong>Dhaka Area:</strong> Our team will assemble your furniture on the same day of delivery.</li>
                <li><strong>Outside Dhaka:</strong> Self-assembly is required. Instructions will be provided.</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Payment Terms</h4>
              <ul className="list-disc pl-5 mb-4">
                <li><strong>Orders Under BDT 50,000:</strong> A 10% confirmation payment is required upon order placement. The remaining balance is due on delivery day.</li>
                <li><strong>Orders Over BDT 50,000 & Corporate Orders:</strong> A 50% confirmation payment is required.</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Order Changes & Cancellations</h4>
              <p className="mb-4">
                <strong>Regular Orders:</strong> Changes or cancellations can be made within 2 days of purchase. A cancellation fee may apply depending on work progress.
              </p>

              <h4 className="text-lg font-semibold mb-2">Warranty Information</h4>
              <ul className="list-disc pl-5 mb-4">
                <li><strong>1-Year Warranty:</strong> We offer a 1-year free service warranty on any manufacturing defects.</li>
                <li><strong>Warranty Exclusions:</strong> Glass, fabric, and artificial leather are not covered under warranty.</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Delivery Delay Penalty</h4>
              <p className="mb-4">
                <strong>Pramanik Furniture Commitment:</strong> We strive to deliver within our standard timeframe. If your order is delayed beyond 7 days, we'll offer a 0.5% weekly penalty on the order value.
              </p>

              <h4 className="text-lg font-semibold mb-2">Inventory Holding Cost</h4>
              <p className="mb-4">
                <strong>Customer Responsibility:</strong> If you are unable to take delivery of completed furniture within 7 days of notification, a 0.5% weekly storage fee will apply to the order value.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShippingPolicyModal;