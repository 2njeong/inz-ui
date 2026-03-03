import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import Modal from './Modal';

// Mock 함수를 변수에 저장
const mockShowModal = vi.fn(function (this: HTMLDialogElement) {
  this.open = true;
});

const mockClose = vi.fn(function (this: HTMLDialogElement) {
  this.open = false;
});

beforeAll(() => {
  // HTMLDialogElement의 showModal과 close 메서드를 모킹
  HTMLDialogElement.prototype.showModal = mockShowModal;
  HTMLDialogElement.prototype.close = mockClose;

  // open 속성이 없는 경우를 위한 getter/setter 정의
  Object.defineProperty(HTMLDialogElement.prototype, 'open', {
    writable: true,
    value: false,
    configurable: true,
  });
});

describe('Modal', () => {
  const baseProps = {
    isOpen: false,
    onClose: vi.fn(),
    headerText: '테스트 모달',
    children: <div>모달 내용</div>,
    buttonText: '확인',
    cancelText: '취소',
    onConfirm: vi.fn(),
  };

  afterEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = '';
  });

  it('isOpen이 false면 렌더링되지 않는다', () => {
    const { container } = render(<Modal {...baseProps} />);
    expect(container.firstChild).toBeNull();
  });

  it('isOpen이 true일 때 모달이 렌더링된다', () => {
    render(
      <Modal
        {...baseProps}
        isOpen={true}
      />
    );

    expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument();
    expect(screen.getByText('테스트 모달')).toBeInTheDocument();
    expect(screen.getByText('모달 내용')).toBeInTheDocument();
    expect(screen.getByText('확인')).toBeInTheDocument();
    expect(screen.getByText('취소')).toBeInTheDocument();
  });

  it('headerText가 정상적으로 렌더링된다', () => {
    render(
      <Modal
        {...baseProps}
        isOpen={true}
        headerText="커스텀 헤더"
      />
    );
    expect(screen.getByText('커스텀 헤더')).toBeInTheDocument();
  });

  it('children이 정상적으로 렌더링된다', () => {
    const customChildren = (
      <div>
        <p>커스텀 내용 1</p>
        <p>커스텀 내용 2</p>
      </div>
    );
    render(
      <Modal
        {...baseProps}
        isOpen={true}
        children={customChildren}
      />
    );

    expect(screen.getByText('커스텀 내용 1')).toBeInTheDocument();
    expect(screen.getByText('커스텀 내용 2')).toBeInTheDocument();
  });

  it('buttonText가 정상적으로 렌더링된다', () => {
    render(
      <Modal
        {...baseProps}
        isOpen={true}
        buttonText="저장하기"
      />
    );
    expect(screen.getByText('저장하기')).toBeInTheDocument();
  });

  it('isOpen이 true로 변경될 때 showModal이 호출된다', () => {
    const { rerender } = render(<Modal {...baseProps} />);

    expect(mockShowModal).not.toHaveBeenCalled();

    rerender(
      <Modal
        {...baseProps}
        isOpen={true}
      />
    );

    expect(mockShowModal).toHaveBeenCalled();
  });

  it('닫기 버튼 클릭 시 onClose가 호출된다', async () => {
    const onClose = vi.fn();
    render(
      <Modal
        {...baseProps}
        isOpen={true}
        onClose={onClose}
      />
    );

    const closeButton = screen.getByLabelText('닫기');
    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('취소 버튼 클릭 시 onClose가 호출된다', async () => {
    const onClose = vi.fn();
    render(
      <Modal
        {...baseProps}
        isOpen={true}
        onClose={onClose}
      />
    );

    const cancelButton = screen.getByText('취소');
    await userEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('확인 버튼 클릭 시 onConfirm이 호출된다', async () => {
    const onConfirm = vi.fn();
    render(
      <Modal
        {...baseProps}
        isOpen={true}
        onConfirm={onConfirm}
      />
    );

    const confirmButton = screen.getByText('확인');
    await userEvent.click(confirmButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('다이얼로그 바깥 클릭 시 onClose가 호출된다', () => {
    const onClose = vi.fn();
    render(
      <Modal
        {...baseProps}
        isOpen={true}
        onClose={onClose}
      />
    );

    const dialog = screen.getByRole('dialog', { hidden: true });

    // 모달 외부 클릭 시뮬레이션
    Object.defineProperty(dialog, 'getBoundingClientRect', {
      value: () => ({
        top: 100,
        left: 100,
        height: 400,
        width: 600,
      }),
    });

    // 모달 외부 좌표 클릭
    fireEvent.click(dialog, {
      clientX: 50,
      clientY: 50,
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('모달 내부 클릭 시 onClose가 호출되지 않는다', () => {
    const onClose = vi.fn();
    render(
      <Modal
        {...baseProps}
        isOpen={true}
        onClose={onClose}
      />
    );

    const dialog = screen.getByRole('dialog', { hidden: true });

    // 모달 내부 클릭 시뮬레이션
    Object.defineProperty(dialog, 'getBoundingClientRect', {
      value: () => ({
        top: 100,
        left: 100,
        height: 400,
        width: 600,
      }),
    });

    // 모달 내부 좌표 클릭
    fireEvent.click(dialog, {
      clientX: 200,
      clientY: 200,
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('모달이 열릴 때 body overflow가 hidden으로 설정된다', () => {
    render(
      <Modal
        {...baseProps}
        isOpen={true}
      />
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('모달이 닫힐 때 body overflow가 원래 값으로 복원된다', () => {
    document.body.style.overflow = 'scroll';

    const { rerender } = render(
      <Modal
        {...baseProps}
        isOpen={true}
      />
    );
    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Modal
        {...baseProps}
        isOpen={false}
      />
    );
    expect(document.body.style.overflow).toBe('scroll');
  });

  it('모달이 처음부터 닫혀있을 때 body overflow가 변경되지 않는다', () => {
    document.body.style.overflow = 'auto';

    render(
      <Modal
        {...baseProps}
        isOpen={false}
      />
    );

    expect(document.body.style.overflow).toBe('auto');
  });

  it('dialog close 이벤트 발생 시 onClose가 호출된다', () => {
    const onClose = vi.fn();
    render(
      <Modal
        {...baseProps}
        isOpen={true}
        onClose={onClose}
      />
    );

    const dialog = screen.getByRole('dialog', { hidden: true });
    const closeEvent = new Event('close');
    dialog.dispatchEvent(closeEvent);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('컴포넌트 언마운트 시 이벤트 리스너가 제거된다', () => {
    const onClose = vi.fn();
    const { unmount } = render(
      <Modal
        {...baseProps}
        isOpen={true}
        onClose={onClose}
      />
    );

    const dialog = screen.getByRole('dialog', { hidden: true });
    const removeEventListenerSpy = vi.spyOn(dialog, 'removeEventListener');

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('close', expect.any(Function));
  });

  it('dialog role을 가진다', () => {
    render(
      <Modal
        {...baseProps}
        isOpen={true}
      />
    );
    expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument();
  });

  it('닫기 버튼이 적절한 aria-label을 가진다', () => {
    render(
      <Modal
        {...baseProps}
        isOpen={true}
      />
    );
    expect(screen.getByLabelText('닫기')).toBeInTheDocument();
  });

  it('백드롭이 적절한 스타일 클래스를 가진다', () => {
    render(
      <Modal
        {...baseProps}
        isOpen={true}
      />
    );

    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog).toHaveClass('backdrop:bg-inz-overlay');
  });
});
