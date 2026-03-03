import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import CheckBox from './CheckBox';

describe('CheckBox', () => {
  it('기본 체크박스가 올바르게 렌더링된다', () => {
    render(<CheckBox label="동의하기" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('동의하기')).toBeInTheDocument();
  });

  it('checked prop에 따라 체크박스 상태가 변경된다', () => {
    const { rerender } = render(
      <CheckBox
        checked={false}
        label="체크박스"
      />
    );
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(
      <CheckBox
        checked={true}
        label="체크박스"
      />
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('disabled prop이 적용되면 체크박스가 비활성화된다', () => {
    render(
      <CheckBox
        disabled
        label="비활성"
      />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    expect(checkbox.className).toMatch(/disabled:/);
  });

  it('onChange 이벤트가 정상 동작한다', () => {
    const handleChange = vi.fn();
    render(
      <CheckBox
        onChange={handleChange}
        label="클릭"
      />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('size prop에 따라 올바른 크기가 적용된다', () => {
    const { rerender } = render(
      <CheckBox
        size="sm"
        label="작은 체크박스"
      />
    );
    expect(screen.getByRole('checkbox').className).toMatch(/w-5 h-5/);

    rerender(
      <CheckBox
        size="md"
        label="중간 체크박스"
      />
    );
    expect(screen.getByRole('checkbox').className).toMatch(/w-6 h-6/);
  });

  it('className prop이 병합되어 적용된다', () => {
    render(
      <CheckBox
        className="custom-class"
        label="클래스"
      />
    );
    expect(screen.getByRole('checkbox')).toHaveClass('custom-class');
  });

  it('required prop이 적용되면 필수 입력 표시가 나타난다', () => {
    render(
      <CheckBox
        required
        label="필수 체크"
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('label이 없는 경우에도 정상 렌더링된다', () => {
    render(<CheckBox aria-label="라벨 없는 체크박스" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});
