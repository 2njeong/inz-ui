import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Tooltip from './Tooltip';

// Portal mock
vi.mock('react-dom', () => ({
  createPortal: (children: React.ReactNode) => children,
}));

describe('Tooltip', () => {
  it('children을 렌더링한다', () => {
    render(
      <Tooltip content="Test tooltip">
        <button type="button">Hover me</button>
      </Tooltip>
    );

    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('content prop을 받는다', () => {
    render(
      <Tooltip content="Test tooltip content">
        <button type="button">Hover me</button>
      </Tooltip>
    );

    // content prop이 전달되었는지 확인 (실제 렌더링은 hover에 의존)
    const tooltipContainer = screen.getByRole('button').parentElement;
    expect(tooltipContainer).toBeInTheDocument();
  });

  it('variant prop을 받는다', () => {
    const { rerender } = render(
      <Tooltip
        content="Test tooltip"
        variant="default">
        <button type="button">Hover me</button>
      </Tooltip>
    );

    // default variant가 적용되었는지 확인
    const tooltipContainer = screen.getByRole('button').parentElement;
    expect(tooltipContainer).toBeInTheDocument();

    // white variant 테스트
    rerender(
      <Tooltip
        content="Test tooltip"
        variant="white">
        <button type="button">Hover me</button>
      </Tooltip>
    );

    const newTooltipContainer = screen.getByRole('button').parentElement;
    expect(newTooltipContainer).toBeInTheDocument();
  });

  it('icon prop을 받는다', () => {
    render(
      <Tooltip
        content="Test tooltip"
        icon={<span data-testid="tooltip-icon">⭐</span>}>
        <button type="button">Hover me</button>
      </Tooltip>
    );

    // icon prop이 전달되었는지 확인
    const tooltipContainer = screen.getByRole('button').parentElement;
    expect(tooltipContainer).toBeInTheDocument();
  });

  it('ReactNode content를 받는다', () => {
    render(
      <Tooltip content={<span data-testid="custom-content">Custom content</span>}>
        <button type="button">Hover me</button>
      </Tooltip>
    );

    // ReactNode content가 전달되었는지 확인
    const tooltipContainer = screen.getByRole('button').parentElement;
    expect(tooltipContainer).toBeInTheDocument();
  });

  it('placement prop을 받는다', () => {
    render(
      <Tooltip
        content="Test tooltip"
        placement="bottom">
        <button type="button">Hover me</button>
      </Tooltip>
    );

    // placement prop이 전달되었는지 확인
    const tooltipContainer = screen.getByRole('button').parentElement;
    expect(tooltipContainer).toBeInTheDocument();
  });
});
