"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import tvUnitImg from "../../../public/images/tv-unit.png";
import sofaImg from "../../../public/images/sofa.png";
import crockeryUnitImg from "../../../public/images/crokery-unit.png";
import shoeImg from "../../../public/images/shoe.png";
import consoleTableImg from "../../../public/images/console-table.png";
import kitchenImg from "../../../public/images/kitchen.png";
import gkitchenImg from "../../../public/images/gkitchen.png";
import lkitchenImg from "../../../public/images/minus.png";
import parallelImg from "../../../public/images/parallel.png";
import thinLineImg from "../../../public/images/thin-line.png";
import wardrobeImg from "../../../public/images/closet.png";
import bedImg from "../../../public/images/double-bed.png";
import dresserImg from "../../../public/images/dresser.png";
import ceilingImg from "../../../public/images/ceiling.png";
import pipe from "../../../public/images/pipe.png";
import warsto from "@/public/images/warsto-logo.png";
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

export default function QuotationPage() {
  const [quotation, setQuotation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchQuotation = async () => {
      if (!params.quotationId) {
        setError("No quotation ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/quotation/${params.quotationId}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch quotation");
        }

        const data = await response.json();
        setQuotation(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotation();
  }, [params.quotationId]);

  // In your quotation page.jsx
  const renderItemTable = (roomItems, roomName) => {
    // Special handling for Services
    if (roomName === "Services") {
      const paintingItems = roomItems.filter(
        (item) => item.room === "WholeHousePainting"
      );
      const ceilingItems = roomItems.filter(
        (item) => item.room === "FalseCeilingElectrical"
      );

      return (
        <Card className="mb-8" key={roomName}>
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Sr.</TableHead>
                  <TableHead className="w-[100px]">Picture</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Area (sq ft)</TableHead>
                  <TableHead className="text-right">Rate (INR/sq ft)</TableHead>
                  <TableHead className="text-right">
                    Total Price (INR)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Whole House Painting Items */}
                {paintingItems.map((item, index) => (
                  <TableRow key={`painting-${index}`}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="w-16 h-16 bg-gray-100 rounded"></div>
                    </TableCell>
                    <TableCell>Whole House Painting</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{quotation.carpetArea}</TableCell>
                    <TableCell className="text-right">
                      {(item.price / quotation.carpetArea).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.price.toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))}

                {ceilingItems.map((item, index) => (
                  <TableRow key={`ceiling-${index}`}>
                    <TableCell>{paintingItems.length + index + 1}</TableCell>
                    <TableCell>
                      {optionImages.FalseCeilingElectrical?.[
                        item.description
                      ] ? (
                        <div className="w-16 h-16 relative">
                          <Image
                            src={
                              optionImages.FalseCeilingElectrical[
                                item.description
                              ]
                            }
                            alt={item.description}
                            fill
                            className="object-contain rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded"></div>
                      )}
                    </TableCell>
                    <TableCell>False Ceiling & Electrical</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{quotation.carpetArea}</TableCell>
                    <TableCell className="text-right">
                      {item.isCustom
                        ? "Custom"
                        : (item.price / quotation.carpetArea).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.isCustom
                        ? "TBD"
                        : item.price.toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow className="font-medium">
                  <TableCell colSpan={6} className="text-right">
                    Services Total:
                  </TableCell>
                  <TableCell className="text-right">
                    ₹
                    {roomItems
                      .reduce((sum, item) => sum + (item.price || 0), 0)
                      .toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="mb-8" key={roomName}>
        <CardHeader>
          <CardTitle>{roomName.replace(/([A-Z])/g, " $1").trim()}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Sr.</TableHead>
                <TableHead className="w-[100px]">Picture</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Qty. Unit</TableHead>
                <TableHead className="text-right">Price (INR)</TableHead>
                <TableHead className="text-right">Total Price (INR)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roomItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {optionImages[roomName]?.[item.item] ? (
                      <div className="w-16 h-16 relative">
                        <Image
                          src={optionImages[roomName][item.item]}
                          alt={item.item}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded"></div>
                    )}
                  </TableCell>
                  <TableCell>{item.item == "Enter Carpet Area" ? "Carpet Area" : item.item }</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.isCustom ? "-" : "1"}</TableCell>
                  <TableCell className="text-right">
                    {item.isCustom ? "-" : item.price.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.isCustom ? "TBD" : item.price.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-medium">
                <TableCell scolSpan={6} className="text-right">
                  Room Total:
                </TableCell>
                <TableCell className="text-right">
                  ₹
                  {roomItems
                    .reduce((sum, item) => sum + (item.price || 0), 0)
                    .toLocaleString("en-IN")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  const renderSummary = () => (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Project Total Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {Object.entries(
              quotation.details.reduce((acc, item) => {
                if (!acc[item.room]) acc[item.room] = 0;
                acc[item.room] += item.price;
                return acc;
              }, {})
            ).map(([room, total], index) => (
              <TableRow key={room}>
                <TableCell>{`${index + 1} ${room}`}</TableCell>
                <TableCell className="text-right">
                  ₹{total.toLocaleString("en-IN")}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="font-medium">
              <TableCell>Gross Total</TableCell>
              <TableCell className="text-right">
                ₹{quotation.totalCost.toLocaleString("en-IN")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>GST</TableCell>
              <TableCell className="text-right">₹0.00</TableCell>
            </TableRow>
            <TableRow className="font-medium text-lg">
              <TableCell>Net Total After Tax</TableCell>
              <TableCell className="text-right">
                ₹{quotation.totalCost.toLocaleString("en-IN")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="mt-8 flex justify-between">
          <div>
            <p className="font-medium mb-2">
              For {quotation.customerName || "Customer"}
            </p>
            <p className="text-gray-600">Authorised Signatory</p>
          </div>
          <div>
            <p className="font-medium mb-2">For Warsto</p>
            <p className="text-gray-600">Authorised Signatory</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-800">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!quotation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-amber-800">
              Quotation Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-600">
              The requested quotation could not be found.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const daysRemaining = Math.ceil(
    (new Date(quotation.validUntil) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gray-50 mt-20 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-8">
        <CardContent className="p-6">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                
                <div>
                  {/* <h1 className="text-2xl font-bold mb-2">Warsto</h1> */}
                  <Image
                  src={warsto}
                  alt="Warsto Logo"
                  className="py-4"
                  width={150}
                  height={150}
                />
                  <p className="text-gray-600">Rajshree Plaza,</p>
                  <p className="text-gray-600">
                    L.B.S Road, Ghatkopar(W), Mumbai
                  </p>
                  <p className="text-gray-600">Maharashtra</p>
                  <p className="text-gray-600">
                    GST No.: {quotation.gstNo || "ABC33510TG5"}
                  </p>
                </div>
              </div>
              <div className=" text-right py-4">
                <h2 className="text-xl font-semibold mb-4">Estimated Quotation</h2>
                <div className="text-gray-600">
                <p>{quotation.formId?.name}</p>
                <p>{quotation.formId?.email}</p>
                <p>{quotation.formId?.phoneNumber}</p>
                <p>{quotation.formId?.propertyName}</p>
                <p>Dated: {new Date().toLocaleDateString()}</p>
                </div>
                <p className="mt-2 text-amber-600 font-medium">
                  Valid for {daysRemaining} days (until{" "}
                  {new Date(quotation.validUntil).toLocaleDateString()})
                </p>
              </div>
            </div>
          </CardContent>

        </Card>

        {Object.entries(
          quotation.details.reduce((acc, item) => {
            if (!acc[item.room]) acc[item.room] = [];
            acc[item.room].push(item);
            return acc;
          }, {})
        ).map(([room, items]) => renderItemTable(items, room))}

        {renderSummary()}
      </div>
    </div>
  );
}
