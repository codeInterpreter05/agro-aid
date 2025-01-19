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
      // Basic validation
      return;
    }

    if (!newCrop.quantity || !newCrop.costPerKg || !newCrop.sellingPrice) {
      alert("Please fill in all required fields!");
      return;
    }

    // Call the mutation to send data to the backend
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
          // Refetch crops, clear input fields, and close the sheet
          refetch();
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
                className="w-full bg-green-500 text-white py-2 px-4 rounded-sm hover:bg-green-600 shadow-lg mt-6"
              >
                {createCropMutation.isPending ? "Saving..." : "Save Crop"}
              </button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Crop Cards */}
        <div className="mt-6">
          {crops.length === 0 ? (
            // Empty State with Image
            <div className="flex justify-center items-center">
              <Empty label="No crops added yet" src="/crop.png" />
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
                  <p className="text-gray-700">
                    Selling Price: {crop.sellingPrice}
                  </p>
                  <div className="flex space-x-2 mt-4">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <button
                        onClick={() => handleDeleteCrop(crop?.id)}
                        disabled={deleteCropMutation.isPending}
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
