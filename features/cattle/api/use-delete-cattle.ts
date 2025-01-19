import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.cattle[":id"]["$delete"]>;

export const useDeleteCattle = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, string>({
        mutationFn: async (id: string) => {
            if (!id) throw new Error("cattle ID is required");
            
            const response = await client.api.cattle[":id"]["$delete"]({
                param: { id }
            });
            
            if (!response.ok) {
                throw new Error("Failed to delete cattle");
            }
            
            const data = await response.json();
            return data;
        },
        onSuccess: () => {
            toast.success("cattle deleted");
            queryClient.invalidateQueries({ queryKey: ["cattle"] });
        },
        onError: () => {
            toast.error("Failed to delete cattle");
        }
    });

    return mutation;
};
