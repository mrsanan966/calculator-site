import * as React from "react"

const Slider = React.forwardRef(({ className, value, onValueChange, min, max, step, ...props }, ref) => {
  return (
    <input
      type="range"
      ref={ref}
      value={value[0]}
      onChange={(e) => onValueChange([Number(e.target.value)])}
      min={min}
      max={max}
      step={step}
      className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${className}`}
      {...props}
    />
  )
})
Slider.displayName = "Slider"

export { Slider }
