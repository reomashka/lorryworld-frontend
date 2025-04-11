// import character from '../../assets/charachter.svg';
import { FilterRarity } from '../FilterRarity';

interface SidebarProps {
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  minPrice: number | undefined;
  setMinPrice: (value: number) => void;
  maxPrice: number | undefined;
  setMaxPrice: (value: number) => void;
}

export const Sidebar = ({
  selectedTypes,
  setSelectedTypes,
  minPrice,
  setMinPrice,
}: // maxPrice,
// setMaxPrice,
SidebarProps) => {
  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <aside className='filters'>
      <div className='filter-section'>
        <h3>Цена</h3>
        <div className='price-inputs'>
          <div className='price-input'>
            <span className='currency-symbol'>₽</span>
            <input
              type='text'
              value={minPrice ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                // Разрешаем только цифры и точку
                if (/^\d*\.?\d*$/.test(value)) {
                  setMinPrice(Number(value));
                }
              }}
              placeholder='Минимальная цена'
            />
          </div>
          {/* <div className='price-input'>
            <span className='currency-symbol'>₽</span>
            <input
              type='text'
              placeholder='0.00'
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div> */}
        </div>
      </div>

      <div className='filter-section'>
        <h3>Тип</h3>
        <div className='type-checkboxes'>
          <label className='checkbox-label'>
            <input
              type='checkbox'
              checked={selectedTypes.includes('Ножи')}
              onChange={() => toggleType('Ножи')}
            />
            <span className='custom-checkbox'></span>
            Ножи
          </label>
          <label className='checkbox-label'>
            <input
              type='checkbox'
              checked={selectedTypes.includes('Пистолеты')}
              onChange={() => toggleType('Пистолеты')}
            />
            <span className='custom-checkbox'></span>
            Пистолеты
          </label>
          <label className='checkbox-label'>
            <input
              type='checkbox'
              checked={selectedTypes.includes('Сеты')}
              onChange={() => toggleType('Сеты')}
            />
            <span className='custom-checkbox'></span>
            Сеты
          </label>
          <label className='checkbox-label'>
            <input
              type='checkbox'
              checked={selectedTypes.includes('Петы')}
              onChange={() => toggleType('Петы')}
            />
            <span className='custom-checkbox'></span>
            Петы
          </label>
        </div>
      </div>

      <div>
        <FilterRarity />
      </div>

      {/* <div className='character-display'>
        <img src={character} alt='Game character' className='character-image' />
      </div> */}
    </aside>
  );
};
