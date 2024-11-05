import { useEffect, useRef, useState } from "react";

const CACHE_KEY = "recent_locations";
const MAX_CACHE_SIZE = 10;

const addToCache = (place) => {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "[]");
    // Only add if it's not already the most recent entry
    if (cached[0] !== place) {
      const newCache = [place, ...cached.filter((p) => p !== place)].slice(
        0,
        MAX_CACHE_SIZE
      );
      localStorage.setItem(CACHE_KEY, JSON.stringify(newCache));
    }
  } catch (error) {
    console.error("Cache error:", error);
  }
};

const getFromCache = () => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "[]");
  } catch (error) {
    console.error("Cache error:", error);
    return [];
  }
};

export default function PlacesAutocomplete({ value, onChange, onError }) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [showRecentLocations, setShowRecentLocations] = useState(false);
  const [recentLocations, setRecentLocations] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef(null);

  // Load recent locations from cache on component mount
  useEffect(() => {
    const cached = getFromCache();
    setRecentLocations(cached);
  }, []);

  useEffect(() => {
    if (!window.google) return;

    // Initialize the autocomplete instance
    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country: "IN" },
        fields: ["formatted_address", "name"],
        types: ["establishment", "geocode"],
      }
    );

    const listener = autocompleteRef.current.addListener(
      "place_changed",
      () => {
        try {
          const place = autocompleteRef.current.getPlace();
          if (!place.formatted_address) {
            throw new Error("Please select a location from the dropdown.");
          }

          addToCache(place.formatted_address);
          setRecentLocations(getFromCache());
          onChange(place.formatted_address);
          setShowRecentLocations(false);
        } catch (error) {
          onError(error.message);
          onChange("");
        }
      }
    );

    return () => {
      if (window.google && listener) {
        window.google.maps.event.removeListener(listener);
      }
    };
  }, [onChange, onError]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Show recent locations if input is empty
    if (!value) {
      const cached = getFromCache();
      setRecentLocations(cached);
      setShowRecentLocations(cached.length > 0);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Use timeoutRef to delay hiding recent locations
    timeoutRef.current = setTimeout(() => {
      setShowRecentLocations(false);
    }, 200);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Show recent locations if input is empty and focused
    if (!newValue && isFocused) {
      const cached = getFromCache();
      setRecentLocations(cached);
      setShowRecentLocations(cached.length > 0);
    } else {
      setShowRecentLocations(false);
    }
  };

  const handleSelectRecent = (location) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    onChange(location);
    addToCache(location);
    setRecentLocations(getFromCache());
    setShowRecentLocations(false);
    inputRef.current.focus();
  };

  return (
    <div className="relative z-60">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ef4665] focus:border-transparent"
        placeholder="Search for your property location"
      />

      {showRecentLocations && recentLocations.length > 0 && (
        <div
          className="fixed  w-[calc(100%-2rem)] max-w-md bg-white border rounded-md shadow-lg mt-1"
          style={{
            top: "auto",
            left: "50%",
            transform: "translateX(-50%)",
            maxHeight: "300px",
          }}
        >
          <div className="p-2 text-sm text-gray-500 border-b">
            Recent Locations
          </div>
          <ul className="max-h-60 overflow-auto">
            {recentLocations.map((location, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => handleSelectRecent(location)}
              >
                {location}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
