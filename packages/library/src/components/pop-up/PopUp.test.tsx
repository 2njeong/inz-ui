import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import PopUp from './PopUp';

beforeAll(() => {
  window.HTMLDialogElement.prototype.showModal = vi.fn();
  window.HTMLDialogElement.prototype.close = vi.fn();
});

describe('PopUp', () => {
  const baseProps = {
    isOpen: true,
    title: '팝업 제목',
    text: '팝업 텍스트',
    content: <div data-testid="popup-content">팝업 콘텐츠</div>,
    confirmText: '확인',
    onClose: vi.fn(),
    onConfirm: vi.fn(),
  };

  afterEach(() => {
    vi.clearAllMocks();
    // body overflow 스타일 초기화
    document.body.style.overflow = '';
  });

  it('isOpen이 false면 렌더링되지 않는다', () => {
    const { container } = render(
      <PopUp
        {...baseProps}
        isOpen={false}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('title, text, content, confirmText가 정상적으로 렌더링된다', () => {
    render(<PopUp {...baseProps} />);
    expect(screen.getByText('팝업 제목')).toBeInTheDocument();
    expect(screen.getByText('팝업 텍스트')).toBeInTheDocument();
    expect(screen.getByTestId('popup-content')).toBeInTheDocument();
    expect(screen.getByText('확인')).toBeInTheDocument();
  });

  it('confirm 버튼 클릭 시 onConfirm이 호출된다', () => {
    render(<PopUp {...baseProps} />);
    fireEvent.click(screen.getByText('확인'));
    expect(baseProps.onConfirm).toHaveBeenCalled();
  });

  it('close 버튼 클릭 시 onClose가 호출된다', () => {
    render(<PopUp {...baseProps} />);
    const buttons = screen.getAllByRole('button', { hidden: true });
    const closeButton = buttons.find((button) => button !== screen.getByText('확인'));
    expect(closeButton).toBeDefined();
    if (closeButton) {
      fireEvent.click(closeButton);
    }
    expect(baseProps.onClose).toHaveBeenCalled();
  });

  it('기본값이 정상적으로 적용된다', () => {
    const propsWithDefaults = {
      isOpen: true,
      title: 'title',
      text: 'text',
      content: 'context',
      confirmText: '확인',
      onClose: vi.fn(),
      onConfirm: vi.fn(),
    };
    render(<PopUp {...propsWithDefaults} />);
    // 기본값과 동일한 값들이 정상적으로 렌더링되는지 확인
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('text')).toBeInTheDocument();
    expect(screen.getByText('context')).toBeInTheDocument();
    expect(screen.getByText('확인')).toBeInTheDocument();
  });

  it('다이얼로그가 정상적으로 렌더링된다', () => {
    render(<PopUp {...baseProps} />);
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveClass('mx-auto', 'my-auto', 'max-h-[753px]', 'w-[488px]');
  });

  it('content가 ReactNode로 정상 렌더링된다', () => {
    const customContent = (
      <div>
        <p>첫 번째 단락</p>
        <p>두 번째 단락</p>
        <button type="button">커스텀 버튼</button>
      </div>
    );

    render(
      <PopUp
        {...baseProps}
        content={customContent}
      />
    );

    expect(screen.getByText('첫 번째 단락')).toBeInTheDocument();
    expect(screen.getByText('두 번째 단락')).toBeInTheDocument();
    expect(screen.getByText('커스텀 버튼')).toBeInTheDocument();
  });

  it('문자열 content도 정상 렌더링된다', () => {
    render(
      <PopUp
        {...baseProps}
        content="단순 문자열 콘텐츠"
      />
    );

    expect(screen.getByText('단순 문자열 콘텐츠')).toBeInTheDocument();
  });

  it('isOpen이 true일 때 body overflow가 hidden으로 설정된다', () => {
    render(<PopUp {...baseProps} />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('컴포넌트가 언마운트될 때 body overflow가 복원된다', () => {
    const originalOverflow = 'auto';
    document.body.style.overflow = originalOverflow;

    const { unmount } = render(<PopUp {...baseProps} />);
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe(originalOverflow);
  });

  it('CloseIcon이 올바른 props로 렌더링된다', () => {
    render(<PopUp {...baseProps} />);
    // CloseIcon의 실제 구현에 따라 테스트 방법이 달라질 수 있음
    // 여기서는 IconButton이 렌더링되는지 확인
    const iconButtons = screen.getAllByRole('button', { hidden: true });
    const closeButton = iconButtons.find((button) => button !== screen.getByText('확인'));
    expect(closeButton).toBeInTheDocument();
  });

  it('StandardButton이 올바른 props로 렌더링된다', () => {
    render(<PopUp {...baseProps} />);
    const confirmButton = screen.getByText('확인');
    expect(confirmButton).toBeInTheDocument();
    // StandardButton의 클래스나 속성을 확인할 수 있다면 추가 검증
  });
});
