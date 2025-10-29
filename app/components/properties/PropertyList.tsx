"use client";

import apiService from "@/app/services/apiService";
import { useState, useEffect } from "react";
import PropertyListItem from "./PropertyListItem";

export type PropertyType = {
  id: string;
  title: string;
  image_url?: string;
  price: number;
  is_favorite: boolean;
};

interface PropertyListProps {
  landlord_id?: string | null;
}

const PropertyList: React.FC<PropertyListProps> = ({ landlord_id }) => {
  const [properties, setProperties] = useState<PropertyType[]>([]);

  const markFavorite = (id: string, is_favorite: boolean) => {
    const tmpProperties = properties.map((property: PropertyType) => {
      if (property.id == id) {
        property.is_favorite = is_favorite;
        if (is_favorite) {
          console.log(`Property ${id} marked as favorite`);
        } else {
          console.log(`Property ${id} unmarked as favorite`);
        }
      }
      return property;
    });
    setProperties(tmpProperties);
  };

  // Function to fetch properties from the API

  const getProperties = async () => {
    try {
      let url = "/api/properties/";
      if (landlord_id) {
        const qs = new URLSearchParams({ landlord_id: String(landlord_id) });
        url += `?${qs.toString()}`;
      }
      const tmpProperties = await apiService.get(url);

      const favoriteIds: string[] = tmpProperties.favorites || [];

      setProperties(
        (tmpProperties.data || []).map((property: PropertyType) => {
          property.is_favorite = favoriteIds.includes(String(property.id));
          return property;
        })
      );
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setProperties([]);
    }
  };
  //   url += `?landlord_id=${landlord_id}`;
  // }
  //     console.log("Fetching from:", url);
  //     const tmpProperties = await apiService.get(url);
  //     console.log("Response:", tmpProperties);
  //     setProperties(tmpProperties); //  don't use .data
  //   } catch (error) {
  //     console.error("Failed to fetch properties:", error);
  //     setProperties([]); // keep UI stable
  //   }
  // };
  // const getProperties = async () => {
  //   try {
  //     let url = "/api/properties/";
  //     if (landlord_id) {
  //       const qs = new URLSearchParams({ landlord_id: String(landlord_id) });
  //       url += `?${qs.toString()}`; // ✅ encoded
  //     }

  //     const list = await apiService.get(url);
  //     setProperties(list); // ✅ don't use .data
  //   } catch (error) {
  //     console.error("Failed to fetch properties:", error);
  //     setProperties([]); // keep UI stable
  //   }
  // };

  // const getProperties = async () => {
  //   try {
  //     let url = "/api/properties/";
  //     if (landlord_id) {
  //       const qs = new URLSearchParams({ landlord_id: String(landlord_id) });
  //       url += `?${qs}`;
  //     }
  //     const res = await apiService.get(url);
  //     setProperties(res.data); // ✅ only if the API truly returns { data: [...] }
  //   } catch (error) {
  //     console.error("Failed to fetch properties:", error);
  //     setProperties([]);
  //   }
  // };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <>
      {properties.map((property) => (
        <PropertyListItem
          key={property.id}
          property={property}
          markFavorite={(is_favorite: any) =>
            markFavorite(property.id, is_favorite)
          }
        />
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
