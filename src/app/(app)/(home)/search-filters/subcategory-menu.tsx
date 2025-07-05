"use client";

import { Category } from "@/payload-types";
import Link from "next/link";

interface Props {
  category: Category;
  isOpen: boolean;
  position: { top: number; left: number };
}

export const SubcategoryMenu = ({ category, isOpen, position }: Props) => {
  // In Payload CMS, a relationship field might be an array of IDs,
  // or an object containing a 'docs' array if it's a populated relationship.
  // The error ".map is not a function" suggests `category.subcategories` is not an array.
  // This line safely determines the correct array to map over.
  const subcategoriesList = Array.isArray(category.subcategories)
    ? category.subcategories
    : (category.subcategories as any)?.docs;

  // The guard clause now checks the correctly identified list of subcategories.
  if (!isOpen || !subcategoriesList || subcategoriesList.length === 0) {
    return null;
  }

  const backgroundColor = category.color || "#F5F5F5";

  return (
    <div
      className="fixed z-[100]" // Using z-[100] for a valid Tailwind class
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {/* Invisible bridge to maintain hover over the gap between the button and menu */}
      <div className="h-3 w-60" />
      <div
        style={{ backgroundColor }}
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
      >
        <div>
          {/* We now map over the `subcategoriesList` which is guaranteed to be an array if it exists. */}
          {subcategoriesList.map((subcategory: Category) => (
            <Link
              key={subcategory.id} // Using the unique 'id' for the key is best practice.
              href={`/products?category=${subcategory.slug}`}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center font-medium"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryMenu;
