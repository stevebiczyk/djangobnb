import Image from "next/image";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";

const PropertyDetailPage = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
        <Image
          fill
          src="/beach_1.jpg"
          className="object-cover w-full h-full"
          alt="Beach house"
        />
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <span className="mb-6 block text-lg text-gray-600">
            4 guests - 2 bedrooms - 1 bathroom
          </span>
          <hr />
          <div className="py-6 flex items-center space-x-4">
            <Image
              src="/profile_pic_1.jpg"
              alt="Profile Picture"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p>
              <strong>John Doe</strong> is your host
            </p>
          </div>
          <hr />
          <p className="mt-6 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            aliquam quo ea magnam voluptatum nemo illo soluta nam, harum fuga
            quam exercitationem eius repudiandae reprehenderit perspiciatis
            labore molestias. A, necessitatibus!
          </p>
        </div>
        <ReservationSidebar />
      </div>
    </main>
  );
};
export default PropertyDetailPage;
