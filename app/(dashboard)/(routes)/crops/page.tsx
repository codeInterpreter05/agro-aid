"use client";

import { useState } from "react";
import { Plus, Trash, Sprout } from "lucide-react";
import { Input } from "@/components/ui/input";
import Heading from "@/components/heading";
import { Empty } from "@/components/empty"; // Assuming this is your empty state component
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

const CropsPage = () => {
  const [crops, setCrops] = useState<any[]>([]); // State to store crops
  const [newCrop, setNewCrop] = useState({
    name: "",
    season: "",
    quantity: "",
    costPerKg: "",
    sellingPrice: "",
  });

  // Handle adding a new crop
  const handleAddCrop = () => {
    if (!newCrop.name || !newCrop.season) return; // Basic validation
    setCrops([
      ...crops,
      { ...newCrop, id: new Date().toISOString() }, // Add unique ID for each crop
    ]);
    setNewCrop({ name: "", season: "", quantity: "", costPerKg: "", sellingPrice: "" });
  };

  // Handle crop deletion
  const handleDeleteCrop = (id: string) => {
    setCrops(crops.filter((crop) => crop.id !== id));
  };

  return (
    <div>
      <Heading
        title="Crops Management"
        description="Manage and track your crops"
        icon={Sprout}
        iconColor="text-green-500"
        bgColor="bg-green-500/10"
      />

      <div className="px-4 lg:px-8 mt-6">
        {/* Add Crop Button with Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="bg-green-500 text-white py-2 px-3 pr-4 rounded-sm hover:bg-green-600 shadow-lg flex items-center gap-1 fixed bottom-6 right-6">
              <Plus size={20} />
              <span>New Crop</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Add New Crop</SheetTitle>
              <SheetDescription>
                Fill in the details to add a new crop
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 flex flex-col space-y-4">
              <Input
                placeholder="Enter the crop name"
                value={newCrop.name}
                onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
              />
              <Input
                placeholder="Enter the season of the crop"
                value={newCrop.season}
                onChange={(e) => setNewCrop({ ...newCrop, season: e.target.value })}
              />
              <Input
                placeholder="Enter the quantity (kgs)"
                type="text"
                value={newCrop.quantity}
                onChange={(e) => setNewCrop({ ...newCrop, quantity: e.target.value })}
              />
              <Input
                placeholder="Cost (per kg)"
                type="text"
                value={newCrop.costPerKg}
                onChange={(e) => setNewCrop({ ...newCrop, costPerKg: e.target.value })}
              />
              <Input
                placeholder="Selling price (per kg)"
                type="text"
                value={newCrop.sellingPrice}
                onChange={(e) => setNewCrop({ ...newCrop, sellingPrice: e.target.value })}
              />
            </div>
            <SheetFooter>
              <button
                onClick={handleAddCrop}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-sm hover:bg-green-600 shadow-lg mt-6"
              >
                Save Crop
              </button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Crop Cards */}
        <div className="mt-6">
          {crops.length === 0 ? (
            // Empty State with Image
            <div className="flex justify-center items-center">
              <Empty label="No crops added yet" src="/crop.png"/>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {crops.map((crop) => (
                <div
                  key={crop.id}
                  className="bg-gray-100 shadow-md p-6 rounded-lg flex flex-col items-start space-y-4 hover:shadow-xl transition-all"
                >
                  <h4 className="text-xl font-semibold">{crop.name}</h4>
                  <p className="text-gray-700">Season: {crop.season}</p>
                  <p className="text-gray-700">Quantity: {crop.quantity}</p>
                  <p className="text-gray-700">Cost per kg: {crop.costPerKg}</p>
                  <p className="text-gray-700">Selling Price: {crop.sellingPrice}</p>
                  <div className="flex space-x-2 mt-4">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <button
                        onClick={() => handleDeleteCrop(crop.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropsPage;

