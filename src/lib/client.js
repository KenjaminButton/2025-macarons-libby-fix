import sanityClient from "@sanity/client";                        
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({                
  projectId: 'o3vxupfo',
  dataset: 'production',
  apiVersion: "2024-12-16",         
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,                        
});
                        
// console.log("Sanity Client:", client);

const builder = imageUrlBuilder(client);
    
export const urlFor = (source) => builder.image(source);