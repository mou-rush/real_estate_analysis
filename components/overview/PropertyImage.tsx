import Image from "next/image";

type PropertyImageProps = {
  src: string;
  alt: string;
};

export const PropertyImage = ({ src, alt }: PropertyImageProps) => {
  return (
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        width={400}
        height={300}
        className="w-full h-auto rounded-lg object-cover"
      />
      <div className="text-center mt-2 text-sm text-gray-600">
        Click for Google Street View
      </div>
    </div>
  );
};
