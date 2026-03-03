import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Badge from "./Badge";

describe("Badge", () => {
  it("기본 Badge가 올바르게 렌더링된다", () => {
    render(<Badge badgeLabel="Test Badge" />);
    const badgeElement = screen.getByText("Test Badge");
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement.className).toMatch("text-inz-greyscale-30");
    expect(badgeElement.className).toMatch("body3");
  });

  it("size prop에 따라 스타일이 변경된다", () => {
    const { rerender } = render(<Badge badgeLabel="Small Badge" size="sm" />);
    expect(screen.getByText("Small Badge").className).toMatch("details2");

    rerender(<Badge badgeLabel="Medium Badge" size="md" />);
    expect(screen.getByText("Medium Badge").className).toMatch("body3");
  });

  it("icon prop이 적용되면 아이콘이 표시된다", () => {
    render(
      <Badge
        badgeLabel="Icon Badge"
        icon={<span data-testid="test-icon">⭐</span>}
      />
    );
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(screen.getByText("Icon Badge")).toBeInTheDocument();
  });

  it("className prop을 통해 추가 클래스가 적용된다", () => {
    render(<Badge badgeLabel="Custom Class" className="bg-custom-blue" />);
    const badgeElement = screen.getByText("Custom Class");
    expect(badgeElement.className).toMatch("bg-custom-blue");
  });

  describe("variantStyle & color 조합 테스트", () => {
    it("variantStyle=text일 때 올바른 스타일이 적용된다", () => {
      render(<Badge badgeLabel="Text Blue" variant="text" color="blue" />);
      expect(screen.getByText("Text Blue").className).toMatch(
        "text-inz-primary-40"
      );
      expect(screen.getByText("Text Blue").className).toMatch("bg-transparent");
    });

    it("variantStyle=whiteSolid일 때 올바른 스타일이 적용된다", () => {
      render(
        <Badge
          badgeLabel="White Solid Grey"
          variant="whiteSolid"
          color="grey"
        />
      );
      const badgeElement = screen.getByText("White Solid Grey");
      expect(badgeElement.className).toMatch("bg-inz-greyscale-100");
      expect(badgeElement.className).toMatch("text-inz-greyscale-30");
    });

    it("variantStyle=colorSolid일 때 올바른 스타일이 적용된다", () => {
      render(
        <Badge badgeLabel="Solid Green" variant="colorSolid" color="green" />
      );
      const badgeElement = screen.getByText("Solid Green");
      expect(badgeElement.className).toMatch("bg-inz-green-90");
      expect(badgeElement.className).toMatch("text-inz-green-30");
    });

    it("variantStyle=colorSolidGrey일 때 올바른 스타일이 적용된다", () => {
      render(
        <Badge
          badgeLabel="colorSolidGrey Red"
          variant="colorSolidGrey"
          color="red"
        />
      );
      const badgeElement = screen.getByText("colorSolidGrey Red");
      expect(badgeElement.className).toMatch("bg-inz-red-90");
      expect(badgeElement.className).toMatch("text-inz-greyscale-30");
    });

    it("variantStyle=colorSolid이고 color=purple일 때 올바른 스타일이 적용된다", () => {
      render(
        <Badge
          badgeLabel="colorSolid Purple"
          variant="colorSolid"
          color="purple"
        />
      );
      const badgeElement = screen.getByText("colorSolid Purple");
      expect(badgeElement.className).toMatch("bg-inz-purple-95");
      expect(badgeElement.className).toMatch("text-inz-purple-20");
    });
  });

  it("defaultVariants가 올바르게 적용된다", () => {
    render(<Badge badgeLabel="Default Test" />);
    const badgeElement = screen.getByText("Default Test");
    expect(badgeElement.className).toMatch("bg-transparent");
    expect(badgeElement.className).toMatch("text-inz-greyscale-30");
    expect(badgeElement.className).toMatch("body3");
  });
});
