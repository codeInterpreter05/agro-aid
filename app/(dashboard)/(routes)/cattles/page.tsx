"use client";

import { useEffect, useState } from "react";
import { Plus, Trash, Cat } from "lucide-react";
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
import { useGetCattle } from "@/features/cattle/api/use-get-cattle";
import { useCreateCattle } from "@/features/cattle/api/use-create-cattle";
import { useDeleteCattle } from "@/features/cattle/api/use-delete-cattle";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Select } from "@/components/ui/select"; // Ensure correct import based on your library
import { useRouter } from "next/navigation";

const CattlePage = () => {
  const [cattle, setCattle] = useState<any[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [newCattle, setNewCattle] = useState({
    name: "",
    breed: "",
    gender: "",
    weight: "",
    feedingCycle: "",
  });

  const { data: fetchedCattle, refetch } = useGetCattle();
  const createCattleMutation = useCreateCattle();
  const deleteCattleMutation = useDeleteCattle();
  const router = useRouter();

  useEffect(() => {
    if (fetchedCattle) setCattle(fetchedCattle);
  }, [fetchedCattle]);

  const handleAddCattle = () => {
    const { name, breed, gender, weight } = newCattle;

    if (!name || !breed || !gender || !weight) {
      return;
    }

    createCattleMutation.mutate(
      {
        name: newCattle.name,
        breed: newCattle.breed,
        gender: newCattle.gender,
        weight: parseFloat(newCattle.weight),
        feedingCycle: newCattle.feedingCycle,
      },
      {
        onSuccess: () => {
          refetch();
          setNewCattle({ name: "", breed: "", gender: "", weight: "", feedingCycle: "" });
          setIsSheetOpen(false);
        },
        onError: (error) => console.error("Failed to create cattle:", error),
      }
    );
  };

  const handleDeleteCattle = (id: string) => {
    deleteCattleMutation.mutate(id, {
      onSuccess: () => refetch(),
      onError: (error) => console.error("Failed to delete cattle:", error),
    });
  };

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  return (
    <div>
      <Heading
        title="Cattle Management"
        description="Manage and track your cattle"
        icon={Cat}
        iconColor="text-blue-500"
        bgColor="bg-blue-500/10"
      />
      <div className="px-4 lg:px-8 mt-6">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <button className="bg-blue-500 text-white py-2 px-3 pr-4 rounded-sm hover:bg-blue-600 shadow-lg flex items-center gap-1 fixed bottom-6 right-6">
              <Plus size={20} />
              <span>New Cattle</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Add New Cattle</SheetTitle>
              <SheetDescription>Fill in the details to add a new cattle</SheetDescription>
            </SheetHeader>
            <div className="mt-4 flex flex-col space-y-4">
              <Input
                placeholder="Cattle Name"
                value={newCattle.name}
                onChange={(e) => setNewCattle({ ...newCattle, name: e.target.value })}
              />
              <Input
                placeholder="Breed"
                value={newCattle.breed}
                onChange={(e) => setNewCattle({ ...newCattle, breed: e.target.value })}
              />
              {/* Gender Dropdown */}
              <select
                value={newCattle.gender}
                onChange={(e) => setNewCattle({ ...newCattle, gender: e.target.value })}
                className="border border-gray-300 p-2 pr-4 rounded-md hover:bg-gray-100"
              >
                <option value="Male" className="p-4 hover:bg-gray-100">Male</option>
                <option value="Female" className="p-4  hover:bg-gray-100">Female</option>
              </select>
              <Input
                placeholder="Weight (kg)"
                type="number"
                value={newCattle.weight}
                onChange={(e) => setNewCattle({ ...newCattle, weight: e.target.value })}
              />
              <Input
                placeholder="Feeding Cycle (kg per day)"
                type="number"
                value={newCattle.feedingCycle}
                onChange={(e) => setNewCattle({ ...newCattle, feedingCycle: e.target.value })}
              />
            </div>
            <SheetFooter>
              <button
                onClick={handleAddCattle}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full mt-4"
              >
                Save Cattle
              </button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <div className="mt-6">
          {cattle.length === 0 ? (
            <div className="flex justify-center items-center">
              <Empty label="No cattle added yet" src="/cow.png" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cattle.map((cattle) => (
                <div
                  key={cattle.id}
                  className="bg-white rounded-2xl shadow-lg p-6 transition-transform transform 
                hover:scale-105 hover:shadow-2xl will-change-transform"
                >
                  <div className="flex items-center justify-between pb-3 border-b-2 border-gray-100">
                    <h4 className="text-2xl font-semibold text-gray-800">
                      {cattle.name.charAt(0).toUpperCase() + cattle.name.slice(1)}
                    </h4>
                    <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-sm uppercase font-semibold">
                      {cattle.breed}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[1rem] text-gray-600 font-medium">Gender</span>
                      <div className="px-4 py-1 text-blue-500 rounded-sm text-sm font-bold">
                        {cattle.gender}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[1rem] text-gray-600 font-medium">Weight</span>
                      <div className="px-4 py-1 text-yellow-500 rounded-sm text-sm font-bold">
                        {cattle.weight} kg
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[1rem] text-gray-600 font-medium">Feeding Cycle</span>
                      <div className="px-4 py-1 text-green-500 rounded-sm text-sm font-bold">
                        {cattle.feedingCycle} kg/day
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between">
                    <button
                      onClick={() => handleDeleteCattle(cattle.id)}
                      disabled={deleteCattleMutation.isPending}
                      className="mt-6 w-18 bg-red-500/90 text-white py-2 px-4 rounded-sm hover:bg-red-600 shadow-md transition"
                    >
                      <Trash className="w-4 h-4 inline mb-1" /> Delete
                    </button>
                    <button
                      className="mt-6 w-18 bg-sky-500/20 text-sky-500 py-2 px-4 rounded-sm hover:bg-blue-600/30 shadow-md transition"
                      onClick={() => {
                        router.push("/chatbot"); 
                      }}
                    >
                      <Cat className="w-6 h-6 inline mb-1" /> Diagnose
                    </button>
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

export default CattlePage;
