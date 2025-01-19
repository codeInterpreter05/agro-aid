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
          setNewCattle({ name: "", breed: "", gender: "", weight: "", feedingCycle: ""});
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
              <Input
                placeholder="Gender"
                value={newCattle.gender}
                onChange={(e) => setNewCattle({ ...newCattle, gender: e.target.value })}
              />
              <Input
                placeholder="Weight (kg)"
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
                <div key={cattle.id} className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg">
                  <h4 className="font-semibold text-lg">{cattle.name}</h4>
                  <p>Breed: {cattle.breed}</p>
                  <p>Gender: {cattle.gender}</p>
                  <p>Weight: {cattle.weight} kg</p>
                  <p>Feeding Cycle: {cattle.feedingCycle} kg per day</p>
                  <button
                    onClick={() => handleDeleteCattle(cattle.id)}
                    className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
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

export default CattlePage;




