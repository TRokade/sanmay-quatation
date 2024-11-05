// Create a new file: SubmissionSummary.jsx
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function SubmissionSummary({ data, quotationId }) {
  const formatRoomName = (name) => {
    return name.replace(/([A-Z])/g, " $1").trim();
  };

  const getTotalSelections = () => {
    return Object.values(data.selectedOptions).reduce(
      (total, options) => total + (options?.length || 0),
      0
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2 border-b pb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Quotation Generated Successfully!
            </h2>
            <p className="text-gray-600">Your quotation ID: {quotationId}</p>
          </div>

          {/* Property Details */}
          <Card className="bg-white">
            <CardHeader className="pb-3 border-b">
              <h3 className="text-xl font-semibold">Property Details</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Property Type:</span>
                <span>{data.bhkType}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Location:</span>
                <span className="text-right">{data.propertyName}</span>
              </div>
              {data.carpetArea && (
                <div className="flex justify-between">
                  <span className="font-medium">Carpet Area:</span>
                  <span>{data.carpetArea} sq ft</span>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Selected Options */}
          <Card className="bg-white">
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-xl font-semibold">Selected Options</h3>
                <span className="bg-[#fde8ec] text-[#ef4665] px-3 py-1 rounded-full text-sm">
                  {getTotalSelections()} Items Selected
                </span>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              {Object.entries(data.selectedOptions).map(([room, options]) => {
                if (!options?.length) return null;
                return (
                  <div
                    key={room}
                    className="border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <h4 className="font-medium text-lg mb-2">
                      {formatRoomName(room)}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {options.map((option) => (
                        <span
                          key={option}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm"
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </CardBody>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white">
            <CardHeader className="pb-3 border-b">
              <h3 className="text-xl font-semibold">Contact Information</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{data.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{data.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Phone:</span>
                <span>{data.phoneNumber}</span>
              </div>
            </CardBody>
          </Card>

          <div className="flex justify-center space-x-4">
            <Link href="/">
              <Button
                className="bg-gray-100 text-gray-800 hover:bg-gray-200"
                size="lg"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
