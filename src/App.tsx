import './App.css';
import legendCover from './assets/coversHome/legendary.svg';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { useState } from 'react';

import { Search } from 'lucide-react';

export const App = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');
  console.log(minPrice);

  const items = [
    {
      id: 1,
      name: 'SDDDDDDDDDDDDDD Candleflame',
      price: 1000,
      type: 'gun',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 2,
      name: 'Chroma Darkbringer',
      price: 160,
      type: 'knife',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 3,
      name: 'Chroma Lightbringer',
      price: 160,
      type: 'set',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 4,
      name: 'Slasher',
      price: 140,
      type: 'knife',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 5,
      name: 'Slasher',
      price: 140,
      type: 'Ножи',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 6,
      name: 'SDASDASD',
      price: 140,
      type: 'Ножи',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 7,
      name: 'Chroma Candleflame',
      price: 1000,
      type: 'Ножи',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 8,
      name: 'Chroma Darkbringer',
      price: 160,
      type: 'Ножи',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 9,
      name: 'Chroma Lightbringer',
      price: 160,
      type: 'Ножи',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 10,
      name: 'Slasher',
      price: 140,
      type: 'Ножи',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 11,
      name: 'Slasher',
      price: 140,
      type: 'Ножи',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 12,
      name: 'Slasher',
      price: 140,
      type: 'Ножи',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 13,
      name: 'Slasher',
      price: 140,
      type: 'Ножи',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 14,
      name: 'Slasher',
      price: 140,
      type: 'Ножи',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 15,
      name: 'Slasher',
      price: 140,
      type: 'Ножи',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 16,
      name: 'Slasher',
      price: 140,
      type: 'Ножи',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 17,
      name: 'Slasher',
      price: 140,
      type: 'Пистолеты',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 18,
      name: 'Slasher',
      price: 140,
      type: 'Сеты',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 19,
      name: 'Slasher',
      price: 140,
      type: 'Петы',
      image: '/placeholder.svg?height=200&width=200',
    },
  ];

  const filteredItems = items.filter((item) => {
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.type);

    const matchesMinPrice = minPrice === undefined || item.price >= minPrice;
    const matchesMaxPrice = maxPrice === undefined || item.price <= maxPrice;

    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase()); //

    return matchesType && matchesMinPrice && matchesMaxPrice && matchesSearchTerm;
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='game-store'>
      <Header />
      <div className='store-content'>
        <Sidebar
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
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
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className='sort-controls'>
              <button className='sort-button'>
                <span className='sort-icon'>≡</span>
              </button>
              <button className='sort-button active'>
                <span className='sort-icon'>≡</span>
                По стандарту
              </button>
            </div>
          </div>

          <div className='items-grid'>
            {filteredItems.map((item) => (
              <div key={item.id} className='item-card'>
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
          </div>
        </main>
      </div>
    </div>
  );
};
