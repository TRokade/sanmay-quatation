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
                  <TableHead>Sizes</TableHead>
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
                <TableHead>Sizes</TableHead>
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
                  <TableCell>
                    {item.item == "Enter Carpet Area"
                      ? "Carpet Area"
                      : item.item}
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.size}</TableCell>
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
                <TableCell align="left" colSpan={7} className="font-bold">
                  Room Total:
                </TableCell>
                <TableCell align="right" className="font-bold">
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
        <hr className=" h-1 bg-gray-400"></hr>
        <div className=" flex mt-4">
          <div class=" rounded-lg text-gray-800">
            <h2 class="text-[12px]  font-bold mb-2">
              *Warsto Terms & Conditions for Price and Validity in the Estimated
              Quote Calculator
            </h2>
            <h3 class="text-[12px] font-semibold ">1. Estimated Pricing</h3>
            <ul class="  text-[12px]">
              <li>
                The prices shown in this calculator are estimates based on the
                options selected and general market rates. These are not final
                prices and should be used solely as a preliminary budget guide.
              </li>
              <li>
                Final pricing will be provided upon a detailed review of the
                design, materials, site-measurements, and customization choices
                in a formal design consultation with our team.
              </li>
            </ul>

            <h3 class="text-[12px] font-semibold ">2. Price Variability</h3>
            <ul class="  text-[12px]">
              <li>
                Prices of materials and components may fluctuate due to market
                conditions, supply chain changes, or material availability.
                Therefore, the final price may differ from the estimate provided
                by this calculator.
              </li>
              <li>
                Additional charges may apply for services not included in the
                estimate, such as delivery, installation, and taxes.
              </li>
            </ul>

            <h3 class="text-[12px] font-semibold ">
              3. Estimate Validity Period
            </h3>
            <ul class="  text-[12px]">
              <li>
                This estimate is valid for 15 days from the date it is
                generated. Pricing, availability, and options may change after
                this period. If you wish to proceed after this period, we
                recommend generating a new estimate or consulting with our team
                to confirm pricing.
              </li>
            </ul>

            <h3 class="text-[12px] font-semibold ">
              4. Limitations of the Estimate
            </h3>
            <ul class="  text-[12px]">
              <li>
                This calculator offers an estimate based on basic information
                entered by the user. Complex requirements, bespoke designs, or
                specific material preferences will require a detailed
                assessment, which may affect final costs.
              </li>
              <li>
                The estimate does not constitute a final offer or an obligation
                for Warsto to provide the quoted price until a formal quote has
                been issued and accepted.
              </li>
            </ul>

            <h3 class="text-[12px] font-semibold ">
              5. Formal Quote Requirement
            </h3>
            <ul class="  text-[12px]">
              <li>
                To proceed with a purchase, a formal quote will be generated
                after discussing specific project details. This formal quote
                will supersede any estimated price provided by the calculator
                and will include final pricing, payment terms, and any
                applicable discounts or offers.
              </li>
              <li>
                A minimum purchase value of INR 50,000/- is required to confirm
                your order with Warsto.
              </li>
            </ul>

            <h3 class="text-[12px] font-semibold ">6. Acceptance of Terms</h3>
            <ul class="  text-[12px]">
              <li>
                By using this calculator, you acknowledge that the estimate
                provided is for guidance only and that the final price may vary.
                For a binding price, a formal quotation and contract must be
                issued by Warsto.
              </li>
            </ul>
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
    <div className="min-h-screen bg-gray-50 pt-24 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4 text-sm">
                <div>
                  {/* <h1 className="text-2xl font-bold mb-2">Warsto</h1> */}
                  <Image
                    src={warsto}
                    alt="Warsto Logo"
                    className="py-4"
                    width={200}
                    height={200}
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
                <h2 className="text-xl font-semibold mb-4">
                  Estimated Quotation
                </h2>
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
