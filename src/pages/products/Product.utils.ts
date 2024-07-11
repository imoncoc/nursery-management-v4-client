import { debounce } from "lodash";
export const filterItemOptions = [
  { value: 0, label: "Name" },
  { value: 1, label: "Category Name" },
  { value: 2, label: "Price" },
  { value: 3, label: "Rating" },
];

export const debouncedSearch = debounce(
  (searchTerm: any, searchFunction: any) => {
    searchFunction(searchTerm);
  },
  1000
);
