import { createContext, useEffect, useState } from "react";

import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("san francisco");
  const [location, setLocation] = useState(null);

  const onSearch = (searchKeyword = "Antwerp") => {
    setIsLoading(true);
    setKeyword(searchKeyword);
    locationRequest(searchKeyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <LocationContext.Provider
      value={{ error, isLoading, keyword, location, search: onSearch }}
    >
      {children}
    </LocationContext.Provider>
  );
};
