import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import NumberPicker from './NumberPicker';

describe('NumberPicker', () => {
  const mockOnIncrement = vi.fn();
  const mockOnDecrement = vi.fn();

  beforeEach(() => {
    // 각 테스트 전에 mock 함수들을 초기화합니다.
    mockOnIncrement.mockClear();
    mockOnDecrement.mockClear();
  });

  it('renders with initial value', () => {
    render(
      <NumberPicker
        value={0}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
      />
    );
    expect(screen.getByDisplayValue('0')).toBeInTheDocument();
    expect(screen.getByLabelText('증가')).toBeInTheDocument();
    expect(screen.getByLabelText('감소')).toBeInTheDocument();
  });

  it('calls onIncrement when plus button is clicked', () => {
    render(
      <NumberPicker
        value={0}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
      />
    );
    fireEvent.click(screen.getByLabelText('증가'));
    expect(mockOnIncrement).toHaveBeenCalledTimes(1);
  });

  it('calls onDecrement when minus button is clicked', () => {
    render(
      <NumberPicker
        value={1}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
      />
    );
    fireEvent.click(screen.getByLabelText('감소'));
    expect(mockOnDecrement).toHaveBeenCalledTimes(1);
  });

  it('plus button is disabled when value reaches maxValue', () => {
    render(
      <NumberPicker
        value={5}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
        maxValue={5}
      />
    );
    expect(screen.getByLabelText('증가')).toBeDisabled();
  });

  it('plus button is enabled when value is less than maxValue', () => {
    render(
      <NumberPicker
        value={4}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
        maxValue={5}
      />
    );
    expect(screen.getByLabelText('증가')).not.toBeDisabled();
  });

  it('minus button is disabled when value reaches minValue', () => {
    render(
      <NumberPicker
        value={0}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
        minValue={0}
      />
    );
    expect(screen.getByLabelText('감소')).toBeDisabled();
  });

  it('minus button is disabled when value is 0 (no minValue provided)', () => {
    render(
      <NumberPicker
        value={0}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
      />
    );
    expect(screen.getByLabelText('감소')).toBeDisabled();
  });

  it('minus button is disabled when value equals minValue greater than 0', () => {
    render(
      <NumberPicker
        value={2}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
        minValue={2}
      />
    );
    expect(screen.getByLabelText('감소')).toBeDisabled();
  });

  it('minus button is enabled when value is greater than minValue', () => {
    render(
      <NumberPicker
        value={1}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
        minValue={0}
      />
    );
    expect(screen.getByLabelText('감소')).not.toBeDisabled();
  });

  it('minus button is enabled when value is greater than 0 (no minValue provided)', () => {
    render(
      <NumberPicker
        value={3}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
      />
    );
    expect(screen.getByLabelText('감소')).not.toBeDisabled();
  });
});
