'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Здесь будет логика обращения к API
    console.log('Поиск по запросу:', query);
  };

  return (
    <div className="flex items-center gap-4">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите название книги..."
        className="flex-1"
      />
      <Button onClick={handleSearch}>Найти</Button>
    </div>
  );
};

export default SearchBar;
