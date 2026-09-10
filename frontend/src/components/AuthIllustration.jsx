import React, { useState, useEffect } from 'react';

export default function AuthIllustration() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const slides = [
    {
      title: "Local Insights",
      tasks: "10 Task",
      percentage: 84,
      tag: "Market",
      tagColor: "#1e293b",
      tagBg: "transparent",
      headline: <>Discover What Your Village Needs with <strong>UdyamSaathi</strong></>
    },
    {
      title: "Business Roadmap",
      tasks: "14 Task",
      percentage: 92,
      tag: "Business",
      tagColor: "#1e293b",
      tagBg: "transparent",
      headline: <>Discover the right business opportunities in your village with <strong>UdyamSaathi</strong></>
    },
    {
      title: "Micro Finance",
      tasks: "5 Schemes",
      percentage: 87,
      tag: "Funding",
      tagColor: "#1e293b",
      tagBg: "transparent",
      headline: <>Access loans and schemes with <strong>UdyamSaathi</strong></>
    }
  ];

  const goToSlide = (nextIndex) => {
    if (nextIndex === currentSlide || isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setCurrentSlide(nextIndex);
      setIsSliding(false);
    }, 320);
  };

  // Subtle auto-rotation every 6 seconds with smooth transparency during sliding
  useEffect(() => {
    const timer = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsSliding(false);
      }, 320);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const active = slides[currentSlide];

  return (
    <div className="auth-illustration-container">
      <div className="auth-illustration-card">

        {/* Main Graphic Canvas Area */}
        <div className="auth-illustration-art-wrap">

          {/* Top Left Floating Avatar Badge */}
          <div className="floating-badge top-left-badge" title="Team Member">
            <svg viewBox="0 0 100 100" className="avatar-svg">
              <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#8fd3a4" strokeWidth="4" />
              {/* Guy avatar */}
              {/* Shirt Collar */}
              <path d="M 30 96 L 44 80 L 50 88 L 56 80 L 70 96 Z" fill="#ffffff" stroke="#18181b" strokeWidth="3" strokeLinejoin="round" />
              <path d="M 50 88 L 50 96" stroke="#18181b" strokeWidth="3" />
              {/* Neck */}
              <path d="M 43 70 L 43 82 L 57 82 L 57 70" fill="#fde047" opacity="0" stroke="#18181b" strokeWidth="3" />
              {/* Face */}
              <ellipse cx="50" cy="54" rx="20" ry="22" fill="#ffffff" stroke="#18181b" strokeWidth="3.5" />
              {/* Ears */}
              <circle cx="30" cy="54" r="5" fill="#ffffff" stroke="#18181b" strokeWidth="3" />
              <circle cx="70" cy="54" r="5" fill="#ffffff" stroke="#18181b" strokeWidth="3" />
              {/* Hair */}
              <path d="M 32 46 C 30 32, 42 22, 54 22 C 60 22, 68 26, 68 34 C 68 38, 64 42, 60 42 C 68 38, 72 46, 68 50 C 65 42, 56 40, 48 40 C 38 40, 34 42, 32 46 Z"
                fill="#18181b" />
              {/* Upright Pompadour tuft */}
              <path d="M 44 23 C 44 14, 52 14, 52 23 Z" fill="#18181b" />
              {/* Eyes */}
              <ellipse cx="44" cy="52" rx="2.5" ry="3" fill="#18181b" />
              <ellipse cx="58" cy="52" rx="2.5" ry="3" fill="#18181b" />
              {/* Eyebrows */}
              <path d="M 40 46 Q 44 44 47 46" fill="none" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 55 46 Q 58 44 62 46" fill="none" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />
              {/* Smile */}
              <path d="M 43 62 Q 51 72 59 62" fill="none" stroke="#18181b" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          {/* Middle Right Floating Avatar Badge */}
          <div className="floating-badge middle-right-badge" title="Collaborator">
            <svg viewBox="0 0 100 100" className="avatar-svg">
              <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#18181b" strokeWidth="4" />
              {/* Girl avatar */}
              {/* Collar */}
              <path d="M 32 96 C 34 84, 46 80, 50 82 C 54 80, 66 84, 68 96" fill="#ffffff" stroke="#18181b" strokeWidth="3" />
              <path d="M 42 82 L 50 90 L 58 82" fill="none" stroke="#18181b" strokeWidth="3" />
              {/* Face */}
              <ellipse cx="50" cy="55" rx="19" ry="21" fill="#ffffff" stroke="#18181b" strokeWidth="3.5" />
              {/* Hair Bob */}
              <path d="M 28 54 C 26 34, 38 24, 50 24 C 64 24, 74 34, 72 56 C 72 64, 69 70, 67 70 C 66 60, 66 48, 64 45 C 58 42, 54 42, 50 46 C 46 42, 40 42, 36 45 C 34 48, 34 60, 33 70 C 31 70, 28 64, 28 54 Z"
                fill="#18181b" />
              {/* Round wide surprised eyes */}
              <circle cx="43" cy="54" r="3.5" fill="#18181b" />
              <circle cx="57" cy="54" r="3.5" fill="#18181b" />
              {/* Surprised O mouth */}
              <ellipse cx="50" cy="65" rx="3.5" ry="4.5" fill="#18181b" />
            </svg>
          </div>

          {/* Central Meditating Character Illustration */}
          <div className="central-meditation-art">
            <svg viewBox="0 0 500 480" className="meditation-svg">
              {/* Loopy Aura Line Behind Head */}
              <path
                d="M 170 190 
                   C 140 160, 130 110, 175 80 
                   C 210 55, 270 50, 305 85 
                   C 345 55, 410 70, 420 125 
                   C 430 170, 395 215, 365 220 
                   C 390 235, 415 260, 400 290 
                   C 390 310, 360 325, 335 320"
                fill="none"
                stroke="#9cd8b4"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="aura-loop-path"
              />

              {/* Character Lower Body: Legs crossed in lotus position */}
              <g className="character-legs">
                {/* Right Leg & Knee (Viewer's right) */}
                <path
                  d="M 285 300 
                     C 350 305, 425 330, 420 380 
                     C 415 415, 360 425, 325 425 
                     C 285 425, 260 410, 245 400"
                  fill="#ffffff"
                  stroke="#18181b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Left Leg & Knee (Viewer's left) */}
                <path
                  d="M 215 300 
                     C 150 305, 75 330, 80 380 
                     C 85 415, 140 425, 175 425 
                     C 215 425, 240 410, 255 400"
                  fill="#ffffff"
                  stroke="#18181b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Feet Details in Lotus Cross */}
                {/* Left foot resting on right side */}
                <path
                  d="M 330 405 
                     C 345 405, 365 410, 375 425 
                     C 380 435, 370 448, 355 448 
                     C 340 448, 330 435, 325 420 Z"
                  fill="#ffffff"
                  stroke="#18181b"
                  strokeWidth="3"
                />
                {/* Toes left */}
                <path d="M 366 430 Q 363 435 358 438" fill="none" stroke="#18181b" strokeWidth="2.5" />
                <path d="M 358 438 Q 353 442 347 442" fill="none" stroke="#18181b" strokeWidth="2.5" />

                {/* Right foot resting on left side */}
                <path
                  d="M 170 405 
                     C 155 405, 135 410, 125 425 
                     C 120 435, 130 448, 145 448 
                     C 160 448, 170 435, 175 420 Z"
                  fill="#ffffff"
                  stroke="#18181b"
                  strokeWidth="3"
                />
                {/* Toes right */}
                <path d="M 134 430 Q 137 435 142 438" fill="none" stroke="#18181b" strokeWidth="2.5" />
                <path d="M 142 438 Q 147 442 153 442" fill="none" stroke="#18181b" strokeWidth="2.5" />

                {/* Center crotch seam */}
                <path d="M 250 345 C 248 375, 248 395, 250 405" fill="none" stroke="#18181b" strokeWidth="3" />
                <path d="M 230 380 Q 250 392 270 380" fill="none" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />
              </g>

              {/* Green Sweater Torso & Arms */}
              <g className="character-torso">
                {/* Main Sweater Torso */}
                <path
                  d="M 205 190 
                     C 200 240, 195 285, 190 310 
                     C 220 318, 280 318, 310 310 
                     C 305 285, 300 240, 295 190 
                     Z"
                  fill="#8bd3a3"
                  stroke="#18181b"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />

                {/* Left Arm (Viewer's left) extending outward to knee */}
                <path
                  d="M 205 190 
                     C 170 205, 130 235, 125 280 
                     C 122 305, 140 330, 160 335 
                     C 175 320, 185 290, 195 245"
                  fill="#8bd3a3"
                  stroke="#18181b"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />

                {/* Right Arm (Viewer's right) extending outward to knee */}
                <path
                  d="M 295 190 
                     C 330 205, 370 235, 375 280 
                     C 378 305, 360 330, 340 335 
                     C 325 320, 315 290, 305 245"
                  fill="#8bd3a3"
                  stroke="#18181b"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />

                {/* Left Hand in Gyan Mudra (Touching knee) */}
                <path
                  d="M 125 280 
                     C 120 270, 110 265, 105 272 
                     C 100 280, 108 290, 115 292 
                     C 118 298, 124 300, 130 295"
                  fill="#ffffff"
                  stroke="#18181b"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Right Hand in Gyan Mudra (Touching knee) */}
                <path
                  d="M 375 280 
                     C 380 270, 390 265, 395 272 
                     C 400 280, 392 290, 385 292 
                     C 382 298, 376 300, 370 295"
                  fill="#ffffff"
                  stroke="#18181b"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* White Heart on Sweater Center */}
                <path
                  d="M 250 248 
                     C 250 242, 238 230, 226 235 
                     C 216 239, 215 252, 224 262 
                     C 233 272, 248 284, 250 286 
                     C 252 284, 267 272, 276 262 
                     C 285 252, 284 239, 274 235 
                     C 262 230, 250 242, 250 248 Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Collar Ribbing */}
                <path
                  d="M 230 190 Q 250 200 270 190"
                  fill="none"
                  stroke="#18181b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </g>

              {/* Head, Face & Hair */}
              <g className="character-head">
                {/* Neck */}
                <path d="M 240 170 L 240 192 L 260 192 L 260 170" fill="#ffffff" stroke="#18181b" strokeWidth="3" />

                {/* Face Contour */}
                <path
                  d="M 226 142 
                     C 226 172, 238 185, 250 185 
                     C 262 185, 274 172, 274 142 
                     Z"
                  fill="#ffffff"
                  stroke="#18181b"
                  strokeWidth="3.5"
                />

                {/* Black Hair - Back/Sides */}
                <path
                  d="M 218 145 
                     C 214 110, 228 85, 250 85 
                     C 272 85, 286 110, 282 145 
                     C 288 165, 288 190, 282 205 
                     C 275 190, 274 165, 274 150 
                     C 270 115, 230 115, 226 150 
                     C 226 165, 225 190, 218 205 
                     C 212 190, 212 165, 218 145 Z"
                  fill="#18181b"
                />

                {/* Forehead Hair Bangs */}
                <path
                  d="M 226 130 
                     C 235 120, 245 125, 250 135 
                     C 255 122, 266 122, 274 132 
                     C 272 108, 264 96, 250 96 
                     C 236 96, 228 108, 226 130 Z"
                  fill="#18181b"
                />

                {/* Serene Closed Eyes (˘ ˘) */}
                <path d="M 234 148 Q 239 154 244 148" fill="none" stroke="#18181b" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M 256 148 Q 261 154 266 148" fill="none" stroke="#18181b" strokeWidth="2.8" strokeLinecap="round" />

                {/* Gentle Eyebrows */}
                <path d="M 233 143 Q 239 140 244 142" fill="none" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
                <path d="M 256 142 Q 261 140 267 143" fill="none" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />

                {/* Delicate Nose */}
                <path d="M 250 152 L 249 157 L 252 157" fill="none" stroke="#18181b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                {/* Peaceful Smile */}
                <path d="M 244 166 Q 250 172 256 166" fill="none" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            </svg>
          </div>

          {/* Floating Task Progress Card */}
          <div className={`floating-task-card ${isSliding ? 'sliding-transparent' : ''}`}>
            <div className="task-card-header">
              <div className="task-text-group">
                <h4 className="task-title">{active.title}</h4>
                <span className="task-subtitle">{active.tasks}</span>
              </div>

              {/* Circular Progress Meter */}
              <div className="task-progress-ring">
                <svg viewBox="0 0 44 44" className="ring-svg">
                  <circle
                    cx="22" cy="22" r="17"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="3.5"
                  />
                  <circle
                    cx="22" cy="22" r="17"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3.5"
                    strokeDasharray="106.8"
                    strokeDashoffset={106.8 - (106.8 * active.percentage) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 22 22)"
                    className="progress-arc"
                  />
                </svg>
                <span className="ring-percentage">{active.percentage}%</span>
              </div>
            </div>

            <div className="task-card-footer">
              <span className="task-tag-badge">{active.tag}</span>
            </div>
          </div>

        </div>

        {/* Carousel Pagination Dots */}
        <div className="carousel-dots-row">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Slide ${idx + 1}`}
              onClick={() => goToSlide(idx)}
              className={`carousel-dot ${currentSlide === idx ? 'active' : ''}`}
            />
          ))}
        </div>

        {/* Bottom Headline */}
        <div className={`auth-illustration-footer ${isSliding ? 'sliding-transparent' : ''}`}>
          <p className="auth-footer-headline">
            {active.headline}
          </p>
        </div>

      </div>
    </div>
  );
}
