"use client";

import apiService from "@/app/services/apiService";
import { useState, useEffect } from "react";
import PropertyListItem from "./PropertyListItem";

export type PropertyType = {
  id: string;
  title: string;
  image_url?: string;
  price: number;
};

const PropertyList = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);

  // Function to fetch properties from the API

  const getProperties = async () => {
    try {
      const list = await apiService.get("/api/properties/");
      setProperties(list);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setProperties([]); // keep UI stable
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <>
      {properties.map((property) => (
        <PropertyListItem key={property.id} property={property} />
      ))}
    </>
  );
};

export default PropertyList;

//   const getProperties = async () => {
//     const tmpProperties = await apiService.get("/api/properties/");

//     console.log("Fetched properties:", tmpProperties);
//     setProperties(tmpProperties.data);
//     // const response = await fetch(url, {
//     //   method: "GET",
//     // })
//     //   .then((response) => response.json())
//     //   .then((json) => {
//     //     console.log("Fetched properties:", json);
//     //     setProperties(json.data);
//     //   })
//     //   .catch((error) => {
//     //     console.error("Error fetching properties:", error);
//     //   });
//   };

//   useEffect(() => {
//     getProperties();
//   }, []);

//   return (
//     <>
//       {(properties ?? []).map((property) => {
//         {
//           /* {properties.map((property) => { */
//         }
//         return <PropertyListItem key={property.id} property={property} />;
//       })}
//     </>
//   );
// };
// export default PropertyList;
