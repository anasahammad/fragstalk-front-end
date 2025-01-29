import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const TermsOfServiceModal = ({ isOpen, onClose }) => {
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
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Terms of Service</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <h3 className="text-xl font-semibold mb-4">Overview</h3>
              <p className="mb-4">
                This website is owned and operated by Pramanik Furniture. By using this website, you agree to these Terms of Service. If you don't agree, you can't use the website.
              </p>

              <h3 className="text-xl font-semibold mb-4">Using our website</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>You must be at least the legal age in your jurisdiction to use the website.</li>
                <li>You can't use the website for any illegal purposes.</li>
                <li>Don't upload any harmful code to the website.</li>
                <li>We can terminate your access to the website for violating the Terms of Service.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">General Conditions</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>We reserve the right to refuse service to anyone for any reason.</li>
                <li>Your information may be transferred when you place an order. Credit card information is always encrypted during transfer.</li>
                <li>You can't copy or resell any part of our service.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Accuracy of Information</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>We try our best to provide accurate information, but it may not always be up-to-date. Don't rely solely on this information for important decisions.</li>
                <li>We can change the content of the website at any time.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Prices and Products</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Prices for our products can change without notice.</li>
                <li>We can modify or discontinue the service (or any part of it) at any time.</li>
                <li>We are not liable for any changes made to the service.</li>
                <li>We have made every effort to display product colors accurately, but there can be variations depending on your computer screen.</li>
                <li>We reserve the right to limit sales or services to any person.</li>
                <li>We don't guarantee the quality of our products or services.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Billing and Account Information</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>We reserve the right to cancel your order.</li>
                <li>You agree to provide accurate billing and account information.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Optional Tools</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>We may offer third-party tools that we don't control.</li>
                <li>Your use of these tools is at your own risk.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Third-Party Links</h3>
              <p className="mb-4">
                Third-party links on our website are not affiliated with us. We are not responsible for their content.
              </p>

              <h3 className="text-xl font-semibold mb-4">User Comments and Feedback</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>You agree that we can use any comments or feedback you submit.</li>
                <li>You are responsible for any comments you make and their accuracy.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
              <p className="mb-4">
                Your submission of personal information is governed by our Privacy Policy.
              </p>

              <h3 className="text-xl font-semibold mb-4">Errors and Omissions</h3>
              <p className="mb-4">
                Occasionally there may be information on our site that contains errors or omissions. We reserve the right to correct these errors and update information.
              </p>

              <h3 className="text-xl font-semibold mb-4">Prohibited Uses</h3>
              <p className="mb-4">
                In addition to other prohibitions, you are prohibited from using the website for any illegal purposes.
              </p>

              <h3 className="text-xl font-semibold mb-4">Disclaimer of Warranties and Limitation of Liability</h3>
              <p className="mb-4">
                We don't guarantee that our service will be uninterrupted or error-free. We are not liable for any damages related to your use of our service or products.
              </p>

              <h3 className="text-xl font-semibold mb-4">Indemnification</h3>
              <p className="mb-4">
                You agree to indemnify us for any claims resulting from your breach of the Terms of Service.
              </p>

              <h3 className="text-xl font-semibold mb-4">Severability</h3>
              <p className="mb-4">
                If any provision of these Terms of Service is found to be unenforceable, the remaining provisions will still be enforceable.
              </p>

              <h3 className="text-xl font-semibold mb-4">Termination</h3>
              <p className="mb-4">
                We can terminate your use of the website for violating the Terms of Service.
              </p>

              <h3 className="text-xl font-semibold mb-4">Entire Agreement</h3>
              <p className="mb-4">
                These Terms of Service constitute the entire agreement between you and us regarding your use of the website.
              </p>

              <h3 className="text-xl font-semibold mb-4">Governing Law</h3>
              <p className="mb-4">
                These Terms of Service are governed by the laws of Bangladesh.
              </p>

              <h3 className="text-xl font-semibold mb-4">Changes to Terms of Service</h3>
              <p className="mb-4">
                We can update the Terms of Service at any time.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TermsOfServiceModal;