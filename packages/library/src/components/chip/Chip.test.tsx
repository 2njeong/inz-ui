import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Chip from './Chip';

describe('Chip', () => {
  describe('Select Chip', () => {
    it('기본 select chip이 올바르게 렌더링된다', () => {
      render(
        <Chip
          id="1"
          type="select"
          label="옵션A"
        />
      );
      expect(screen.getByText('옵션A')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('selected prop에 따라 스타일이 변경된다', () => {
      const { rerender } = render(
        <Chip
          id="1"
          type="select"
          label="옵션A"
          selected={false}
        />
      );
      expect(screen.getByRole('button').className).not.toMatch(/bg-inz-primary-50/);

      rerender(
        <Chip
          id="1"
          type="select"
          label="옵션A"
          selected={true}
        />
      );
      expect(screen.getByRole('button').className).toMatch(/bg-inz-primary-50/);
    });

    it('disabled prop이 적용되면 chip이 비활성화된다', () => {
      render(
        <Chip
          id="1"
          type="select"
          label="비활성"
          disabled
        />
      );
      const chip = screen.getByRole('button');
      expect(chip).toHaveAttribute('aria-disabled', 'true');
      expect(chip.className).toMatch(/cursor-not-allowed/);
    });

    it('onClick 이벤트가 정상 동작한다', () => {
      const handleClick = vi.fn();
      render(
        <Chip
          id="1"
          type="select"
          label="클릭"
          onClick={handleClick}
        />
      );
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Multi-Select Chip', () => {
    it('기본 multi-select chip이 올바르게 렌더링된다', () => {
      render(
        <Chip
          id="2"
          type="multi-select"
          label="옵션B"
        />
      );
      expect(screen.getByText('옵션B')).toBeInTheDocument();
    });

    it('selected 상태일 때 다른 스타일이 적용된다', () => {
      render(
        <Chip
          id="2"
          type="multi-select"
          label="옵션B"
          selected={true}
        />
      );
      const chip = screen.getByRole('button');
      expect(chip.className).toMatch(/border-inz-primary-50/);
      expect(chip.className).toMatch(/text-inz-primary-50/);
      expect(chip.className).not.toMatch(/border-inz-coolgrey-70/);
    });
  });

  describe('Suggestion Chip', () => {
    it('기본 suggestion chip이 올바르게 렌더링된다', () => {
      render(
        <Chip
          id="3"
          type="suggestion"
          label="옵션C"
        />
      );
      expect(screen.getByText('옵션C')).toBeInTheDocument();
    });

    it('icon prop이 적용되면 아이콘이 표시된다', () => {
      render(
        <Chip
          id="3"
          type="suggestion"
          label="옵션C"
          icon={<span data-testid="test-icon">아이콘</span>}
        />
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('selected 상태일 때 배경색이 변경된다', () => {
      render(
        <Chip
          id="3"
          type="suggestion"
          label="옵션C"
          selected={true}
        />
      );
      expect(screen.getByRole('button').className).toMatch(/bg-inz-greyscale-90/);
    });
  });

  describe('Input Chip', () => {
    it('기본 input chip이 올바르게 렌더링된다', () => {
      render(
        <Chip
          id="4"
          type="input"
          label="옵션D"
          isEditing={false}
          onDelete={vi.fn()}
          onEdit={vi.fn()}
          onInputChange={vi.fn()}
        />
      );
      expect(screen.getByText('옵션D')).toBeInTheDocument();
    });

    it('편집 모드일 때 input이 표시된다', () => {
      render(
        <Chip
          id="4"
          type="input"
          label="옵션D"
          isEditing={true}
          onDelete={vi.fn()}
          onEdit={vi.fn()}
          onInputChange={vi.fn()}
        />
      );
      const input = screen.getByDisplayValue('옵션D');
      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe('INPUT');
    });

    it('input 값 변경 시 onInputChange가 호출된다', () => {
      const handleInputChange = vi.fn();
      render(
        <Chip
          id="4"
          type="input"
          label="옵션D"
          isEditing={true}
          onDelete={vi.fn()}
          onEdit={vi.fn()}
          onInputChange={handleInputChange}
        />
      );
      const input = screen.getByDisplayValue('옵션D');
      fireEvent.change(input, { target: { value: '옵션D 수정' } });
      expect(handleInputChange).toHaveBeenCalled();
    });

    it('편집 모드에서 Enter 키 입력 시 onEdit가 호출된다', () => {
      const handleEdit = vi.fn();
      render(
        <Chip
          id="4"
          type="input"
          label="옵션D"
          isEditing={true}
          onDelete={vi.fn()}
          onEdit={handleEdit}
          onInputChange={vi.fn()}
        />
      );
      const input = screen.getByDisplayValue('옵션D');
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(handleEdit).toHaveBeenCalledTimes(1);
    });

    it('편집 모드에서 Escape 키 입력 시 onEdit가 호출된다', () => {
      const handleEdit = vi.fn();
      render(
        <Chip
          id="4"
          type="input"
          label="옵션D"
          isEditing={true}
          onDelete={vi.fn()}
          onEdit={handleEdit}
          onInputChange={vi.fn()}
        />
      );
      const input = screen.getByDisplayValue('옵션D');
      fireEvent.keyDown(input, { key: 'Escape' });
      expect(handleEdit).toHaveBeenCalledTimes(1);
    });

    it('편집 모드에서 blur 이벤트 시 onEdit가 호출된다', () => {
      const handleEdit = vi.fn();
      render(
        <Chip
          id="4"
          type="input"
          label="옵션D"
          isEditing={true}
          onDelete={vi.fn()}
          onEdit={handleEdit}
          onInputChange={vi.fn()}
        />
      );
      const input = screen.getByDisplayValue('옵션D');
      fireEvent.blur(input);
      expect(handleEdit).toHaveBeenCalledTimes(1);
    });
  });

  describe('공통 속성', () => {
    it('size prop에 따라 올바른 크기가 적용된다', () => {
      const { rerender } = render(
        <Chip
          id="1"
          type="select"
          label="작은 칩"
          size="sm"
        />
      );
      expect(screen.getByRole('button').className).toMatch(/body3/);

      rerender(
        <Chip
          id="1"
          type="select"
          label="중간 칩"
          size="md"
        />
      );
      expect(screen.getByRole('button').className).toMatch(/body1/);
    });
  });
});
