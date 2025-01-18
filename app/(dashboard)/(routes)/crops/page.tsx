"use client";

import { useState } from "react";
import { Plus, X, Trash, Sprout } from "lucide-react";
import { Input } from "@/components/ui/input";
import Heading from "@/components/heading";
import { Empty } from "@/components/empty"; // Assuming this is your empty state component

const CropsPage = () => {
  const [crops, setCrops] = useState<any[]>([]); // State to store crops
  const [isFormOpen, setIsFormOpen] = useState(false); // State to manage the form visibility
  const [formData, setFormData] = useState({
    name: "",
    season: "",
    quantity: "",
    costPerKg: "",
    sellingPrice: "",
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSaveCrop = () => {
    if (formData.name && formData.season && formData.quantity && formData.costPerKg && formData.sellingPrice) {
      setCrops([
        ...crops,
        { ...formData, id: new Date().toISOString() }, // Adding a unique ID for each crop
      ]);
      setIsFormOpen(false); // Close form after saving
      setFormData({
        name: "",
        season: "",
        quantity: "",
        costPerKg: "",
        sellingPrice: "",
      }); // Reset form fields
    } else {
      alert("Please fill in all fields");
    }
  };

  // Handle crop deletion
  const handleDeleteCrop = (id: string) => {
    setCrops(crops.filter((crop) => crop.id !== id));
  };

  return (
    <>
      <div>
        <Heading
          title="Crops Management"
          description="Manage and track your crops"
          icon={Sprout}
          iconColor="text-green-500"
          bgColor="bg-green-500/10"
        />

        <div className="px-4 lg:px-8 mt-6">
          {/* Add Crop Button */}
          <div className="fixed bottom-6 right-6">
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 shadow-lg"
            >
              <Plus size={24} />
            </button>
          </div>

          {/* Slider Form */}
          {isFormOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
              <div className="bg-white w-[400px] p-6 rounded-l-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Add New Crop</h3>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X />
                  </button>
                </div>
                <form className="flex flex-col gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Crop Name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Input
                      name="season"
                      placeholder="Season"
                      value={formData.season}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Input
                      name="quantity"
                      placeholder="Quantity"
                      type="number"  // Set type as number for quantity
                      value={formData.quantity}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Input
                      name="costPerKg"
                      placeholder="Cost per kg"
                      value={formData.costPerKg}  // No numeric input type for cost per kg
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Input
                      name="sellingPrice"
                      placeholder="Selling Price"
                      value={formData.sellingPrice}  // No numeric input type for selling price
                      onChange={handleInputChange}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveCrop}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                  >
                    Save Crop
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Crop Cards */}
          <div className="mt-6">
            {crops.length === 0 ? (
              // Empty State with Image
              <div className="flex justify-center items-center">
                <Empty label="No crops added yet" />
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
    </>
  );
};

export default CropsPage;
