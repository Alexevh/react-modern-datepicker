import React from 'react';
import './DatePicker.css';
interface DatePickerProps {
    selectedDate?: Date;
    dateFormat?: string;
    isRange?: boolean;
    onDateChange?: (date: Date | null) => void;
    onRangeChange?: (range: {
        start: Date | null;
        end: Date | null;
    }) => void;
    placeholder?: string;
    className?: string;
}
declare const DatePicker: React.FC<DatePickerProps>;
export default DatePicker;
