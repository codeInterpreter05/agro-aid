"use client";

import { useState } from "react";
import { Plus, Trash, Cat } from "lucide-react";
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

const CattlesPage = () => {
  const [cattles, setCattles] = useState<any[]>([]); // State to store cattles
  const [newCattle, setNewCattle] = useState({
    name: "",
    breed: "",
    gender: "",
    weight: "",
  });

  // Handle adding a new cattle
  const handleAddCattle = () => {
    if (!newCattle.name || !newCattle.breed || !newCattle.gender || !newCattle.weight) return; // Basic validation
    setCattles([
      ...cattles,
      { ...newCattle, id: new Date().toISOString() }, // Add unique ID for each cattle
    ]);
    setNewCattle({ name: "", breed: "", gender: "", weight: "" });
  };

  // Handle cattle deletion
  const handleDeleteCattle = (id: string) => {
    setCattles(cattles.filter((cattle) => cattle.id !== id));
  };

  return (
    <div>
      <Heading
        title="Cattle Management"
        description="Manage and track your cattles"
        icon={Cat}
        iconColor="text-blue-500"
        bgColor="bg-blue-500/10"
      />

      <div className="px-4 lg:px-8 mt-6">
        {/* Add Cattle Button with Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="bg-blue-500 text-white py-2 px-3 pr-4 rounded-sm hover:bg-blue-600 shadow-lg flex items-center gap-1 fixed bottom-6 right-6">
              <Plus size={20} />
              <span>New Cattle</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Add New Cattle</SheetTitle>
              <SheetDescription>
                Fill in the details to add a new cattle
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 flex flex-col space-y-4">
              <Input
                placeholder="Enter the cattle name"
                value={newCattle.name}
                onChange={(e) => setNewCattle({ ...newCattle, name: e.target.value })}
              />
              <Input
                placeholder="Enter the breed"
                value={newCattle.breed}
                onChange={(e) => setNewCattle({ ...newCattle, breed: e.target.value })}
              />
              <Input
                placeholder="Enter the gender (e.g., Male/Female)"
                value={newCattle.gender}
                onChange={(e) => setNewCattle({ ...newCattle, gender: e.target.value })}
              />
              <Input
                placeholder="Enter the weight (kgs)"
                type="string"
                value={newCattle.weight}
                onChange={(e) => setNewCattle({ ...newCattle, weight: e.target.value })}
              />
              <Input
                placeholder="Feeding cycle (food per kg in a day)"
                type="number"
                value={newCattle.weight}
                onChange={(e) => setNewCattle({ ...newCattle, weight: e.target.value })}
              />
            </div>
            <SheetFooter>
              <button
                onClick={handleAddCattle}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-sm hover:bg-blue-600 shadow-lg mt-6"
              >
                Save Cattle
              </button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Cattle Cards */}
        <div className="mt-6">
          {cattles.length === 0 ? (
            // Empty State with Image
            <div className="flex justify-center items-center">
              <Empty label="No cattles added yet" src="/cow.png" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cattles.map((cattle) => (
                <div
                  key={cattle.id}
                  className="bg-gray-100 shadow-md p-6 rounded-lg flex flex-col items-start space-y-4 hover:shadow-xl transition-all"
                >
                  <h4 className="text-xl font-semibold">{cattle.name}</h4>
                  <p className="text-gray-700">Breed: {cattle.breed}</p>
                  <p className="text-gray-700">Gender: {cattle.gender}</p>
                  <p className="text-gray-700">Weight: {cattle.weight} kg</p>
                  <div className="flex space-x-2 mt-4">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <button
                        onClick={() => handleDeleteCattle(cattle.id)}
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

export default CattlesPage;




