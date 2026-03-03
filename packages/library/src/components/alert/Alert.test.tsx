import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { afterEach, beforeAll, describe, expect, it } from "vitest";
import Alert from "./Alert";

beforeAll(() => {
  window.HTMLDialogElement.prototype.showModal = vi.fn();
  window.HTMLDialogElement.prototype.close = vi.fn();
});

describe("Alert", () => {
  const baseProps = {
    isOpen: true,
    type: "error" as const,
    mainText: "메인 텍스트",
    subText: "서브 텍스트",
    confirmText: "확인",
    cancelText: "취소",
    onClose: vi.fn(),
    onConfirm: vi.fn(),
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("isOpen이 false면 렌더링되지 않는다", () => {
    const { container } = render(<Alert {...baseProps} isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("mainText, subText, 버튼 텍스트가 정상적으로 렌더링된다", () => {
    render(<Alert {...baseProps} />);
    expect(screen.getByText("메인 텍스트")).toBeInTheDocument();
    expect(screen.getByText("서브 텍스트")).toBeInTheDocument();
    expect(screen.getByText("확인")).toBeInTheDocument();
    expect(screen.getByText("취소")).toBeInTheDocument();
  });

  it("confirm 버튼 클릭 시 onConfirm, onClose가 호출된다", () => {
    render(<Alert {...baseProps} />);
    fireEvent.click(screen.getByText("확인"));
    expect(baseProps.onConfirm).toHaveBeenCalled();
    expect(baseProps.onClose).toHaveBeenCalled();
  });

  it("cancel 버튼 클릭 시 onClose만 호출된다", () => {
    render(<Alert {...baseProps} />);
    fireEvent.click(screen.getByText("취소"));
    expect(baseProps.onClose).toHaveBeenCalled();
    expect(baseProps.onConfirm).not.toHaveBeenCalled();
  });

  it("cancelText가 없으면 cancel 버튼이 렌더링되지 않는다", () => {
    render(<Alert {...baseProps} cancelText={undefined} />);
    expect(screen.queryByText("취소")).toBeNull();
  });

  it("children이 있으면 추가 컨텐츠가 렌더링된다", () => {
    render(
      <Alert {...baseProps}>
        <div data-testid="custom-child">추가 컨텐츠</div>
      </Alert>
    );
    expect(screen.getByTestId("custom-child")).toBeInTheDocument();
  });

  it("다이얼로그 바깥 클릭 시 onClose가 호출된다", () => {
    render(<Alert {...baseProps} />);
    const dialog = screen.getByRole("dialog", { hidden: true });
    const rect = dialog.getBoundingClientRect();
    fireEvent.click(dialog, {
      target: dialog,
      clientX: rect.left - 10,
      clientY: rect.top - 10,
    });
    expect(baseProps.onClose).toHaveBeenCalled();
  });

  it("type에 따라 AlertIcon이 정상 렌더링된다", () => {
    const { rerender } = render(<Alert {...baseProps} type="error" />);
    expect(screen.getByTestId("alert-icon-error")).toBeInTheDocument();
    rerender(<Alert {...baseProps} type="confirm" />);
    expect(screen.getByTestId("alert-icon-confirm")).toBeInTheDocument();
    rerender(<Alert {...baseProps} type="complete" />);
    expect(screen.getByTestId("alert-icon-complete")).toBeInTheDocument();
  });
});
