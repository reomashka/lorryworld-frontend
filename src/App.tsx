import './App.css';
import legendCover from './assets/coversHome/legendary.svg';
import sort from './assets/svg/sort.svg';
import sortStandart from './assets/svg/sortStandart.svg';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ItemModal } from './components/modals/ItemModal';
import { useMemo, useState } from 'react';

import { Search } from 'lucide-react';

import { items } from './mocks/items';

interface FilterState {
  selectedTypes: string[];
  minPrice: number | 0;
  maxPrice: number | 0;
  searchTerm: string;
}

interface Item {
  id: number;
  name: string;
  price: number;
  type: string;
  image: string;
}

export const App = () => {
  const [filters, setFilters] = useState<FilterState>({
    selectedTypes: ['Ножи', 'Пистолеты', 'Сеты', 'Петы'],
    minPrice: 0,
    maxPrice: 0,
    searchTerm: '',
  });
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesType = filters.selectedTypes.includes(item.type);
      const matchesMinPrice = filters.minPrice === 0 || item.price >= filters.minPrice;
      const matchesMaxPrice = filters.maxPrice === 0 || item.price <= filters.maxPrice;
      const matchesSearchTerm = item.name.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesType && matchesMinPrice && matchesMaxPrice && matchesSearchTerm;
    });
  }, [filters]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchTerm: event.target.value }));
  };

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='game-store'>
      <Header />
      <div className='store-content'>
        <Sidebar
          selectedTypes={filters.selectedTypes}
          setSelectedTypes={(types) => updateFilters({ selectedTypes: types })}
          minPrice={filters.minPrice}
          setMinPrice={(price) => updateFilters({ minPrice: price })}
          maxPrice={filters.maxPrice}
          setMaxPrice={(price) => updateFilters({ maxPrice: price })}
        />

        <main className='items-display'>
          <div className='search-bar'>
            <div className='search-input'>
              <span className='search-icon'>
                <Search />
              </span>
              <input
                type='text'
                placeholder='Поиск...'
                value={filters.searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className='sort-controls'>
              <button className='sort-button'>
                <span className='sort-icon'>
                  <img src={sort} alt='' width={27} />
                </span>
              </button>
              <button className='sort-button-standart active'>
                <span className='sort-icon'>
                  <img src={sortStandart} alt='' />
                </span>
                По стандарту
              </button>
            </div>
          </div>

          <div className='items-grid'>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className='item-card'
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedItem(item);
                }}
              >
                <div className='item-image'>
                  {/* <img src={chroma} alt={item.name} /> */}

                  <img src={legendCover} alt={item.name} />
                </div>
                <div className='item-info'>
                  <div className='item-name'>{item.name}</div>
                  <div className='item-price'>{item.price} ₽</div>
                </div>
              </div>
            ))}
            {selectedItem && (
              <ItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                item={selectedItem}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
