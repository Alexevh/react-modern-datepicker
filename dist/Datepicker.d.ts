import React from 'react';
import './DatePicker.css';
interface DatePickerProps {
    selectedDate?: Date;
    onDateChange?: (date: Date | null) => void;
    isRange?: boolean;
    onRangeChange?: (range: {
        start: Date | null;
        end: Date | null;
    }) => void;
    dateFormat?: string;
    placeholder?: string;
    selectionColor?: string;
    hoverColor?: string;
    className?: string;
}
declare const DatePicker: React.FC<DatePickerProps>;
export default DatePicker;
