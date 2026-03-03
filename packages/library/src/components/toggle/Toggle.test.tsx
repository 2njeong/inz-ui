import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Toggle from './Toggle';

describe('Toggle', () => {
  it('토글 버튼이 올바르게 렌더링된다.', () => {
    render(<Toggle />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('라벨이 있는 경우 올바르게 렌더링된다.', () => {
    render(<Toggle label="토글" />);
    expect(screen.getByText('토글')).toBeInTheDocument();
  });

  it('checked prop에 따라 토글 상태가 변경된다.', () => {
    const { rerender } = render(<Toggle checked={false} />);
    expect(screen.getByRole('switch')).not.toBeChecked();

    rerender(<Toggle checked={true} />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('disabled prop이 적용되면 토글 버튼이 비활성화된다.', () => {
    render(<Toggle disabled />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeDisabled();
    expect(toggle.className).toMatch(/disabled:/);
  });

  it('onChange 이벤트가 정상 동작한다.', () => {
    const handleChange = vi.fn();
    render(<Toggle onChange={handleChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('className prop이 병합되어 적용된다.', () => {
    render(<Toggle className="custom-class" />);
    const toggleBackground = screen.getByRole('switch').nextElementSibling;
    expect(toggleBackground).toHaveClass('custom-class');
  });

  it('required prop이 적용되면 필수 입력 표시가 나타난다.', () => {
    render(
      <Toggle
        label="필수 토글"
        required
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('라벨이 없는 경우에도 정상 렌더링된다.', () => {
    render(<Toggle aria-label="라벨 없는 토글" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('토글 버튼을 클릭하면 상태가 토글된다.', () => {
    const handleChange = vi.fn();
    render(<Toggle onChange={handleChange} />);

    const toggle = screen.getByRole('switch');
    expect(toggle).not.toBeChecked();

    fireEvent.click(toggle);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          checked: true,
        }) as HTMLInputElement,
      })
    );
  });
});
