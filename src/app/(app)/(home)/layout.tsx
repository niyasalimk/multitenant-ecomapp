import { Category } from '@/payload-types';
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SeachFilters } from "./search-filters";
import { CustomCategory } from './types';

interface Props {
    children: React.ReactNode;
};



const Layout= async ({children}: Props) => {
const payload = await getPayload({
    config: configPromise,
  });

 const data = await payload.find({
    collection: "categories",
    depth:1,
    pagination: false,
    where:{
      parent:{
        exists: false,
      },
    },
    sort: "name"
  });

  

  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) =>({
      ...(doc as Category),
      subcategories: undefined,
    }))
  }));

  console.log({
    data,
    formattedData
  })

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <SeachFilters data={formattedData} />
            <div className="flex-1 bg-[#F4f4f0]">
            {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;