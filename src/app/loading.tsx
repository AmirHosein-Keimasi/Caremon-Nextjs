import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-black/60">
      <div className="flex h-[100px] w-[220px] items-center justify-center overflow-hidden">
        <svg
          className="h-full w-full max-h-[100px] max-w-[220px] animate-[moveCar_1.5s_ease-in-out_infinite_alternate]"
          viewBox="0 0 204 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            stroke="var(--color-primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* بدنه ماشین */}
            <path
              className="animate-[shake_0.3s_ease-in-out_infinite_alternate]"
              d="M47.293 2.375C52.927.792 54.017.805 54.017.805c2.613-.445 6.838-.337 9.42.237l8.381 1.863c2.59.576 6.164 2.606 7.98 4.531l6.348 6.732 6.245 1.877c3.098.508 5.609 3.431 5.609 6.507v4.206c0 .29-2.536 4.189-5.687 4.189H36.808c-2.655 0-4.34-2.1-3.688-4.67 0 0 3.71-19.944 14.173-23.902zM36.5 15.5h54.01"
              strokeWidth="3"
            />
            {/* چرخ عقب — مکان ثابت، انیمیشن جزئی برای حس حرکت */}
            <ellipse
              className="animate-[tireRoll_0.4s_ease-in-out_infinite_alternate]"
              cx="46.5"
              cy="30.25"
              rx="6.9"
              ry="6.8"
              strokeWidth="3"
              fill="var(--background)"
              style={{ transformOrigin: "center" }}
            />
            {/* چرخ جلو */}
            <ellipse
              className="animate-[tireRoll_0.4s_ease-in-out_infinite_alternate]"
              cx="83.5"
              cy="30.25"
              rx="6.9"
              ry="6.8"
              strokeWidth="3"
              fill="var(--background)"
              style={{ transformOrigin: "center" }}
            />
            {/* خطوط دود */}
            <path
              className="stroke-dash-[22] animate-[line_0.8s_ease-in-out_infinite]"
              d="M22.5 16.5H2.475"
              strokeWidth="3"
            />
            <path
              className="stroke-dash-[22] animate-[line_0.8s_ease-in-out_infinite_0.2s]"
              d="M20.5 23.5H.4755"
              strokeWidth="3"
            />
            <path
              className="stroke-dash-[22] animate-[line_0.8s_ease-in-out_infinite_0.4s]"
              d="M25.5 9.5h-19"
              strokeWidth="3"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Loading;
