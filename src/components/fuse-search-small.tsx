'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import searchEn from '@/components/utils/search.en.json';
import searchEs from '@/components/utils/search.es.json';
// Static search data for client-side search
const staticSearchData = [...searchEn, ...searchEs];

interface SearchDocument {
  id: string;
  title: string;
  content: string;
  url: string;
  description?: string;
}

interface SearchResult {
  type: 'page';
  id: string;
  url: string;
  title: string;
  content: string;
}

// Client-side search hook using Fuse.js
export function useFuseSearch() {
    const fuse = useMemo(() => {
      // Create Fuse instance with static data
      return new Fuse(staticSearchData, {
        keys: [
          { name: 'title', weight: 0.8 },
          { name: 'content', weight: 0.6 },
          { name: 'description', weight: 0.4 },
        ],
        threshold: 0.3,
        distance: 100,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
      });
    }, []);
  
    const search = useCallback((query: string): SearchResult[] => {
      if (!query || query.trim().length < 2) {
        return [];
      }
  
      const results = fuse.search(query);
      
      return results.slice(0, 10).map((result) => {
        const item = result.item as SearchDocument;
        return {
          type: 'page' as const,
          id: item.id,
          url: item.url,
          title: item.title,
          content: item.content || item.description || '',
        };
      });
    }, [fuse]);
  
    return { search };
  }

// Search modal component
export function FuseSearchModalSmall() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { search } = useFuseSearch();

  // Perform search when query changes
  useEffect(() => {
    const searchResults = search(query);
    setResults(searchResults);
    setSelectedIndex(0);
  }, [query, search]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle modal keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        setQuery('');
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (results[selectedIndex]) {
          handleSelectResult(results[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelectResult = (result: SearchResult): void => {
    router.push(result.url);
    setIsOpen(false);
    setQuery('');
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-9 h-9 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        aria-label="Open Search"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-800"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col z-50">
      <div className="flex-1 flex items-start justify-center pt-20">
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-4xl mx-4 max-h-[80vh] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200/60">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search documentation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                autoFocus
              />
              <button
                onClick={handleClose}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 border border-gray-300 rounded">
                  ESC
                </kbd>
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelectResult(result)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                      index === selectedIndex ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="font-medium text-gray-900">{result.title}</div>
                    {result.content && (
                      <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {result.content}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : query.length >= 2 ? (
              <div className="p-8 text-center text-gray-500">
                No results found for "{query}"
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                Type to search documentation...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
