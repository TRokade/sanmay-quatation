"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

const ContactUs = () => {
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
          type: "Get In Touch",
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
      <div className="px-0 lg:px-24 pt-20">
        <div className="w-full  mt-10 md:mt-16 mb-16 lg:mb-20 flex justify-center">
          <div className="text-center max-w-5xl">
            <h3 className="mb-4 text-3xl font-medium">We Are Here To Help</h3>
            <p className="md:text-lg text-md w-full md:w-[700px]  px-4">
              {`You have questions, we have answers.Don't see your Q&A below? Just
              contact us and we'll get you an
              answer ASAP.`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2">
          <div className="px-12 shadow-lg ">
            <h3 className="mb-4 text-2xl font-medium">Contact information</h3>
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
                <Form>
                  <div className="flex md:flex-row flex-col justify-center">
                    <div className="w-full my-0 lg:mb-8 pe-3">
                      <div className="relative my-2 lg:my-0 w-full min-w-[200px] h-10">
                        <Field
                          type="text"
                          name="name"
                          placeholder=""
                          className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-xs"
                        />

                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900 rounded-none">
                          Full Name
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col justify-center">
                    <div className="w-full my-0 lg:mb-8 pe-3">
                      <div className="relative my-2 lg:my-0 w-full min-w-[200px] h-10">
                        <Field
                          type="text"
                          name="email"
                          placeholder=""
                          className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900 rounded-none">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="w-full my-0 lg:mb-8 pe-3">
                      <div className="relative my-2 lg:my-0 w-full min-w-[200px] h-10">
                        <Field
                          type="text"
                          name="phoneNumber"
                          onKeyPress={handlePhoneNumberInput}
                          maxLength="10"
                          placeholder=""
                          className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900 rounded-none">
                          Mobile
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex my-0 lg:mb-8 justify-center">
                <div className="w-full pe-3">
                  <div className="relative my-2 lg:my-0 w-full min-w-[200px] h-10">
                    <input
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                      placeholder=" "
                      name="order_number"
                      onChange={handleChange}
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900 rounded-none">
                      Order Number
                    </label>
                  </div>
                </div>
              </div> */}
                  <div className="flex my-0 lg:mb-8 justify-center">
                    <div className="w-full pe-3">
                      <div className="relative my-2 lg:my-0 w-full min-w-[200px] h-32">
                        <Field
                          as="textarea"
                          name="message"
                          placeholder=""
                          className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                        />
                        <ErrorMessage
                          name="message"
                          component="div"
                          className="text-red-500 text-xs"
                        />

                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900 rounded-none">
                          Message
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex my-20 lg:my-10 justify-center lg:justify-end ">
                    <button
                      type="submit"
                      className=" text-white w-48 bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      Send
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div>
            <div className="w-full text-center xl:text-start xl:w-[600px] p-2 bg-gray-200">
              <h2 className="font-bold">Mumbai</h2>
              <p>
                693/1 ITPL, main road, Whitefield, Hoodi <br />
                Mumbai +91 7005500200
              </p>
              <p>help@dtalemodern.com</p>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.59294080556!2d72.8882413749786!3d19.125505482089313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c91d7ffbbf0d%3A0x6de75142cec26203!2sWeWork%20Chromium!5e0!3m2!1sen!2sin!4v1724674496855!5m2!1sen!2sin"
                className="w-full xl:w-[600px] h-[350px]"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
