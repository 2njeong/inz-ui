import { useState } from "react";
import { Input } from "inz-ui";

interface TypoStyle {
    className: string;
    name: string;
    size: string;
    weight: string;
    lineHeight: string;
}

const typoStyles: TypoStyle[] = [
    {
        className: "heading1",
        name: "Heading 1",
        size: "28px",
        weight: "700",
        lineHeight: "36px",
    },
    {
        className: "heading2",
        name: "Heading 2",
        size: "24px",
        weight: "700",
        lineHeight: "32px",
    },
    {
        className: "heading3",
        name: "Heading 3",
        size: "20px",
        weight: "700",
        lineHeight: "28px",
    },
    {
        className: "title1",
        name: "Title 1",
        size: "18px",
        weight: "700",
        lineHeight: "26px",
    },
    {
        className: "title2",
        name: "Title 2",
        size: "18px",
        weight: "500",
        lineHeight: "26px",
    },
    {
        className: "title3",
        name: "Title 3",
        size: "16px",
        weight: "700",
        lineHeight: "24px",
    },
    {
        className: "body1",
        name: "Body 1",
        size: "16px",
        weight: "500",
        lineHeight: "24px",
    },
    {
        className: "body2",
        name: "Body 2",
        size: "16px",
        weight: "400",
        lineHeight: "24px",
    },
    {
        className: "body3",
        name: "Body 3",
        size: "14px",
        weight: "500",
        lineHeight: "20px",
    },
    {
        className: "body4",
        name: "Body 4",
        size: "14px",
        weight: "400",
        lineHeight: "20px",
    },
    {
        className: "details1",
        name: "Details 1",
        size: "13px",
        weight: "500",
        lineHeight: "18px",
    },
    {
        className: "details2",
        name: "Details 2",
        size: "12px",
        weight: "500",
        lineHeight: "16px",
    },
    {
        className: "details3",
        name: "Details 3",
        size: "16px",
        weight: "400",
        lineHeight: "24px",
    },
];

const SAMPLE_TEXT = "모션랩스의 타이포그래피 스타일을 확인해보세요";

const TypographyTab = () => {
    const [sampleText, setSampleText] = useState(SAMPLE_TEXT);

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h2 className="heading2 text-inz-text-title mb-2">
                    Typography
                </h2>
                <p className="body4 text-inz-text-helper">
                    Pretendard Variable 기반 타이포그래피 스타일 시스템
                </p>
                <div className="mt-4 max-w-md">
                    <Input
                        value={sampleText}
                        onChange={(e) => setSampleText(e.target.value)}
                        placeholder={SAMPLE_TEXT}
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-inz-line-container bg-white">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-inz-line-container bg-inz-coolgrey-95">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-inz-text-title w-36">
                                Style
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-inz-text-title">
                                Preview
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-inz-text-title w-20">
                                Size
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-inz-text-title w-20">
                                Weight
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-inz-text-title w-28">
                                Line Height
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-inz-text-title w-28">
                                Class
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {typoStyles.map((style) => (
                            <tr
                                key={style.className}
                                className="border-b border-inz-line-container last:border-b-0 hover:bg-inz-coolgrey-95/50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <span className="body3 text-inz-text-title">
                                        {style.name}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`${style.className} text-inz-text-body`}
                                    >
                                        {sampleText || SAMPLE_TEXT}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="details1 text-inz-text-helper">
                                        {style.size}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="details1 text-inz-text-helper">
                                        {style.weight}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="details1 text-inz-text-helper">
                                        {style.lineHeight}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <code className="rounded bg-inz-coolgrey-95 px-1.5 py-0.5 text-xs font-mono text-inz-primary-40">
                                        .{style.className}
                                    </code>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TypographyTab;
