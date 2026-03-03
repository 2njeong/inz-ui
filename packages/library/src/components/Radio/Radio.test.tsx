import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Radio from './Radio';

describe('Radio', () => {
  it('라디오 버튼이 올바르게 렌더링된다.', () => {
    render(<Radio label="라디오" />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(screen.getByText('라디오')).toBeInTheDocument();
  });

  it('라디오 props에 따라 라디오 버튼 상태가 변경된다.', () => {
    const { rerender } = render(
      <Radio
        label="라디오"
        checked={false}
      />
    );
    expect(screen.getByRole('radio')).not.toBeChecked();

    rerender(
      <Radio
        label="라디오"
        checked={true}
      />
    );
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('disabled prop이 적용되면 라디오 버튼이 비활성화된다.', () => {
    render(
      <Radio
        label="비활성"
        disabled
      />
    );
    const radio = screen.getByRole('radio');
    expect(radio).toBeDisabled();
    expect(radio.className).toMatch(/disabled:/);
  });

  it('onChange 이벤트가 정상 동작한다.', () => {
    const handleChange = vi.fn();
    render(
      <Radio
        label="클릭"
        onChange={handleChange}
      />
    );
    fireEvent.click(screen.getByRole('radio'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('size prop에 따라 올바른 크기가 적용된다.', () => {
    const { rerender } = render(
      <Radio
        label="작은 라디오"
        size="sm"
      />
    );
    expect(screen.getByRole('radio').className).toMatch(/w-5 h-5/);

    rerender(
      <Radio
        label="큰 라디오"
        size="md"
      />
    );
    expect(screen.getByRole('radio').className).toMatch(/w-6 h-6/);
  });

  it('className prop이 병합되어 적용된다.', () => {
    render(
      <Radio
        label="클래스"
        className="custom-class"
      />
    );
    expect(screen.getByRole('radio')).toHaveClass('custom-class');
  });

  it('required prop이 적용되면 필수 입력 표시가 나타난다.', () => {
    render(
      <Radio
        label="필수 라디오"
        required
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('label이 없는 경우에도 정상 렌더링된다.', () => {
    render(<Radio aria-label="라벨 없는 라디오" />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });
});
