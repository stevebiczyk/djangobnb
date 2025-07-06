import Link from "next/link";
import Image from "next/image";
import SearchFilters from "./SearchFilter";

const NavBar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/djangobnb.png"
              alt="DjangoBnB Logo"
              width={180}
              height={40}
            />
          </Link>
          <div className="flex space-x-6">
            <SearchFilters />
          </div>
          <div className="flex items-center space-x-6">Add Property</div>
        </div>
      </div>
    </nav>
  );
  //     <nav className="bg-white shadow">
  //       <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
  //         <div className="relative flex items-center justify-between h-16">
  //           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
  //             {/* Mobile menu button*/}
  //           </div>
  //           <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
  //             <div className="flex-shrink-0">
  //               <a href="/" className="text-xl font-bold text-gray-900">DjangoBNB</a>
  //             </div>
  //             <div className="hidden sm:block sm:ml-6">
  //               <div className="flex space-x-4">
  //                 <a href="/" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Home</a>
  //                 <a href="/listings" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Listings</a>
  //                 <a href="/about" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">About</a>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </nav>
  //   );
};

export default NavBar;
