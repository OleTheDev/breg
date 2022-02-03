import React, { VFC } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: VFC<Props> = ({ value, onChange }) => {
  return (
    <>
      <div>
        <input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          placeholder="Søk etter firma..."
          className="my-5 max-w-sm rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 dark:bg-gray-800 text-gray-700 placeholder-gray-400 dark:text-white  shadow-sm text-base focus:outline-none focus:ring-2 focus focus:border-transparent z-10"
          autoComplete="off"
        />
      </div>
    </>
  );
};
