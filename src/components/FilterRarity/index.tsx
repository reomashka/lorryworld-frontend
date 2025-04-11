'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import './FilterRarity.css';

type RarityOption = {
  id: string;
  name: string;
  colorClass: string;
};

export function FilterRarity() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const rarityOptions: RarityOption[] = [
    { id: 'chroma', name: 'Chroma', colorClass: 'color-chroma' },
    { id: 'ancients', name: 'Ancients', colorClass: 'color-ancients' },
    { id: 'godly', name: 'Godly', colorClass: 'color-godly' },
    { id: 'vintages', name: 'Vintages', colorClass: 'color-vintages' },
    { id: 'corrupt', name: 'Corrupt', colorClass: 'color-corrupt' },
  ];

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getButtonText = () => {
    if (selectedOptions.length === 0) return 'Показать все';
    if (selectedOptions.length === rarityOptions.length) return 'Выбраны все';
    return `Выбрано: ${selectedOptions.length}`;
  };

  return (
    <div className='filter-section'>
      <div className='rarity-filter__container'>
        <h3 className='rarity-filter__title'>Редкость</h3>

        <button onClick={() => setIsOpen(!isOpen)} className='rarity-filter__toggle-button'>
          <span>{getButtonText()}</span>
          <ChevronRight
            className={`rarity-filter__chevron ${isOpen ? 'rarity-filter__chevron--open' : ''}`}
          />
        </button>

        {isOpen && (
          <div className='rarity-filter__dropdown'>
            {rarityOptions.map((option) => {
              const isSelected = selectedOptions.includes(option.id);
              return (
                <div
                  key={option.id}
                  className={`rarity-filter__option ${
                    isSelected ? 'rarity-filter__option--selected' : ''
                  }`}
                  onClick={() => toggleOption(option.id)}
                >
                  <div className={`rarity-filter__color-indicator ${option.colorClass}`}></div>
                  <span className='rarity-filter__option-name'>{option.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
