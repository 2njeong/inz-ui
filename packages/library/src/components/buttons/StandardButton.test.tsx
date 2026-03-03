import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { StandardButton } from './StandardButton';

describe('StandardButton', () => {
  it('children이 올바르게 렌더링된다', () => {
    render(<StandardButton>클릭하세요</StandardButton>);
    expect(screen.getByRole('button')).toHaveTextContent('클릭하세요');
  });

  it('variant와 size 클래스가 올바르게 적용된다', () => {
    render(
      <StandardButton
        variant="secondary"
        size="lg">
        세컨더리
      </StandardButton>
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/border-inz-primary-50/); // secondary 스타일 일부
    expect(btn.className).toMatch(/h-\[52px\]/); // lg 사이즈
  });

  it('왼쪽 아이콘이 렌더링된다', () => {
    render(
      <StandardButton
        icon={<span data-testid="icon">아이콘</span>}
        iconPosition="left">
        텍스트
      </StandardButton>
    );
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon.parentElement?.previousSibling).toBeNull(); // 왼쪽에 위치
  });

  it('오른쪽 아이콘이 렌더링된다', () => {
    render(
      <StandardButton
        icon={<span data-testid="icon">아이콘</span>}
        iconPosition="right">
        텍스트
      </StandardButton>
    );
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon.parentElement?.nextSibling).toBeNull(); // 오른쪽에 위치
  });

  it('로딩 인디케이터가 보이고 상호작용이 비활성화된다', () => {
    render(<StandardButton isLoading>로딩 중</StandardButton>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-inz-primary-30');
    const indicator = screen.getByRole('status');
    expect(indicator).toBeInTheDocument();
  });

  it('disabled prop이 설정되면 비활성화된다', () => {
    render(<StandardButton disabled>비활성화됨</StandardButton>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
  });

  it('클릭 시 onClick이 호출된다', () => {
    const handleClick = vi.fn();
    render(<StandardButton onClick={handleClick}>클릭</StandardButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('비활성화 시 onClick이 호출되지 않는다', () => {
    const handleClick = vi.fn();
    render(
      <StandardButton
        onClick={handleClick}
        disabled>
        클릭
      </StandardButton>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('text variant에 p-0 클래스가 적용된다', () => {
    render(<StandardButton variant="text">텍스트</StandardButton>);
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/\bp-0\b/);
  });
});
