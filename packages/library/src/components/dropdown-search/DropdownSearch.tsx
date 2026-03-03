import DropdownSearchCompounds from "@ui/components/dropdown-search/DropdownSearchCompounds";
import Label from "@ui/components/texts/Label";
import React, { useState } from "react";
import { FieldValues, Path, UseFormClearErrors } from "react-hook-form";

/**
 * 드롭다운 검색 컴포넌트
 *
 * 검색 기능이 있는 드롭다운 컴포넌트입니다. react-hook-form과 함께 사용할 수 있습니다.
 *
 * @param options - 드롭다운 검색 옵션 배열 (필수)
 * @param displayValue - 표시될 값 (필수)
 * @param onChange - 값 변경 시 실행할 콜백 함수 (필수)
 * @param labelText - 라벨에 표시될 텍스트
 * @param ShowAsterisk - 필수 표시 여부
 * @param outerInputPlaceholder - 외부 입력 필드 placeholder
 * @param innerInputPlaceholder - 내부 검색 입력 필드 placeholder
 * @param error - 에러 메시지 (react-hook-form과 함께 사용 시)
 * @param clearErrors - 에러 클리어 함수 (react-hook-form과 함께 사용 시)
 * @param isInvalid - 유효성 검사 실패 여부 (기본값: `false`)
 * @param dropdownClassName - 드롭다운에 적용할 CSS 클래스명
 *
 * @example
 * ```tsx
 * // useState로 상태 관리(react-hook-form 사용 X)
 * const [countryCode, setCountryCode] = useState('');
 * <DropdownSearch
 *   options={localeOptions}
 *   displayValue={countryCode}
 *   onChange={(value) => setCountryCode(value)}
 *   innerInputPlaceholder="국가명으로 검색"
 * />
 *
 * // react-hook-form과 함께 사용
 * import { Controller, useFormContext } from 'react-hook-form';
 * const { control, formState: { errors }, clearErrors } = useFormContext();
 * <Controller
 *   name="countryCode"
 *   control={control}
 *   render={({ field }) => (
 *     <DropdownSearch
 *       options={localeOptions}
 *       displayValue={localeOptions.find(opt => opt.value === field.value)?.name || ''}
 *       onChange={field.onChange}
 *       error={errors.countryCode?.message}
 *       clearErrors={clearErrors}
 *       innerInputPlaceholder="국가명으로 검색"
 *     />
 *   )}
 * />
 * ```
 */

interface Option {
  /**
   * 옵션의 고유 식별자
   */
  id: number | string;
  /**
   * 옵션에 표시될 텍스트
   */
  name: string;
  /**
   * 옵션의 값
   */
  value: string;
}

type DropdownSearchProps<T extends FieldValues = FieldValues> = {
  /**
   * 라벨에 표시될 텍스트
   */
  labelText?: string;
  /**
   * 필수 표시 여부
   */
  ShowAsterisk?: boolean;
  /**
   * 외부 입력 필드 placeholder
   */
  outerInputPlaceholder?: string;
  /**
   * 내부 검색 입력 필드 placeholder
   */
  innerInputPlaceholder?: string;
  /**
   * 드롭다운 검색 옵션 배열 (필수)
   */
  options: Option[];
  /**
   * 표시될 값 (필수)
   */
  displayValue: string;
  /**
   * 값 변경 시 실행할 콜백 함수 (필수)
   */
  onChange: (rawValue: string) => void;
  /**
   * 에러 메시지 (react-hook-form과 함께 사용 시)
   */
  error?: string;
  /**
   * 에러 클리어 함수 (react-hook-form과 함께 사용 시)
   */
  clearErrors?: UseFormClearErrors<T> | (() => void);
  /**
   * 유효성 검사 실패 여부
   * @default false
   */
  isInvalid?: boolean;
  /**
   * 드롭다운에 적용할 CSS 클래스명
   */
  dropdownClassName?: string;
};

const DropdownSearch = <T extends FieldValues = FieldValues>({
  labelText,
  ShowAsterisk,
  outerInputPlaceholder,
  innerInputPlaceholder,
  options,
  displayValue,
  onChange,
  error,
  clearErrors,
  isInvalid,
  dropdownClassName,
}: DropdownSearchProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const filteredOptions = options.filter(
    (opt) =>
      opt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opt.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionSelect = (option: Option) => {
    onChange(option.value);
    setActiveIndex(-1);
    setIsOpen(false);
  };

  // 키보드 내비게이션
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((idx) => (idx + 1) % filteredOptions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((idx) =>
          idx <= 0 ? filteredOptions.length - 1 : idx - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
          const opt = filteredOptions[activeIndex];
          onChange(opt.value);
          clearErrors?.("" as unknown as Path<T>);
        }
        closeDropdown();
        break;
      case "Escape":
        e.stopPropagation();
        closeDropdown();
        break;
      case "Tab":
        e.preventDefault();
        closeDropdown();
        break;
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setActiveIndex(-1);
    setSearchTerm("");
  };

  return (
    <Label
      labelText={labelText}
      alignMode="vertical"
      showAsterisk={ShowAsterisk}
    >
      <DropdownSearchCompounds.Root
        onFocus={() => {
          setIsOpen(true);
          clearErrors?.("locale" as unknown as Path<T>);
        }}
        onBlurCapture={(e) => {
          const next = e.relatedTarget as HTMLElement | null;
          if (!next || !e.currentTarget.contains(next)) {
            closeDropdown();
          }
        }}
      >
        <DropdownSearchCompounds.Input
          isDropdownOpen={isOpen}
          placeholder={outerInputPlaceholder}
          readOnly
          value={displayValue}
          isInvalid={isInvalid}
          error={error}
          onClick={() => {
            setIsOpen(true);
          }}
          onIconClick={(e: React.MouseEvent<HTMLSpanElement>) => {
            e.preventDefault();
            setIsOpen(!isOpen);
            clearErrors?.("locale" as unknown as Path<T>);
          }}
        />

        <DropdownSearchCompounds.Dropdown
          className={dropdownClassName}
          isOpen={isOpen}
        >
          <DropdownSearchCompounds.SearchInput
            value={searchTerm}
            placeholder={innerInputPlaceholder}
            autoFocus
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              clearErrors?.("" as unknown as Path<T>);
            }}
            onClear={() => {
              onChange("");
              setSearchTerm("");
              setIsOpen(true);
              clearErrors?.("" as unknown as Path<T>);
            }}
            onSearch={() => {
              setIsOpen(false);
            }}
            onFocus={() => {
              setIsOpen(true);
            }}
          />
          <DropdownSearchCompounds.Details>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, idx) => (
                <DropdownSearchCompounds.Option
                  key={opt.id}
                  isActive={idx === activeIndex}
                  onMouseEnter={() => {
                    setActiveIndex(idx);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleOptionSelect(opt);
                  }}
                >
                  {opt.name} ({opt.value})
                </DropdownSearchCompounds.Option>
              ))
            ) : (
              <DropdownSearchCompounds.Empty>
                <p>검색 결과가 없습니다.</p>
              </DropdownSearchCompounds.Empty>
            )}
          </DropdownSearchCompounds.Details>
        </DropdownSearchCompounds.Dropdown>
      </DropdownSearchCompounds.Root>
    </Label>
  );
};

export default DropdownSearch;
