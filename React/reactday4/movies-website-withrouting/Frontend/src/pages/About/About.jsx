import React, { useEffect, useState } from "react";
import "./About.css";

const About = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const c = setTimeout(() => {
            setLoaded(true);
        }, 50);
        return () => clearTimeout(c);
    }, []);

    return (
        <div className="about-container">
            <div className={loaded ? "" : "not-loaded"}>
                <div className="night"></div>
                <div className="about-message">
                    At the heart of everything we do is a passion for innovation and a commitment to crafting experiences that inspire, connect, and empower our community to grow together.
                </div>
                <div className="flowers">
                    {[1, 2, 3].map((num) => (
                        <div className={`flower flower--${num}`} key={`flower-${num}`}>
                            <div className={`flower__leafs flower__leafs--${num}`}>
                                {[1, 2, 3, 4].map((i) => (
                                    <div className={`flower__leaf flower__leaf--${i}`} key={`leaf-${num}-${i}`}></div>
                                ))}
                                <div className="flower__white-circle"></div>
                                {[...Array(8)].map((_, i) => (
                                    <div className={`flower__light flower__light--${i + 1}`} key={`light-${num}-${i + 1}`}></div>
                                ))}
                            </div>
                            <div className="flower__line">
                                {[...Array(num === 1 ? 6 : 4)].map((_, i) => (
                                    <div className={`flower__line__leaf flower__line__leaf--${i + 1}`} key={`line-leaf-${num}-${i + 1}`}></div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="grow-ans" style={{ "--d": "1.2s" }}>
                        <div className="flower__g-long">
                            <div className="flower__g-long__top"></div>
                            <div className="flower__g-long__bottom"></div>
                        </div>
                    </div>

                    {[1, 2].map((i) => (
                        <div className="growing-grass" key={`grass-${i}`}>
                            <div className={`flower__grass flower__grass--${i}`}>
                                <div className="flower__grass--top"></div>
                                <div className="flower__grass--bottom"></div>
                                {[...Array(8)].map((_, j) => (
                                    <div className={`flower__grass__leaf flower__grass__leaf--${j + 1}`} key={`grass-leaf-${i}-${j + 1}`}></div>
                                ))}
                                <div className="flower__grass__overlay"></div>
                            </div>
                        </div>
                    ))}

                    <div className="grow-ans" style={{ "--d": "2.4s" }}>
                        <div className="flower__g-right flower__g-right--1">
                            <div className="leaf"></div>
                        </div>
                    </div>
                    <div className="grow-ans" style={{ "--d": "2.8s" }}>
                        <div className="flower__g-right flower__g-right--2">
                            <div className="leaf"></div>
                        </div>
                    </div>
                    <div className="grow-ans" style={{ "--d": "2.8s" }}>
                        <div className="flower__g-front">
                            {[...Array(8)].map((_, i) => (
                                <div className={`flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${i + 1}`} key={`front-leaf-${i + 1}`}>
                                    <div className="flower__g-front__leaf"></div>
                                </div>
                            ))}
                            <div className="flower__g-front__line"></div>
                        </div>
                    </div>
                    <div className="grow-ans" style={{ "--d": "3.2s" }}>
                        <div className="flower__g-fr">
                            <div className="leaf"></div>
                            {[...Array(8)].map((_, i) => (
                                <div className={`flower__g-fr__leaf flower__g-fr__leaf--${i + 1}`} key={`fr-leaf-${i + 1}`}></div>
                            ))}
                        </div>
                    </div>

                    {[0, 1, 2, 3, 4, 5, 6, 7].map((g) => (
                        <div className={`long-g long-g--${g}`} key={`long-g-${g}`}>
                            {[0, 1, 2, 3].map((l) => (
                                <div
                                    className="grow-ans"
                                    style={{
                                        "--d":
                                            g === 0
                                                ? ["3s", "2.2s", "3.4s", "3.6s"][l]
                                                : g === 1
                                                    ? ["3.6s", "3.8s", "4s", "4.2s"][l]
                                                    : g === 2
                                                        ? ["4s", "4.2s", "4.4s", "4.6s"][l]
                                                        : g === 3
                                                            ? ["4s", "4.2s", "3s", "3.6s"][l]
                                                            : g === 4
                                                                ? ["4s", "4.2s", "3s", "3.6s"][l]
                                                                : g === 5
                                                                    ? ["4s", "4.2s", "3s", "3.6s"][l]
                                                                    : g === 6
                                                                        ? ["4.2s", "4.4s", "4.6s", "4.8s"][l]
                                                                        : ["3s", "3.2s", "3.5s", "3.6s"][l],
                                    }}
                                    key={`long-g-${g}-leaf-${l}`}
                                >
                                    <div className={`leaf leaf--${l}`}></div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
