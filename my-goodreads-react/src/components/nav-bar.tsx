import { useState } from "react";

export function navigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [activateItem, setActiveItem] = useState("Home");

  const toggleMenu = () => {
    setIsMenuOpen((isOpen) => !isOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen((isOpen) => !isOpen);
  };

  const handleNavigation = (item: string) => {
    setActiveItem(item);
    setIsMenuOpen(false);
  };

  return {
    activateItem,
    handleNavigation,
    isMenuOpen,
    isSearchOpen,
    searchValue,
    setSearchValue,
    toggleMenu,
    toggleSearch,
  };
}