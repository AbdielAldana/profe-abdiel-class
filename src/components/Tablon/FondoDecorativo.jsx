// components/FondoDecorativo.jsx
import React, { memo } from "react";

const GLYPHS = [
     "10", "{}", "[]", "</>", "=", "==", "!==", "+", "-", "*", "/", "%",
    "#", "@", "&", "λ", "∆", "Ω", "π", "Σ", "∞", "•", "×", "⟡", "⟐", "⧉"
];

const FondoDecorativo = memo(function FondoDecorativo({ fondo }) {
    if (!fondo) return null; // 0 o null => sin fondo

    switch (fondo) {
        case 1:
            return (
                <div className="bottom-particles">
                    {Array.from({ length: 100 }).map((_, i) => (
                        <span className="bubble" key={i} />
                    ))}
                </div>
            );

        case 2:
            return (
                <div className="stars">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <span className="star" key={i} />
                    ))}
                </div>
            );

        case 3:
            return (
                <div className="float-squares">
                    {Array.from({ length: 60 }).map((_, i) => (
                        <span className="sq" key={i} />
                    ))}
                </div>
            );

        case 4:
            return (
                <div className="center-fragments">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <span className="frag" key={i} />
                    ))}
                </div>
            );

        case 5:
            return <div className="scanlines" />;

        case 6:
            return (
                <div className="orbits">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <span className="p" key={i} />
                    ))}
                </div>
            );

        case 7:
            return (
                <div className="glyphs">
                    {Array.from({ length: 50 }).map((_, i) => {
                        const g = GLYPHS[i % GLYPHS.length];
                        return <span className="glyph" key={i} data-glyph={g} />;
                    })}
                </div>
            );

        default:
            return null;
    }
});

export default FondoDecorativo;
