import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Drawer from './Drawer';

const TITLE = '테스트 드로어';
const BTN_TEXT = '확인';
const CHILD_TEXT = 'Drawer 내용';

function setupDrawer(props: Partial<React.ComponentProps<typeof Drawer>> = {}) {
  const onClose = vi.fn();
  const onConfirm = vi.fn();
  render(
    <Drawer
      title={TITLE}
      btnText={BTN_TEXT}
      isOpen={true}
      onClose={onClose}
      onConfirm={onConfirm}
      {...props}>
      <div>{CHILD_TEXT}</div>
    </Drawer>
  );
  return { onClose, onConfirm };
}

describe('Drawer 컴포넌트', () => {
  it('제목, 버튼 텍스트, children이 정상적으로 렌더링된다', () => {
    setupDrawer();
    expect(screen.getByTestId('drawer-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-title')).toHaveTextContent(TITLE);
    expect(screen.getByTestId('drawer-confirm-btn')).toHaveTextContent(BTN_TEXT);
    expect(screen.getByTestId('drawer-content')).toHaveTextContent(CHILD_TEXT);
  });

  it('닫기 버튼 클릭 시 onClose가 호출된다', () => {
    const { onClose } = setupDrawer();
    const closeBtn = screen.getByTestId('drawer-close-btn');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it('오버레이 클릭 시 onClose가 호출된다', () => {
    const { onClose } = setupDrawer();
    fireEvent.keyDown(screen.getByTestId('drawer-dialog'), {
      key: 'Escape',
      code: 'Escape',
    });
    expect(onClose).toHaveBeenCalled();
  });

  it('ESC 키 입력 시 onClose가 호출된다', () => {
    const { onClose } = setupDrawer();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('확인 버튼 클릭 시 onConfirm이 호출된다', () => {
    vi.useFakeTimers(); // 타이머 mocking 시작
    const { onConfirm } = setupDrawer();
    const confirmBtn = screen.getByTestId('drawer-confirm-btn');
    fireEvent.click(confirmBtn);
    vi.runAllTimers(); // 모든 타이머 즉시 실행
    expect(onConfirm).toHaveBeenCalled();
    vi.useRealTimers(); // 타이머 mocking 해제
  });

  it('isOpen이 false일 때 Drawer가 렌더링되지 않는다', () => {
    render(
      <Drawer
        title={TITLE}
        btnText={BTN_TEXT}
        isOpen={false}
        onClose={vi.fn()}
        onConfirm={vi.fn()}>
        <div>{CHILD_TEXT}</div>
      </Drawer>
    );
    const dialog = screen.queryByTestId('drawer-dialog');
    expect(dialog).not.toBeInTheDocument();
  });

  it('size props에 따라 올바른 사이즈 클래스가 적용된다', () => {
    render(
      <Drawer
        title={TITLE}
        btnText={BTN_TEXT}
        isOpen={true}
        size="lg"
        onClose={vi.fn()}
        onConfirm={vi.fn()}>
        <div>{CHILD_TEXT}</div>
      </Drawer>
    );
    const dialog = screen.getByTestId('drawer-dialog');
    expect(dialog.className).toContain('w-[50vw]');
    expect(dialog.className).toContain('min-w-[720px]');
  });
});
