import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DetailButton } from './DetailButton';

describe('DetailButton', () => {
  it('children이 올바르게 렌더링된다', () => {
    render(<DetailButton>상세보기</DetailButton>);
    expect(screen.getByRole('button')).toHaveTextContent('상세보기');
  });

  it('variant와 size prop에 따라 올바른 클래스가 적용된다', () => {
    const { rerender } = render(
      <DetailButton
        variant="primary"
        size="md">
        primary
      </DetailButton>
    );
    expect(screen.getByRole('button').className).toMatch(/text-inz-primary-50/);
    expect(screen.getByRole('button').className).toMatch(/h-5/);

    rerender(
      <DetailButton
        variant="secondary"
        size="sm">
        secondary
      </DetailButton>
    );
    expect(screen.getByRole('button').className).toMatch(/text-inz-coolgrey-40/);
    expect(screen.getByRole('button').className).toMatch(/h-4/);
  });

  it('disabled prop이 적용되면 버튼이 비활성화된다', () => {
    render(<DetailButton disabled>비활성</DetailButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.className).toMatch(/disabled:text-inz-disable-fill/);
  });

  it('onClick 이벤트가 정상 동작한다', () => {
    const handleClick = vi.fn();
    render(<DetailButton onClick={handleClick}>클릭</DetailButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('className prop이 병합되어 적용된다', () => {
    render(<DetailButton className="custom-class">클래스</DetailButton>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('추가적인 props가 정상적으로 전달된다', () => {
    render(<DetailButton aria-label="상세">상세</DetailButton>);
    expect(screen.getByLabelText('상세')).toBeInTheDocument();
  });

  it('children이 없을 때도 정상 렌더링된다', () => {
    render(<DetailButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
