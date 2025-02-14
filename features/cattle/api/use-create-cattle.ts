import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.cattle.$post>;
type RequestType = InferRequestType<typeof client.api.cattle.$post>["json"];

export const useCreateCattle = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.cattle.$post({ json });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Cattle created");
            queryClient.invalidateQueries({ queryKey: ["cattle"] });
        },
        onError: () => {
            toast.error("Failed to create cattle");
        }
    })

    return mutation;
}