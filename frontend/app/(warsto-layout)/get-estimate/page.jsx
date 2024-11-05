"use client";

import { useState, useEffect } from "react";
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
import crockeryUnitImg from "@/public/images/crockery.png";
import shoeImg from "@/public/images/shoe.png";
import consoleTableImg from "@/public/images/console.png";
import ukitchenImg from "@/public/images/U.png";
import gkitchenImg from "@/public/images/G-shape.png";
import lkitchenImg from "@/public/images/L-shape.png";
import parallelkitchenImg from "@/public/images/parallelkitchen.png";
import iplatformkitchen from "@/public/images/Iplatform.png";
import wardrobeImg from "@/public/images/Wardrobe.png";
import bedImg from "@/public/images/bed.png";
import dresserImg from "@/public/images/dresser.png";
import Basicceiling from "@/public/images/Basicceiling.png";
import peripheralceiling from "@/public/images/peripheralceiling.png";
import customceiling from "@/public/images/customceiling.png";
import firepipeboxing from "@/public/images/sprinkler.png";
import WardrobeLoft from "@/public/images/WardrobeLoft.png";
import sidetable from "@/public/images/side-table.png";
import Study from "@/public/images/studytable.png";
import Vanity from "@/public/images/vanity.png";

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
      "U Shape": ukitchenImg,
      "G Shape": gkitchenImg,
      "|| Shape": parallelkitchenImg,
      "| Shape": iplatformkitchen,
    },
    MasterBedroom: {
      Wardrobe: wardrobeImg,
      "Lofts on Wardrobe": WardrobeLoft,
      "Bed Side Tables": sidetable,
      Study: Study,
      Bed: bedImg,
      Dresser: dresserImg,
      Vanity: Vanity,
    },
    MasterBedroom2: {
      Wardrobe: wardrobeImg,
      "Lofts on Wardrobe": WardrobeLoft,
      "Bed Side Tables": sidetable,
      Study: Study,
      Bed: bedImg,
      Dresser: dresserImg,
      Vanity: Vanity,
    },
    CommonBedroom: {
      Wardrobe: wardrobeImg,
      "Lofts on Wardrobe": WardrobeLoft,
      "Bed Side Tables": sidetable,
      Study: Study,
      Bed: bedImg,
      Dresser: dresserImg,
    },
    FalseCeilingElectrical: {
      "Fire pipe Boxing": firepipeboxing,
      Basic: Basicceiling,
      Peripheral: peripheralceiling,
      "Custom Design": customceiling,
    },
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
      // Special handling for Kitchen and FalseCeilingElectrical
      if (room === "Kitchen" || room === "FalseCeilingElectrical") {
        // If clicking the currently selected option, deselect it
        if (prev[room]?.[0] === option) {
          return {
            ...prev,
            [room]: [],
          };
        }
        // If clicking "None", clear other selections
        if (option === "None") {
          return {
            ...prev,
            [room]: ["None"],
          };
        }
        // If "None" is currently selected and clicking another option, clear "None"
        if (prev[room]?.includes("None")) {
          return {
            ...prev,
            [room]: [option],
          };
        }
        // Otherwise, select the new option
        return {
          ...prev,
          [room]: [option],
        };
      }

      // Regular room handling
      if (option === "None") {
        return {
          ...prev,
          [room]: prev[room]?.includes("None") ? [] : ["None"],
        };
      }

      if (prev[room]?.includes("None")) {
        return {
          ...prev,
          [room]: [option],
        };
      }

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

  const areAllRoomsSelected = () => {
    // Get all rooms except special sections
    const normalRooms = Object.keys(formOptions).filter(
      (room) =>
        room !== "Services" &&
        room !== "WholeHousePainting" &&
        room !== "FalseCeilingElectrical"
    );

    // Check if each room has at least one selection
    return normalRooms.every((room) => selectedOptions[room]?.length > 0);
  };

  const isStepComplete = () => {
    if (step === 1) return selectedBHK !== "";
    if (step === 2) {
      const hasAllRoomSelections = Object.keys(formOptions)
        .filter(
          (room) =>
            room !== "Services" &&
            room !== "WholeHousePainting" &&
            room !== "FalseCeilingElectrical"
        )
        .every((room) => selectedOptions[room]?.length > 0);
      const hasCompletedServices =
        carpetArea.trim() !== "" &&
        selectedOptions["FalseCeilingElectrical"]?.length > 0;

      return hasAllRoomSelections && hasCompletedServices;
    }
    return true;
  };

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
          setFormSubmitted(true);
          return;
        }
        setQuotationId(data.quotationId);
        setFormSubmitted(true);
        setQuotationLink(`/quotation/${data.quotationId}`);
        localStorage.removeItem("formData");
        return (
          <SubmissionSummary data={submitData} quotationId={data.quotationId} />
        );
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
                className="gap-4 p-0"
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
                        <div className="p-4 space-y-6">
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
                              {!carpetArea && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="mt-2 text-sm text-[#ef4665] bg-[#fde8ec] p-3 rounded-lg flex items-center"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  Please enter carpet area
                                </motion.div>
                              )}
                            </div>
                          </div>

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
                          <div>
                            <h4 className="font-medium text-lg mb-4">
                              False Ceiling & Electrical
                            </h4>
                            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mb-4">
                              <p>
                                Note: Please select one option from this section
                              </p>
                            </div>
                            {!selectedOptions["FalseCeilingElectrical"]
                              ?.length && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-4 text-sm text-[#ef4665] bg-[#fde8ec] p-3 rounded-lg flex items-center"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 mr-2"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Please select one option for False Ceiling &
                                Electrical
                              </motion.div>
                            )}
                            <div className="grid grid-cols-2  md:grid-cols-4  gap-4">
                              {options.FalseCeilingElectrical?.map((option) => (
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
                                      : selectedOptions[
                                          "FalseCeilingElectrical"
                                        ]?.includes("None")
                                      ? "border-gray-200 bg-gray-100 opacity-50 pointer-events-none"
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
                                    isDisabled={
                                      selectedOptions[
                                        "FalseCeilingElectrical"
                                      ]?.includes("None") && option !== "None"
                                    }
                                  >
                                    {option}
                                  </Checkbox>
                                </div>
                              ))}
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
                            </div>
                          </div>
                        </div>
                      </AccordionItem>
                    );
                  }

                  if (
                    room === "WholeHousePainting" ||
                    room === "FalseCeilingElectrical"
                  ) {
                    return null;
                  }
                  const hasSelection = selectedOptions[room]?.length > 0;
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
                                hasSelection
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
                        {!selectedOptions[room]?.length && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-4 text-sm text-[#ef4665] bg-[#fde8ec] p-3 rounded-lg flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Please select at least one option
                          </motion.div>
                        )}
                        {(room === "Kitchen" ||
                          room === "FalseCeilingElectrical") && (
                          <div className="mb-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <p>
                              Note: You can select only one option from this
                              section
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                            className="mt-4 bg-[#fde8ec] text-[#ef4665] hover:bg-[#fcd5dd] flex items-center justify-center px-4 py-2 rounded-md"
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
          <div className="flex justify-between mt-8">
            <Button
              onClick={prevStep}
              disabled={step === 1}
              className={`px-6 py-2 rounded-md ${
                step === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isStepComplete() || isSubmitting}
              className={`px-6 py-2 rounded-md ${
                !isStepComplete() || isSubmitting
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#ef4665] text-white hover:bg-[#dc4060]"
              }`}
              title={
                step === 2 && !isStepComplete()
                  ? "Please select at least one option for each room and complete the Services section"
                  : ""
              }
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
                <>
                  {step === 3 ? "Submit" : "Next"}
                  {step !== 3 && <ChevronRight className="w-5 h-5 ml-1" />}
                </>
              )}
            </Button>
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
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          if (modalOpenedRoom) {
            setSelectedKeys(new Set([modalOpenedRoom]));
            setActiveRoom(modalOpenedRoom);
          }
        }}
      >
        <ModalContent>
          <ModalBody>
            <h3 className="flex text-xl my-2 font-bold  flex-col gap-1">
              Add Custom Option for{" "}
              {currentRoom.replace(/([A-Z])/g, " $1").trim()}
            </h3>

            <Input
              label="Custom Option"
              placeholder="Enter custom option"
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
