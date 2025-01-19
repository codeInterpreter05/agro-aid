import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.crops[":id"]["$delete"]>;

export const useDeleteCrop = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, string>({
        mutationFn: async (id: string) => {
            if (!id) throw new Error("crop ID is required");
            
            const response = await client.api.crops[":id"]["$delete"]({
                param: { id }
            });
            
            if (!response.ok) {
                throw new Error("Failed to delete crop");
            }
            
            const data = await response.json();
            return data;
        },
        onSuccess: () => {
            toast.success("Crop deleted");
            queryClient.invalidateQueries({ queryKey: ["crops"] });
        },
        onError: () => {
            toast.error("Failed to delete crop");
        }
    });

    return mutation;
};
