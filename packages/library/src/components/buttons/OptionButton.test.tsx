import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { OptionButton } from './OptionButton';

describe('OptionButton', () => {
  it('children이 올바르게 렌더링된다', () => {
    render(<OptionButton>클릭하세요</OptionButton>);
    expect(screen.getByRole('button')).toHaveTextContent('클릭하세요');
  });

  it('variant prop에 따라 올바른 클래스가 적용된다', () => {
    const { rerender } = render(<OptionButton variant="edit">edit</OptionButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-inz-greyscale-100');
    rerender(<OptionButton variant="cancel">cancel</OptionButton>);
    expect(screen.getByRole('button')).toHaveClass('text-inz-status-danger');
    rerender(<OptionButton variant="copy">copy</OptionButton>);
    expect(screen.getByRole('button')).toHaveClass('text-inz-greyscale-30');
    rerender(<OptionButton variant="dark">dark</OptionButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-inz-coolgrey-30');
  });

  it('disabled prop이 적용되면 버튼이 비활성화된다', () => {
    render(<OptionButton disabled>비활성</OptionButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:bg-inz-disable-fill');
  });

  it('onClick 이벤트가 정상 동작한다', () => {
    const handleClick = vi.fn();
    render(<OptionButton onClick={handleClick}>클릭</OptionButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('className prop이 병합되어 적용된다', () => {
    render(<OptionButton className="custom-class">클래스</OptionButton>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('추가적인 props가 정상적으로 전달된다', () => {
    render(<OptionButton aria-label="옵션">옵션</OptionButton>);
    expect(screen.getByLabelText('옵션')).toBeInTheDocument();
  });

  it('children이 없을 때도 정상 렌더링된다', () => {
    render(<OptionButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
