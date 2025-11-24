import { AutoCompleteCompounds } from '@inz-ui/ui';
import { useState } from 'react';

const dummyOptions = ['Option 1', 'Option 2', 'Option 3'];

const highlightText = (text: string, search: string) => {
  if (!search.trim()) return text;

  // 공백 제거한 검색어로 정규식 만들기
  // "opt 1" → "o\s*p\s*t\s*1" (각 글자 사이에 공백 허용)
  const searchChars = search.split(' ').join('').split('');
  const pattern = searchChars
    .map((char) => char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('\\s*');

  const regex = new RegExp(`(${pattern})`, 'i');
  const parts = text.split(regex);

  // split(캡처그룹)하면 홀수 인덱스가 매칭된 부분
  return parts.map((part, i) => (
    <span
      key={i}
      className={i % 2 === 1 ? 'bg-yellow-300' : ''}>
      {part}
    </span>
  ));
};

const AutoComplete = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(dummyOptions);
  const [inputValue, setInputValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }

    setInputValue(value);
    setHighlightedIndex(-1);
    setFilteredOptions(
      dummyOptions.filter((option) =>
        option.toLowerCase().split(' ').join('').includes(value.toLowerCase().split(' ').join(''))
      )
    );
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(Math.min(highlightedIndex + 1, filteredOptions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(Math.max(highlightedIndex - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
      case 'Tab':
        // Tab은 기본 동작 유지 (포커스 이동)
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <AutoCompleteCompounds.Container>
      <AutoCompleteCompounds.Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder="Search for an option"
      />
      {filteredOptions.length > 0 && isOpen && (
        <AutoCompleteCompounds.Dropdown>
          {filteredOptions.map((option, index) => (
            <AutoCompleteCompounds.Option
              key={option}
              option={highlightText(option, inputValue)}
              onClick={() => handleOptionClick(option)}
              isHighlighted={index === highlightedIndex}
              onMouseEnter={() => setHighlightedIndex(index)}
            />
          ))}
        </AutoCompleteCompounds.Dropdown>
      )}
    </AutoCompleteCompounds.Container>
  );
};

export default AutoComplete;
