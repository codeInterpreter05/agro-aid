import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono"

export const useGetCrop = () => {
    const query = useQuery({
        queryKey: ['crops'],
        queryFn: async () => {
            const response = await client.api.crops.$get('/crops')

            if (!response.ok) {
                throw new Error(`Failed to fetch crops: ${response.status}`)
            }

            const { data } = await response.json();
            return data;
        },
    })
    return query;
}
