"use client";

import { useEffect, useState } from "react";
import { Plus, Trash, Sprout } from "lucide-react";
import { Input } from "@/components/ui/input";
import Heading from "@/components/heading";
import { Empty } from "@/components/empty";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { useCreateCrop } from "@/features/crops/api/use-create-crop";
import { useDeleteCrop } from "@/features/crops/api/use-delete-crop";
import { useGetCrop } from "@/features/crops/api/use-get-crops"; // Fetch crops from backend

const CropsPage = () => {
  const [crops, setCrops] = useState<any[]>([]); // Local state for crops
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to control sheet visibility
  const [newCrop, setNewCrop] = useState({
    name: "",
    season: "",
    quantity: "",
    costPerKg: "",
    sellingPrice: "",
  });

  const createCropMutation = useCreateCrop(); // Use the mutation hook
  const deleteCropMutation = useDeleteCrop(); // Use the mutation hook for deletion
  const { data: fetchedCrops, refetch } = useGetCrop(); // Fetch all crops

  useEffect(() => {
    if (fetchedCrops) {
      setCrops(fetchedCrops);
    }
  }, [fetchedCrops]);

  // Handle adding a new crop
  const handleAddCrop = () => {
    if (!newCrop.name || !newCrop.season) {
      alert("Please fill in all required fields!"); // Basic validation
      return;
    }

    if (!newCrop.quantity || !newCrop.costPerKg || !newCrop.sellingPrice) {
      alert("Please fill in all required fields!");
      return;
    }

    createCropMutation.mutate(
      {
        name: newCrop.name,
        season: newCrop.season,
        quantity: parseInt(newCrop.quantity.toString()),
        costPerKg: parseInt(newCrop.costPerKg.toString()),
        sellingPrice: parseInt(newCrop.sellingPrice.toString()),
      },
      {
        onSuccess: () => {
          refetch(); // Refetch crops
          setNewCrop({
            name: "",
            season: "",
            quantity: "",
            costPerKg: "",
            sellingPrice: "",
          });
          setIsSheetOpen(false); // Close the sheet
        },
        onError: (error) => {
          console.error("Failed to create crop:", error);
        },
      }
    );
  };

  // Handle crop deletion
  const handleDeleteCrop = (id: any) => {
    deleteCropMutation.mutate(id, {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error("Failed to delete crop:", error);
      },
    });
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
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <button className="bg-green-500 text-white py-2 px-3 pr-4 rounded-full hover:bg-green-600 shadow-lg flex items-center gap-2 fixed bottom-6 right-6">
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
                onChange={(e) =>
                  setNewCrop({ ...newCrop, name: e.target.value })
                }
              />
              <Input
                placeholder="Enter the season of the crop"
                value={newCrop.season}
                onChange={(e) =>
                  setNewCrop({ ...newCrop, season: e.target.value })
                }
              />
              <Input
                placeholder="Enter the quantity (kgs)"
                type="text"
                value={newCrop.quantity}
                onChange={(e) =>
                  setNewCrop({
                    ...newCrop,
                    quantity: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Cost (per kg)"
                type="text"
                value={newCrop.costPerKg}
                onChange={(e) =>
                  setNewCrop({
                    ...newCrop,
                    costPerKg: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Selling price (per kg)"
                type="number"
                value={newCrop.sellingPrice}
                onChange={(e) =>
                  setNewCrop({
                    ...newCrop,
                    sellingPrice: e.target.value,
                  })
                }
              />
            </div>
            <SheetFooter>
              <button
                onClick={handleAddCrop}
                disabled={createCropMutation.isPending}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 shadow-lg mt-6"
              >
                {createCropMutation.isPending ? "Saving..." : "Save Crop"}
              </button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Crop Cards */}
        <div className="mt-6">
          {crops.length === 0 ? (
            <div className="flex justify-center items-center">
              <Empty label="No crops added yet" src="/crop.png" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {crops.map((crop) => (
                <div
                  key={crop.id}
                  className="bg-white rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl will-change-transform"
                >
                  {/* Header Section */}
                  <div className="flex items-center justify-between">
                    <h4 className="text-2xl font-semibold text-gray-800">{crop.name}</h4>
                    <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full uppercase font-semibold">
                      {crop.season}
                    </span>
                  </div>

                  {/* Details Section */}
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 font-medium">Quantity</span>
                      <div className="px-4 py-2 text-white bg-blue-500 rounded-full text-sm">{crop.quantity} kgs</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 font-medium">Cost per kg</span>
                      <div className="px-4 py-2 text-white bg-yellow-500 rounded-full text-sm">₹{crop.costPerKg}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 font-medium">Selling Price</span>
                      <div className="px-4 py-2 text-white bg-green-500 rounded-full text-sm">₹{crop.sellingPrice}</div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteCrop(crop.id)}
                    disabled={deleteCropMutation.isPending}
                    className="mt-6 w-18 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 shadow-md transition"
                  >
                    <Trash className="w-4 h-4 inline" /> Delete
                  </button>
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
