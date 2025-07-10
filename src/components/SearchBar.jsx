'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = ({ placeholder = "Search for services...", onSearch, compact = false }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  const popularServices = [
    'House Cleaning', 'Plumbing', 'Electrical Work', 'Landscaping',
    'Home Repair', 'Painting', 'Moving Services', 'Pet Care',
    'Tutoring', 'Personal Training', 'Photography', 'Catering'
  ];

  const recentSearches = [
    'Plumber near me', 'House cleaning service', 'Electrician',
    'Landscaping service', 'Home renovation'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value) => {
    setQuery(value);
    
    if (value.length > 2) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const filteredServices = popularServices.filter(service =>
          service.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredServices.slice(0, 5));
        setShowSuggestions(true);
        setIsLoading(false);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  };

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery, location);
      } else {
        router.push(`/services?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`);
      }
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          setLocation('Current Location');
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocation('Location not available');
          setIsLoading(false);
        }
      );
    } else {
      setLocation('Geolocation not supported');
      setIsLoading(false);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className={`flex flex-col ${compact ? 'md:flex-row' : 'lg:flex-row'} gap-2`}>
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => setShowSuggestions(query.length > 2)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={placeholder}
              className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
            {isLoading && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500"></div>
              </div>
            )}
          </div>
        </div>

        {/* Location Input */}
        <div className="relative flex-1 lg:max-w-xs">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter location"
              className="w-full pl-10 pr-10 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
            <button
              onClick={getCurrentLocation}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-primary-500 transition-colors duration-200"
              title="Use current location"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={() => handleSearch()}
          disabled={!query.trim()}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
        >
          Search
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {suggestions.length > 0 ? (
            <>
              <div className="px-4 py-2 text-sm font-medium text-neutral-500 border-b border-neutral-100">
                Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-2 hover:bg-neutral-50 transition-colors duration-150 flex items-center"
                >
                  <svg className="h-4 w-4 text-neutral-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {suggestion}
                </button>
              ))}
            </>
          ) : (
            <>
              {recentSearches.length > 0 && (
                <>
                  <div className="px-4 py-2 text-sm font-medium text-neutral-500 border-b border-neutral-100">
                    Recent Searches
                  </div>
                  {recentSearches.slice(0, 3).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-50 transition-colors duration-150 flex items-center"
                    >
                      <svg className="h-4 w-4 text-neutral-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {search}
                    </button>
                  ))}
                </>
              )}
              
              <div className="px-4 py-2 text-sm font-medium text-neutral-500 border-b border-neutral-100 mt-2">
                Popular Services
              </div>
              {popularServices.slice(0, 5).map((service, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(service)}
                  className="w-full text-left px-4 py-2 hover:bg-neutral-50 transition-colors duration-150 flex items-center"
                >
                  <svg className="h-4 w-4 text-neutral-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {service}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
