import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import Input from "./Input";

describe("Input Component", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("기본 props로 올바르게 렌더링되어야 합니다.", () => {
    render(
      <Input
        labelText="테스트 레이블"
        value="테스트 값"
        placeholder="테스트 플레이스홀더"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByLabelText("테스트 레이블")).toBeInTheDocument();
    expect(screen.getByDisplayValue("테스트 값")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("테스트 플레이스홀더")
    ).toBeInTheDocument();
  });

  it("입력 변경 시 onChange 핸들러가 호출되어야 합니다.", () => {
    render(<Input labelText="Email" value="" onChange={mockOnChange} />);
    const inputElement = screen.getByLabelText("Email");
    fireEvent.change(inputElement, { target: { value: "test@example.com" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("isInvalid가 true일 때 오류 메시지를 표시해야 합니다.", () => {
    render(
      <Input
        labelText="Password"
        value="123"
        onChange={mockOnChange}
        isInvalid
        invalidText="비밀번호가 너무 짧습니다."
      />
    );
    expect(screen.getByText("비밀번호가 너무 짧습니다.")).toBeInTheDocument();
  });

  it("helpText가 제공되면 도움말 텍스트를 표시해야 합니다.", () => {
    render(
      <Input
        labelText="Username"
        value="john_doe"
        onChange={mockOnChange}
        helpText="사용자 이름은 알파벳과 숫자만 포함할 수 있습니다."
      />
    );
    expect(
      screen.getByText("사용자 이름은 알파벳과 숫자만 포함할 수 있습니다.")
    ).toBeInTheDocument();
  });

  it("Slot prop으로 전달된 ReactNode를 렌더링해야 합니다.", () => {
    const SlotComponent = <button type="button">슬롯 버튼</button>;
    render(
      <Input
        labelText="Search"
        value=""
        onChange={mockOnChange}
        slot={SlotComponent}
      />
    );
    expect(
      screen.getByRole("button", { name: "슬롯 버튼" })
    ).toBeInTheDocument();
  });

  it("ShowAsterisk가 true일 때 레이블에 별표를 표시해야 합니다.", () => {
    render(
      <Input
        labelText="필수 필드"
        value=""
        onChange={mockOnChange}
        showAsterisk
      />
    );
    const labelTextElement = screen.getByText("필수 필드");
    const asteriskElement = screen.getByText("*", { selector: "span" });

    expect(labelTextElement).toBeInTheDocument();
    expect(asteriskElement).toBeInTheDocument();
  });

  it("HTML input의 기본 type prop을 전달해야 합니다.", () => {
    render(
      <Input
        labelText="숫자 입력"
        value="123"
        onChange={mockOnChange}
        type="number"
      />
    );
    const inputElement = screen.getByLabelText("숫자 입력");
    expect(inputElement).toHaveAttribute("type", "number");
  });

  it("maxLength가 적용되어야 합니다.", () => {
    render(
      <Input
        labelText="제한된 입력"
        value=""
        onChange={mockOnChange}
        maxLength={5}
      />
    );
    const inputElement = screen.getByLabelText("제한된 입력");
    expect(inputElement).toHaveAttribute("maxLength", "5");
  });
});
