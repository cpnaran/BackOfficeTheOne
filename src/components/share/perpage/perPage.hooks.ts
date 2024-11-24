import { useState } from "react";

export const usePerPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDropdown = (toggle: boolean) => {
    setIsOpen(toggle);
  };

  return { toggleDropdown, isOpen };
};
