import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.crops.$post>;
type RequestType = InferRequestType<typeof client.api.crops.$post>["json"];

export const useCreateCrop = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.crops.$post({ json });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("crop created");
            queryClient.invalidateQueries({ queryKey: ["crops"] });
        },
        onError: () => {
            toast.error("Failed to create crop");
        }
    })

    return mutation;
}