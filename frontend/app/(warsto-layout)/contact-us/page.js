"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

const InquiryForm = () => {
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
  const [formMessage, setFormMessage] = useState(""); // To store custom messages
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact-us",
        {
          ...values,
          type: "Contact Us",
        }
      );

      // Set message for successful first-time submission
      setFormMessage("Thank you! We will reach out to you soon.");
      resetForm();
      setTimeout(() => {
        setFormMessage(""); // Clear the message after a few seconds
      }, 3000);
    } catch (error) {
      // Handle case when email already exists
      if (error.response && error.response.data.message) {
        setFormMessage(error.response.data.message);
        // resetForm();
        setTimeout(() => {
          setFormMessage(""); // Clear the message after a few seconds
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
    <>
      <section className="bg-gray-100 pt-24 lg:pt-48">
        <div className="mx-auto max-w-screen-xl px-4 py-5 pb-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <p className="max-w-xl mb-5 text-3xl">Contact Us</p>
              <p>
              At Warsto, we transform spaces into beautiful, functional designs that reflect your unique style. Whether it’s your home or office, our team is here to bring your vision to life. Contact us today to start creating a space you'll love!
              </p>

              <div className="mt-8">
                <a href="#" className="text-2xl font-bold text-pink-600">
                  9987448555
                </a>

                <address className="mt-2 not-italic">
                  282 Kevin Brook, Imogeneborough, CA 58517
                </address>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            {formMessage && (
              <div className="text-left text-lg font-semibold text-green-600 mb-4">
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
                  <Form className="space-y-4">
                    <div>
                      <label className="sr-only" htmlFor="name">
                        Name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="w-full focus:outline-none border rounded-lg border-gray-200 p-3 text-sm"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="sr-only" htmlFor="email">
                          Email
                        </label>
                        <Field
                          type="text"
                          name="email"
                          placeholder="Email Address"
                          className="w-full focus:outline-none border rounded-lg border-gray-200 p-3 text-sm"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div>
                        <label className="sr-only" htmlFor="phone">
                          Phone
                        </label>

                        <Field
                          type="text"
                          name="phoneNumber"
                          onKeyPress={handlePhoneNumberInput}
                          maxLength="10"
                          placeholder="Phone Number"
                          className="no-spinner w-full focus:outline-none border rounded-lg border-gray-200 p-3 text-sm"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="message">
                        Message
                      </label>

                      <Field
                        as="textarea"
                        name="message"
                        rows="8"
                        placeholder="Message"
                        className="w-full focus:outline-none border rounded-lg border-gray-200 p-3 text-sm"
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                      >
                        Send
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InquiryForm;
