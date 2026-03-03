import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@ui/utils/cn";

const badgeVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "select-none",
    "transition-colors",
    "rounded-sm",
    "px-1.5",
    "py-1",
    "gap-0.5",
  ],
  {
    variants: {
      variant: {
        whiteSolid: "",
        colorSolid: "",
        colorSolidGrey: "",
        text: "bg-transparent",
      },
      color: {
        grey: "",
        blue: "",
        purple: "",
        green: "",
        red: "",
        yellow: "",
      },
      size: {
        sm: "details2",
        md: "body3",
      },
    },
    compoundVariants: [
      // Text variant
      {
        variant: "text",
        color: "grey",
        className: "text-inz-greyscale-30",
      },
      { variant: "text", color: "blue", className: "text-inz-primary-40" },
      { variant: "text", color: "green", className: "text-inz-green-30" },
      { variant: "text", color: "yellow", className: "text-inz-yellow-20" },
      { variant: "text", color: "red", className: "text-inz-red-50" },
      { variant: "text", color: "purple", className: "text-inz-purple-20" },

      // whiteSolid variant
      {
        variant: "whiteSolid",
        color: "grey",
        className: "bg-inz-greyscale-100 text-inz-greyscale-30",
      },
      {
        variant: "whiteSolid",
        color: "blue",
        className: "bg-inz-greyscale-100 text-inz-primary-40",
      },
      {
        variant: "whiteSolid",
        color: "green",
        className: "bg-inz-greyscale-100 text-inz-green-30",
      },
      {
        variant: "whiteSolid",
        color: "yellow",
        className: "bg-inz-greyscale-100 text-inz-yellow-20",
      },
      {
        variant: "whiteSolid",
        color: "red",
        className: "bg-inz-greyscale-100 text-inz-red-50",
      },
      {
        variant: "whiteSolid",
        color: "purple",
        className: "bg-inz-greyscale-100 text-inz-purple-20",
      },

      // colorSolid variant
      {
        variant: "colorSolid",
        color: "grey",
        className: "bg-inz-greyscale-90 text-inz-greyscale-30",
      },
      {
        variant: "colorSolid",
        color: "blue",
        className: "bg-inz-primary-95 text-inz-primary-40",
      },
      {
        variant: "colorSolid",
        color: "purple",
        className: "bg-inz-purple-95 text-inz-purple-20",
      },
      {
        variant: "colorSolid",
        color: "green",
        className: "bg-inz-green-90 text-inz-green-30",
      },
      {
        variant: "colorSolid",
        color: "red",
        className: "bg-inz-red-95 text-inz-red-50",
      },
      {
        variant: "colorSolid",
        color: "yellow",
        className: "bg-inz-yellow-95 text-inz-yellow-20",
      },
      // colorSolidGrey variant
      {
        variant: "colorSolidGrey",
        color: "grey",
        className: "bg-inz-greyscale-80 text-inz-greyscale-30",
      },
      {
        variant: "colorSolidGrey",
        color: "blue",
        className: "bg-inz-primary-90 text-inz-greyscale-30",
      },
      {
        variant: "colorSolidGrey",
        color: "green",
        className: "bg-inz-green-80 text-inz-greyscale-30",
      },
      {
        variant: "colorSolidGrey",
        color: "yellow",
        className: "bg-inz-yellow-90 text-inz-greyscale-30",
      },
      {
        variant: "colorSolidGrey",
        color: "red",
        className: "bg-inz-red-90 text-inz-greyscale-30",
      },
      {
        variant: "colorSolidGrey",
        color: "purple",
        className: "bg-inz-purple-90 text-inz-greyscale-30",
      },
    ],
    defaultVariants: {
      variant: "text",
      color: "grey",
      size: "md",
    },
  }
);

export type BadgeColor = VariantProps<typeof badgeVariants>["color"];

interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof badgeVariants> {
  /**
   * 뱃지에 표시될 텍스트 또는 요소 (필수)
   */
  badgeLabel: string | React.ReactNode;
  /**
   * 뱃지 앞에 표시될 아이콘
   */
  icon?: React.ReactNode;
}

/**
 * 뱃지 컴포넌트
 *
 * 상태나 카테고리를 표시하는 작은 라벨 컴포넌트입니다. 다양한 스타일과 색상을 제공합니다.
 *
 * @param badgeLabel - 뱃지에 표시될 텍스트 또는 요소 (필수)
 * @param variant - 뱃지 스타일: `text` (배경 없음) | `whiteSolid` (흰색 배경) | `colorSolid` (색상 배경) | `colorSolidGrey` (회색 톤 색상 배경) (기본값: `text`)
 * @param color - 뱃지 색상: `grey` | `blue` | `purple` | `green` | `red` | `yellow` (기본값: `grey`)
 * @param size - 뱃지 크기: `sm` | `md` (기본값: `md`)
 * @param icon - 뱃지 앞에 표시할 아이콘
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * // 기본 뱃지 (텍스트 스타일)
 * <Badge badgeLabel="New" color="blue" />
 *
 * // 아이콘과 함께 사용
 * <Badge
 *   badgeLabel="3"
 *   icon={<NotificationIcon />}
 *   variant="colorSolid"
 *   color="red"
 * />
 *
 * // 흰색 배경 뱃지
 * <Badge
 *   badgeLabel="완료"
 *   variant="whiteSolid"
 *   color="green"
 *   size="sm"
 * />
 * ```
 */
const Badge = ({
  badgeLabel,
  icon,
  variant,
  color,
  size,
  className,
  ...rest
}: BadgeProps) => {
  return (
    <div
      className={cn(badgeVariants({ variant, color, size }), className)}
      {...rest}
    >
      {icon}
      {badgeLabel}
    </div>
  );
};

export default Badge;
