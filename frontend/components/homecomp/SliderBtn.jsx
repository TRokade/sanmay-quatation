import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@material-tailwind/react";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { useDisclosure } from "@nextui-org/react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Full Name is required")
    .test(
      "no-only-spaces",
      "Name cannot be only spaces",
      (value) => value && value.trim().length > 0
    ),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format")
    .matches(/^\S+$/, "No spaces at the beginning or end"),
  phoneNumber: Yup.string()
    .required("Mobile Number is required")
    .matches(/^[0-9]{10}$/, "Mobile Number must be numeric"),
  // message: Yup.string().required("Message is required"),
});

const SliderBtn = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formMessage, setFormMessage] = useState(""); // To store custom messages
  const [activeField, setActiveField] = useState("");

  const handleFocus = (name) => setActiveField(name);
  const handleBlur = () => setActiveField("");

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact-us",
        {
          ...values,
          type: "Get In Touch",
        }
      );
      
      // Set message for successful first-time submission
      setFormMessage("Thank you! We will reach out to you soon.");
      resetForm();
      setTimeout(() => {
        setFormMessage(""); // Clear the message after a few seconds
        onOpenChange();
      }, 3000);
    } catch (error) {
      // Handle case when email already exists
      if (error.response && error.response.data.message) {
        setFormMessage(error.response.data.message); 
        // resetForm();
        setTimeout(() => {
          setFormMessage(""); // Clear the message after a few seconds
          onOpenChange();
        }, 3000);
      } else {
        setFormMessage("Something went wrong. Please try again later.");
      }
    }
  };

  const handlePhoneNumberInput = (e) => {
    if (!/^\d*$/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex justify-center gap-2">
      <Link href={"/get-estimate"}>
        <Button className="text-xs md:text-sm" color="white">
          Get Estimate
        </Button>
      </Link>
      <Button onClick={onOpen} className="text-xs md:text-sm" color="white">
        Get In Touch
      </Button>

      <Dialog size="sm" open={isOpen} handler={onOpenChange} className="p-4">
        <DialogBody>
          <button onClick={onOpenChange} className="absolute top-2 right-2">
            <CancelIcon
              className="rounded-full"
              sx={{
                color: "#ef4666",
                backgroundColor: "white",
                fontSize: 20,
              }}
            />
          </button>

          {formMessage && (
            <div className="text-center text-lg font-semibold text-green-600 mb-4">
              {formMessage}
            </div>
          )}

          <Formik
            initialValues={{
              name: "",
              email: "",
              phoneNumber: "",
              message: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="lg:col-span-3">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      {/* Full Name Field */}
                      <div className="md:col-span-5">
                        <label
                          htmlFor="name"
                          className={`block mb-1 ${
                            activeField === "name"
                              ? "text-lg text-black"
                              : "text-gray-700"
                          }`}
                        >
                          Full Name
                        </label>
                        <Field
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          className={`outline-none border-gray-700 border h-10 mt-1 rounded px-4 w-full ${
                            activeField === "name"
                              ? "border-2 border-black"
                              : ""
                          }`}
                          onFocus={() => handleFocus("name")}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="md:col-span-5">
                        <label
                          htmlFor="email"
                          className={`block mb-1 ${
                            activeField === "email"
                              ? "text-lg text-black"
                              : "text-gray-700"
                          }`}
                        >
                          Email Address
                        </label>
                        <Field
                          type="text"
                          name="email"
                          placeholder="email@domain.com"
                          className={`outline-none border-gray-700 border h-10 mt-1 rounded px-4 w-full ${
                            activeField === "email"
                              ? "border-2 border-black"
                              : ""
                          }`}
                          onFocus={() => handleFocus("email")}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      {/* Phone Number Field */}
                      <div className="md:col-span-5">
                        <label
                          htmlFor="phoneNumber"
                          className={`block mb-1 ${
                            activeField === "phoneNumber"
                              ? "text-lg text-black"
                              : "text-gray-700"
                          }`}
                        >
                          Mobile Number
                        </label>
                        <Field
                          type="text"
                          name="phoneNumber"
                          placeholder="Mobile Number"
                          onKeyPress={handlePhoneNumberInput}
                          maxLength="10"
                          className={`outline-none border-gray-700 border h-10 mt-1 rounded px-4 w-full ${
                            activeField === "phoneNumber"
                              ? "border-2 border-black"
                              : ""
                          }`}
                          onFocus={() => handleFocus("phoneNumber")}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      {/* Message Field */}
                      <div className="md:col-span-5">
                        <label
                          htmlFor="message"
                          className={`block mb-1 ${
                            activeField === "message"
                              ? "text-lg text-black"
                              : "text-gray-700"
                          }`}
                        >
                          Message
                        </label>
                        <Field
                          as="textarea"
                          name="message"
                          placeholder="Message"
                          className={`h-32 pt-2 outline-none border-gray-700 border mt-1 rounded px-4 w-full ${
                            activeField === "message"
                              ? "border-2 border-black"
                              : ""
                          }`}
                          onFocus={() => handleFocus("message")}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage
                          name="message"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="md:col-span-5 mt-5 w-full text-center">
                        <div className="inline-flex items-end">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-block w-full rounded-lg bg-[#ef4665] px-5 py-3 font-medium text-white sm:w-auto"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default SliderBtn;
