"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import logo from "@/public/images/warsto-logo.png";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
  Progress,
  Accordion,
  AccordionItem,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Plus,
} from "lucide-react";
import tvUnitImg from "@/public/images/tv-unit.png";
import sofaImg from "@/public/images/sofa.png";
import crockeryUnitImg from "@/public/images/crokery-unit.png";
import shoeImg from "@/public/images/shoe.png";
import consoleTableImg from "@/public/images/console-table.png";
import kitchenImg from "@/public/images/kitchen.png";
import gkitchenImg from "@/public/images/gkitchen.png";
import lkitchenImg from "@/public/images/minus.png";
import parallelImg from "@/public/images/parallel.png";
import thinLineImg from "@/public/images/thin-line.png";
import wardrobeImg from "@/public/images/closet.png";
import bedImg from "@/public/images/double-bed.png";
import dresserImg from "@/public/images/dresser.png";
import ceilingImg from "@/public/images/ceiling.png";
import pipe from "@/public/images/pipe.png";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import PlacesAutocomplete from "@/components/PlacesAutocomplete";
import SubmissionSummary from "@/components/SubmissionSummary";
// import { pricing } from "../pricing";
const API_BASE_URL = "http://localhost:5000/api";

const steps = [
  { title: "BHK Type", description: "Select your BHK type" },
  {
    title: "Rooms to Design",
    description: "Choose the rooms you want to design",
  },
  { title: "Get Quote", description: "Fill in your details to get a quote" },
];

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [selectedBHK, setSelectedBHK] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [carpetArea, setCarpetArea] = useState("");
  const [formOptions, setFormOptions] = useState({});
  const [newOption, setNewOption] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quotationLink, setQuotationLink] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalOpenedRoom, setModalOpenedRoom] = useState(null);
  const [quotationId, setQuotationId] = useState("");
  const [activeRoom, setActiveRoom] = useState(null);
  const [wholePaintingSelected, setWholePaintingSelected] = useState(false);
  const [defaultExpandedKey, setDefaultExpandedKey] = useState(() => {
    const firstRoom = Object.keys(formOptions)[0];
    return new Set(firstRoom ? [firstRoom] : []);
  });
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef(null);
  const [expandedRooms, setExpandedRooms] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    propertyName: "",
    placeDetails: null,
  });

  useEffect(() => {
    if (selectedBHK) {
      setIsLoading(true);
      fetchOptions()
        .then(() => {
          const firstRoom = Object.keys(formOptions)[0];
          setActiveRoom(firstRoom);
          setSelectedKeys(new Set([firstRoom]));
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [selectedBHK]);

  useEffect(() => {
    if (step === 2 && Object.keys(formOptions).length > 0) {
      const firstRoom = Object.keys(formOptions)[0];
      setActiveRoom(firstRoom);
      setSelectedKeys(new Set([firstRoom]));
      setDefaultExpandedKey(new Set([firstRoom]));
    }
  }, [step, formOptions]);

  useEffect(() => {
    if (activeRoom) {
      setSelectedKeys(new Set([activeRoom]));
      setDefaultExpandedKey(new Set([activeRoom]));
    }
  }, [activeRoom]);

  useEffect(() => {
    if (!isOpen && modalOpenedRoom) {
      setSelectedKeys(new Set([modalOpenedRoom]));
      setActiveRoom(modalOpenedRoom);
    }
  }, [isOpen, modalOpenedRoom]);

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsed = JSON.parse(savedFormData);
      setSelectedBHK(parsed.selectedBHK || "");
      setSelectedOptions(parsed.selectedOptions || {});
      setCarpetArea(parsed.carpetArea || "");
      setFormData(parsed.personalInfo || {});
    }
  }, []);

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsed = JSON.parse(savedFormData);
      setSelectedBHK(parsed.selectedBHK || "");
      setCarpetArea(parsed.carpetArea || "");
      setFormData(parsed.personalInfo || {});

      const storedOptions = parsed.selectedOptions || {};
      if (parsed.selectedBHK) {
        fetch(
          `${API_BASE_URL}/options/${encodeURIComponent(parsed.selectedBHK)}`
        )
          .then((response) => response.json())
          .then((data) => {
            setFormOptions(data);
            // Now restore the selected options after options are loaded
            setSelectedOptions(storedOptions);
          })
          .catch((error) => {
            console.error("Error fetching options:", error);
          });
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const optionImages = {
    LivingRoom: {
      "TV Unit": tvUnitImg,
      Sofa: sofaImg,
      "Crockery Unit": crockeryUnitImg,
      "Shoe Rack": shoeImg,
      Console: consoleTableImg,
    },
    Kitchen: {
      "L Shape": lkitchenImg,
      "U Shape": gkitchenImg,
      "G Shape": gkitchenImg,
      "|| Shape": parallelImg,
      "| Shape": thinLineImg,
    },
    MasterBedroom: {
      Wardrobe: wardrobeImg,
      Bed: bedImg,
      Dresser: dresserImg,
    },
    MasterBedroom2: {
      Wardrobe: wardrobeImg,
      Bed: bedImg,
      Dresser: dresserImg,
    },
    CommonBedroom: {
      Wardrobe: wardrobeImg,
      Bed: bedImg,
      Dresser: dresserImg,
    },
    FalseCeilingElectrical: {
      "Fire pipe Boxin": pipe,
      Basic: ceilingImg,
      Peripheral: ceilingImg,
      "Custom Design": ceilingImg,
    },
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="w-full h-32 bg-gray-200 rounded-lg mb-2" />
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>
      ))}
    </div>
  );

  const fetchOptions = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/options/${encodeURIComponent(selectedBHK)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data && typeof data === "object" && Object.keys(data).length > 0) {
        // Properly handle the nested Services structure
        if (data.Services) {
          // Move FalseCeilingElectrical options directly under the Services key
          data.Services.FalseCeilingElectrical =
            data.Services.FalseCeilingElectrical || [];
        }
        setFormOptions(data);
        setExpandedRooms(
          Object.keys(data).reduce(
            (acc, room) => ({ ...acc, [room]: false }),
            {}
          )
        );
      } else {
        console.error("Invalid data structure received:", data);
        setFormOptions({});
      }
    } catch (error) {
      console.error("Error fetching options:", error);
      setFormOptions({});
      throw error;
    }
  };

  const handleSelect = (bhk) => {
    setSelectedBHK(bhk);
    setSelectedOptions({}); // Clear previous selections
    setIsLoading(true); // Set loading state before fetch

    fetch(`${API_BASE_URL}/options/${encodeURIComponent(bhk)}`)
      .then((response) => response.json())
      .then((data) => {
        setFormOptions(data);
        const firstRoom = Object.keys(data)[0];
        setActiveRoom(firstRoom);
        setSelectedKeys(new Set([firstRoom]));
        setDefaultExpandedKey(new Set([firstRoom]));
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
        setFormOptions({});
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOptionChange = (room, option) => {
    setSelectedOptions((prev) => {
      if (room === "Kitchen") {
        if (prev[room]?.[0] === option) {
          return {
            ...prev,
            [room]: [],
          };
        }
        // Otherwise, select the new option
        return {
          ...prev,
          [room]: [option],
        };
      }

      if (room === "FalseCeilingElectrical") {
        if (prev[room]?.[0] === option) {
          return {
            ...prev,
            [room]: [],
          };
        }
        // Otherwise, select the new option
        return {
          ...prev,
          [room]: [option],
        };
      }
      if (option === "None") {
        return {
          ...prev,
          [room]: prev[room]?.includes("None") ? [] : ["None"],
        };
      }

      // If "None" is currently selected and selecting another option
      if (prev[room]?.includes("None")) {
        return {
          ...prev,
          [room]: [option],
        };
      }

      // Regular multiple selection behavior
      const roomOptions = prev[room] || [];
      const updatedOptions = roomOptions.includes(option)
        ? roomOptions.filter((opt) => opt !== option)
        : [...roomOptions, option];

      return { ...prev, [room]: updatedOptions };
    });
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const handleAddOption = async () => {
    if (!newOption.trim() || !currentRoom) {
      setErrors({ addOption: "Please enter a valid option" });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/addCustomOption`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bhkType: selectedBHK,
          category: currentRoom,
          customOption: newOption.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Update form options
      setFormOptions((prev) => ({
        ...prev,
        [currentRoom]: [...(prev[currentRoom] || []), newOption.trim()],
      }));

      // Automatically select the new option
      handleOptionChange(currentRoom, newOption.trim());

      // Force the accordion to stay on current room
      const newSelectedKeys = new Set([currentRoom]);
      setSelectedKeys(newSelectedKeys);
      setDefaultExpandedKey(newSelectedKeys);
      setActiveRoom(currentRoom);

      setNewOption("");
      onClose();
    } catch (error) {
      setErrors({ addOption: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateStep3 = () => {
    const newErrors = {};
    const { name, email, phoneNumber, propertyName } = formData;

    if (!name || name.length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phoneNumber || !/^[0-9]{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    if (!propertyName || propertyName.trim().length === 0) {
      newErrors.propertyName = "Property name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isStepComplete = () => {
    if (step === 1) return selectedBHK !== "";
    if (step === 2)
      return (
        Object.values(selectedOptions).some((options) => options?.length > 0) ||
        carpetArea.trim() !== ""
      );
    return true;
  };

  // In handleSubmit function of page.jsx
  const handleSubmit = async () => {
    if (step === 3) {
      if (!validateStep3()) {
        return;
      }

      setIsSubmitting(true);
      const submitData = {
        bhkType: selectedBHK,
        selectedOptions,
        carpetArea,
        wholePaintingSelected,
        ...formData,
      };
      try {
        const response = await fetch(`${API_BASE_URL}/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || data.details || "Form submission failed"
          );
        }

        if (data.emailType === "thank_you") {
          // Show thank you message
          setFormSubmitted(true);
          // You might want to show a different success message here
          return;
        }
        setQuotationId(data.quotationId);
        setFormSubmitted(true);
        setQuotationLink(`/quotation/${data.quotationId}`);
        localStorage.removeItem("formData");
        return (
          <SubmissionSummary data={submitData} quotationId={data.quotationId} />
        );
        // setSelectedBHK("");
        // setSelectedOptions({});
        // setCarpetArea("");
        // setFormData({
        //   name: "",
        //   email: "",
        //   phoneNumber: "",
        //   propertyName: "",
        // });
      } catch (error) {
        setErrors({ submit: error.message });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      nextStep();
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <fieldset>
              <legend className="sr-only">Select BHK Type</legend>
              {["1 BHK", "2 BHK", "3 BHK"].map((bhk) => (
                <motion.div
                  key={bhk}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`border-2 p-4 rounded-lg cursor-pointer transition-all duration-300 m-3 ${
                    selectedBHK === bhk
                      ? "border-[#ef4665] bg-[#ef466515] text-black"
                      : "border-gray-300 hover:border-[#ef4665]"
                  }`}
                  onClick={() => handleSelect(bhk)}
                  role="radio"
                  aria-checked={selectedBHK === bhk}
                  tabIndex={0}
                >
                  <span className="text-lg font-medium">{bhk}</span>
                </motion.div>
              ))}
            </fieldset>
          </motion.div>
        );

      case 2:
        const roomEntries = Object.entries(formOptions);

        const navigateRoom = (direction) => {
          const visibleRooms = roomEntries.filter(
            ([room]) =>
              room !== "WholeHousePainting" && room !== "FalseCeilingElectrical"
          );
          const currentIndex = visibleRooms.findIndex(
            ([room]) => room === activeRoom
          );
          const newIndex =
            direction === "next"
              ? Math.min(currentIndex + 1, visibleRooms.length - 1)
              : Math.max(currentIndex - 1, 0);

          const newRoom = visibleRooms[newIndex][0];
          setActiveRoom(newRoom);
          setSelectedKeys(new Set([newRoom]));
        };

        const getRoomSelectionInfo = (room, options) => {
          if (room === "Services") {
            const paintingSelected = carpetArea ? 1 : 0;
            const ceilingSelected =
              selectedOptions["FalseCeilingElectrical"]?.length || 0;
            const totalSelected = paintingSelected + ceilingSelected;
            return `${totalSelected}/2 selected`;
          }

          const selectedCount = selectedOptions[room]?.length || 0;
          const totalOptions = Array.isArray(options) ? options.length : 0;
          return `${selectedCount}/${totalOptions} selected`;
        };

        const handleSelectionChange = (keys) => {
          const newKeys = new Set(keys);
          setSelectedKeys(newKeys);
          setDefaultExpandedKey(newKeys);
          const selectedRoom = Array.from(newKeys)[0];
          if (selectedRoom) {
            setActiveRoom(selectedRoom);
          }
        };

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4 max-h-[60vh] overflow-y-auto"
          >
            {isLoading ? (
              <LoadingSkeleton />
            ) : Object.keys(formOptions).length > 0 ? (
              <Accordion
                defaultSelectedKeys={selectedKeys}
                selectedKeys={selectedKeys}
                onSelectionChange={(keys) => {
                  setSelectedKeys(keys);
                  const selectedRoom = Array.from(keys)[0];
                  if (selectedRoom) {
                    setActiveRoom(selectedRoom);
                  }
                }}
                className="p-0 gap-4"
              >
                {roomEntries.map(([room, options], index) => {
                  if (room === "Services") {
                    return (
                      <AccordionItem
                        key={room}
                        aria-label={room}
                        title={
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Services</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm px-3 py-1 rounded-full ${
                                  carpetArea ||
                                  selectedOptions["FalseCeilingElectrical"]
                                    ?.length
                                    ? "bg-[#fde8ec] text-[#ef4665]"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {getRoomSelectionInfo("Services", options)}
                              </span>
                            </div>
                          </div>
                        }
                      >
                        {/* Services Section */}
                        {/* Services Section */}
                        <div className="p-4 space-y-6">
                          {/* Carpet Area Input - Always visible */}
                          <div className="border-b pb-6">
                            <h4 className="font-medium text-lg mb-4">
                              Carpet Area
                            </h4>
                            <div className="space-y-2">
                              <Input
                                id="carpetArea"
                                label="Carpet Area (sq ft)"
                                value={carpetArea}
                                onChange={(e) => setCarpetArea(e.target.value)}
                                type="number"
                                placeholder="Enter carpet area"
                                min="0"
                                className="max-w-xs"
                                required
                              />
                              <p className="text-sm text-gray-600">
                                Please enter your property's carpet area
                              </p>
                            </div>
                          </div>

                          {/* Whole House Painting Section */}
                          <div className="border-b pb-6">
                            <h4 className="font-medium text-lg mb-4">
                              Whole House Painting
                            </h4>
                            <div className="space-y-2">
                              <Checkbox
                                isSelected={wholePaintingSelected}
                                onValueChange={(selected) => {
                                  setWholePaintingSelected(selected);
                                }}
                              >
                                Include Whole House Painting Service
                              </Checkbox>
                              {wholePaintingSelected && (
                                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                  <p className="text-sm text-gray-600">
                                    Cost will be calculated based on your carpet
                                    area
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* False Ceiling & Electrical Section */}
                          <div>
                            <h4 className="font-medium text-lg mb-4">
                              False Ceiling & Electrical
                            </h4>
                            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mb-4">
                              <p>
                                Note: You can select only one option from this
                                section
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              {/* None option for False Ceiling */}
                              <div
                                onClick={() =>
                                  handleOptionChange(
                                    "FalseCeilingElectrical",
                                    "None"
                                  )
                                }
                                className={`cursor-pointer p-4 rounded-lg border transition-all ${
                                  selectedOptions[
                                    "FalseCeilingElectrical"
                                  ]?.[0] === "None"
                                    ? "border-gray-500 bg-gray-50"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <Checkbox
                                  isSelected={
                                    selectedOptions[
                                      "FalseCeilingElectrical"
                                    ]?.[0] === "None"
                                  }
                                >
                                  None
                                </Checkbox>
                              </div>

                              {/* Regular False Ceiling options */}
                              {options.FalseCeilingElectrical?.filter(
                                (option) => option !== "None"
                              ).map((option) => (
                                <div
                                  key={option}
                                  onClick={() =>
                                    handleOptionChange(
                                      "FalseCeilingElectrical",
                                      option
                                    )
                                  }
                                  className={`cursor-pointer p-4 rounded-lg border transition-all ${
                                    selectedOptions[
                                      "FalseCeilingElectrical"
                                    ]?.[0] === option
                                      ? "border-[#ef4665] bg-[#ef466515] text-black"
                                      : "border-gray-300 hover:border-[#ef4665]"
                                  }`}
                                >
                                  {optionImages.FalseCeilingElectrical?.[
                                    option
                                  ] && (
                                    <div className="w-full h-32 relative mb-2">
                                      <Image
                                        src={
                                          optionImages.FalseCeilingElectrical[
                                            option
                                          ]
                                        }
                                        alt={option}
                                        fill
                                        className="object-contain rounded-lg"
                                      />
                                    </div>
                                  )}
                                  <Checkbox
                                    isSelected={
                                      selectedOptions[
                                        "FalseCeilingElectrical"
                                      ]?.[0] === option
                                    }
                                  >
                                    {option}
                                  </Checkbox>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </AccordionItem>
                    );
                  }

                  // Skip rendering individual WholeHousePainting and FalseCeilingElectrical accordions
                  if (
                    room === "WholeHousePainting" ||
                    room === "FalseCeilingElectrical"
                  ) {
                    return null;
                  }

                  // Regular room handling
                  return (
                    <AccordionItem
                      key={room}
                      aria-label={room}
                      title={
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {room.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm px-3 py-1 rounded-full ${
                                selectedOptions[room]?.length
                                  ? "bg-[#fde8ec] text-[#ef4665]"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {getRoomSelectionInfo(room, options)}
                            </span>
                          </div>
                        </div>
                      }
                    >
                      <div className="">
                        {(room === "Kitchen" ||
                          room === "FalseCeilingElectrical") && (
                          <div className="mb-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <p>
                              Note: You can select only one option from this
                              section
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                          

                          {options
                            .filter((option) => option !== "None")
                            .map((option) => (
                              <div
                                key={option}
                                className={`cursor-pointer p-4 rounded-lg border transition-all ${
                                  selectedOptions[room]?.includes(option)
                                    ? "border-[#ef4665] bg-[#ef466515] text-black"
                                    : selectedOptions[room]?.includes("None")
                                    ? "border-gray-200 bg-gray-100 opacity-50 pointer-events-none"
                                    : "border-gray-300 hover:border-[#ef4665]"
                                }`}
                              >
                                {optionImages[room]?.[option] && (
                                  <div
                                    className="w-full h-32 relative mb-2"
                                    onClick={() =>
                                      handleOptionChange(room, option)
                                    }
                                  >
                                    <Image
                                      src={optionImages[room][option]}
                                      alt={option}
                                      fill
                                      className="object-contain rounded-lg"
                                    />
                                  </div>
                                )}
                                <label
                                  className="flex items-center cursor-pointer w-full"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOptionChange(room, option);
                                  }}
                                >
                                  <Checkbox
                                    isSelected={selectedOptions[room]?.includes(
                                      option
                                    )}
                                    isDisabled={selectedOptions[room]?.includes(
                                      "None"
                                    )}
                                    onChange={() =>
                                      handleOptionChange(room, option)
                                    }
                                  >
                                    {option}
                                  </Checkbox>
                                </label>
                              </div>
                            ))}

                            {/* None option */}

                          <div
                            key={`${room}-none`}
                            onClick={() => handleOptionChange(room, "None")}
                            className={`cursor-pointer p-4 rounded-lg border transition-all ${
                              selectedOptions[room]?.includes("None")
                                ? "border-gray-500 bg-gray-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <Checkbox
                              isSelected={selectedOptions[room]?.includes(
                                "None"
                              )}
                            >
                              None
                            </Checkbox>
                          </div>
                        </div>

                        {room !== "Kitchen" && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setModalOpenedRoom(room);
                              setCurrentRoom(room);
                              onOpen();
                            }}
                            className="my-4 bg-[#fde8ec] text-[#ef4665] hover:bg-[#fcd5dd] flex items-center justify-center px-4 py-2 rounded-md"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Custom Option
                          </Button>
                        )}

                        <div className="flex justify-between pt-4 border-t">
                          <Button
                            size="sm"
                            disabled={index === 0}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              navigateRoom("prev");
                            }}
                            className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                          >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Previous Room
                          </Button>
                          <Button
                            size="sm"
                            disabled={index === roomEntries.length - 1}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              navigateRoom("next");
                            }}
                            className="bg-[#ef4665] text-white hover:bg-[#dc4060] disabled:opacity-50"
                          >
                            Next Room
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            ) : (
              <div>No Options available</div>
            )}
          </motion.div>
        );

      case 3:
        const getTotalSelections = () => {
          return Object.values(selectedOptions).reduce(
            (total, options) => total + (options?.length || 0),
            0
          );
        };

        // Helper function to format room name
        const formatRoomName = (name) => {
          return name.replace(/([A-Z])/g, " $1").trim();
        };

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 max-w-md mx-auto"
          >
            <Card className="p-6 space-y-6">
              <CardHeader>
                <h3 className="text-2xl font-semibold">Personal Information</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <Input
                  id="name"
                  label="Name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name}
                  fullWidth
                />
                <Input
                  id="email"
                  label="Email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email}
                  fullWidth
                />
                <Input
                  id="phoneNumber"
                  label="Phone Number"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  isInvalid={!!errors.phoneNumber}
                  errorMessage={errors.phoneNumber}
                  fullWidth
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Property Location
                  </label>
                  <PlacesAutocomplete
                    value={formData.propertyName}
                    onChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        propertyName: value,
                      }));
                      if (errors.propertyName) {
                        setErrors((prev) => ({
                          ...prev,
                          propertyName: "",
                        }));
                      }
                    }}
                    onError={(error) => {
                      setErrors((prev) => ({
                        ...prev,
                        propertyName: error,
                      }));
                    }}
                  />
                  {errors.propertyName && (
                    <p className="text-sm text-red-600">
                      {errors.propertyName}
                    </p>
                  )}
                </div>
              </CardBody>
            </Card>

            {errors.submit && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mt-4">
                {errors.submit}
              </div>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
      />
      <div className="mt-20 flex justify-between items-center">
        <div className=" mx-auto px-4 bg-white  md:px-32 shadow-lg py-4 flex flex-col md:flex-row justify-between items-center">
          <nav className="flex justify-center space-x-4 md:space-x-8 flex-shrink">
            {steps.map((s, index) => (
              <div
                key={s.title}
                className={`flex flex-col sm:flex-row items-center ${
                  index < step - 1
                    ? "text-[#ef4665]"
                    : index === step - 1
                    ? "text-black font-medium"
                    : "text-gray-400"
                }`}
              >
                <span className="mr-2 w-6 h-6 rounded-full bg-[#ef4665] text-white flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="whitespace-nowrap text-sm md:text-base">
                  {s.title}
                </span>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 w-full max-w-2xl">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {steps[step - 1].title}
            </h2>
            <p className="text-gray-600">{steps[step - 1].description}</p>
          </div>
          <Progress
            value={(step / steps.length) * 100}
            className="mb-8"
            color="danger"
            aria-label="Form progress"
          />

          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

          <div className="flex  justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`px-6 flex items-center justify-center py-2 rounded-md ${
                step === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              <ChevronLeft className="w-5  h-5 mr-1" />
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isStepComplete() || isSubmitting}
              className={`px-6 flex items-center py-2 justify-center  rounded-md ${
                !isStepComplete() || isSubmitting
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#ef4665] text-white hover:bg-[#dc4060]"
              }`}
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
                <>
                  {step === 3 ? "Submit" : "Next"}
                  {step !== 3 && <ChevronRight className="w-5 h-5 ml-1" />}
                </>
              )}
            </button>
          </div>
        </div>
      </main>
      {formSubmitted && (
        <SubmissionSummary
          data={{
            bhkType: selectedBHK,
            selectedOptions,
            carpetArea,
            ...formData,
          }}
          quotationId={quotationId}
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalBody>
            <h3 className="flex text-xl my-2 font-bold  flex-col gap-1">
              Add Custom Option for {currentRoom}
            </h3>
            <Input
              label="Custom Option"
              placeholder="Enter custom option"
              ref={inputRef}
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              isInvalid={!!errors.addOption}
              errorMessage={errors.addOption}
              variant="bordered"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleAddOption}
              isLoading={isSubmitting}
            >
              Add Option
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
