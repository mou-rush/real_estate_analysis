import { IAmenityCategory } from "./fetchAmenitiesTypes";

export const fetchAmenities = async (
  _lat: number,
  _lng: number,
  _radius: number
): Promise<IAmenityCategory[]> => {
  return [
    {
      type: "Food & Dining",
      items: [
        "Red Hook Lobster Pound (0.3 mi)",
        "Brooklyn Crab (0.4 mi)",
        "Hometown Bar-B-Que (0.5 mi)",
        "Fairway Market (0.3 mi)",
      ],
    },
    {
      type: "Services",
      items: [
        "IKEA Brooklyn (0.6 mi)",
        "Tesla Service Center (0.4 mi)",
        "Red Hook Post Office (0.2 mi)",
        "Brooklyn Public Library (0.8 mi)",
      ],
    },
    {
      type: "Recreation",
      items: [
        "Red Hook Recreation Area (0.3 mi)",
        "Valentino Pier (0.7 mi)",
        "Brooklyn Bridge Park (1.2 mi)",
        "Red Hook Community Farm (0.5 mi)",
      ],
    },
    {
      type: "Transportation",
      items: [
        "NYC Ferry Stop (0.6 mi)",
        "Smith-9th St Subway (0.4 mi)",
        "B61 Bus Stop (0.2 mi)",
        "Citi Bike Station (0.3 mi)",
      ],
    },
  ];
};
