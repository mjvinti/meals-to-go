import { createContext, useEffect, useState } from "react";

import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("San Francisco");
  const [location, setLocation] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);

    if (!searchKeyword || !searchKeyword.length) {
      return;
    }

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
