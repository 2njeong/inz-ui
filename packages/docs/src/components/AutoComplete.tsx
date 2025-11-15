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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }

    setInputValue(value);
    setFilteredOptions(
      dummyOptions.filter((option) =>
        option.toLowerCase().split(' ').join('').includes(value.toLowerCase().split(' ').join(''))
      )
    );
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
  };

  return (
    <AutoCompleteCompounds.Container>
      <AutoCompleteCompounds.Input
        value={inputValue}
        onChange={handleInputChange}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />
      {filteredOptions.length > 0 && isOpen && (
        <AutoCompleteCompounds.Dropdown>
          {filteredOptions.map((option) => (
            <AutoCompleteCompounds.Option
              key={option}
              option={highlightText(option, inputValue)}
              onClick={() => handleOptionClick(option)}
            />
          ))}
        </AutoCompleteCompounds.Dropdown>
      )}
    </AutoCompleteCompounds.Container>
  );
};

export default AutoComplete;
