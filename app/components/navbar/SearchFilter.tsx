const SearchFilters = () => {
  return (
    <div className="h-[64px] flex flex-row items-center justify-between border rounded-full">
      <div className="flex flex-row items-center justify-between">
        <div className="w-[250px] h-[64px] px8 flex flex-col rounded-full">
          <p className="txt-xs font-semibold">Where</p>
          <p className="text-sm">Wanted Location</p>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
