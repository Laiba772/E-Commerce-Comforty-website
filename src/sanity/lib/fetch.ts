import { createClient } from "next-sanity";

const client = createClient({
    projectId : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset : process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn : true,
    apiVersion : "2023-10-10",
    token: process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN
})

export async function sanityFetch({query, params = {}}: {query : string ,params?: any}){
    return await client.fetch(query, params)
}
    
