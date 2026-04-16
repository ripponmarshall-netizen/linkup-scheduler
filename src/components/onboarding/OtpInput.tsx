import { useRef, useEffect } from "react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  length?: number;
}

export function OtpInput({ value, onChange, error = false, length = 6 }: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, char: string) => {
    if (!/^\d*$/.test(char)) return;
    const arr = value.split("");
    arr[index] = char;
    const newVal = arr.join("").slice(0, length);
    onChange(newVal);
    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    const focusIdx = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIdx]?.focus();
  };

  return (
    <div className={`flex justify-center gap-2.5 ${error ? "animate-shake" : ""}`}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => { inputsRef.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={`w-11 h-13 rounded-lg border text-center text-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${
            error
              ? "border-destructive bg-destructive/5"
              : value[i]
                ? "border-primary/40 bg-accent/30"
                : "border-input bg-card"
          }`}
        />
      ))}
    </div>
  );
}
