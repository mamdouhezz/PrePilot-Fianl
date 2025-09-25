import React from 'react';

interface Step {
  number: number;
  title: string;
}

interface StepIndicatorProps {
  steps?: Step[];
  current: number;
  onStepClick?: (step: number) => void;
}

const defaultSteps: Step[] = [
  { number: 1, title: 'عن البزنس والجمهور' },
  { number: 2, title: 'الاستراتيجية والميزانية' },
  { number: 3, title: 'الأهداف والمنصات' },
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps = defaultSteps, current, onStepClick }) => {
  return (
    <div className="flex items-start w-full">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center text-center w-1/3 shrink-0">
            <button
              type="button"
              onClick={() => onStepClick?.(step.number)}
              className="flex flex-col items-center"
              aria-current={current === step.number ? 'step' : undefined}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 ${
                  current >= step.number
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'bg-gray-800 border-gray-600 text-gray-400'
                }`}
              >
                {current > step.number ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <p
                className={`mt-2 text-xs sm:text-sm font-medium transition-colors duration-300 ${
                  current === step.number ? 'text-purple-300' : 'text-gray-500'
                }`}
              >
                {step.title}
              </p>
            </button>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 mt-5 h-1 rounded-full transition-colors duration-500 ease-in-out bg-gray-700">
              <div
                className="h-1 rounded-full bg-purple-600 transition-all duration-500"
                style={{ width: current > step.number ? '100%' : '0%' }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;


