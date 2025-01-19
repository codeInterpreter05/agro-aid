import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono"

export const useGetCattle = () => {
    const query = useQuery({
        queryKey: ['cattle'],
        queryFn: async () => {
            const response = await client.api.cattle.$get('/cattle')

            if (!response.ok) {
                throw new Error(`Failed to fetch cattle: ${response.status}`)
            }

            const { data } = await response.json();
            return data;
        },
    })
    return query;
}
