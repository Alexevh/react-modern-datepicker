 import React, { useState, useRef, useEffect } from 'react';
import { format, addMonths, subMonths, isBefore, startOfDay, endOfMonth, parse } from 'date-fns';
import './DatePicker.css';

interface DatePickerProps {
    selectedDate?: Date;
    onDateChange?: (date: Date | null) => void;
    isRange?: boolean;
    onRangeChange?: (range: { start: Date | null; end: Date | null }) => void;
    dateFormat?: string;
    placeholder?: string;
    selectionColor?: string;
    hoverColor?: string;
    className?: string;
}

const DEFAULT_FORMAT = 'MM/dd/yyyy';

const DatePicker: React.FC<DatePickerProps> = ({
    selectedDate,
    onDateChange,
    isRange,
    onRangeChange,
    dateFormat = DEFAULT_FORMAT,
    placeholder = 'Select a date',
    selectionColor = '#007bff',
    hoverColor = '#0056b3',
    className = ''
}) => {
    const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
    const [rangeStart, setRangeStart] = useState<Date | null>(null);
    const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const calendarRef = useRef<HTMLDivElement>(null);
    const today = startOfDay(new Date());

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    useEffect(() => {
        if (selectedDate) {
            if (!isRange) {
                setInputValue(format(selectedDate, dateFormat));
            }
        }
    }, [selectedDate, dateFormat, isRange]);

    useEffect(() => {
        if (isRange && rangeStart && rangeEnd) {
            const formattedStart = format(rangeStart, dateFormat);
            const formattedEnd = format(rangeEnd, dateFormat);
            setInputValue(`${formattedStart} - ${formattedEnd}`);
        }
    }, [rangeStart, rangeEnd, dateFormat, isRange]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const isDateDisabled = (day: number) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return isBefore(date, today);
    };

    const isDateInRange = (day: number) => {
        if (!isRange || !rangeStart || !rangeEnd) return false;
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return date >= rangeStart && date <= rangeEnd;
    };

    const handlePrevMonth = () => {
        const newDate = subMonths(currentDate, 1);
        if (!isBefore(endOfMonth(newDate), today)) {
            setCurrentDate(newDate);
        }
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => addMonths(prev, 1));
    };

    const handleDateSelect = (day: number) => {
        if (!isDateDisabled(day)) {
            const selectedFullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            
            if (isRange) {
                if (!rangeStart || (rangeStart && rangeEnd)) {
                    setRangeStart(selectedFullDate);
                    setRangeEnd(null);
                    onRangeChange?.({ start: selectedFullDate, end: null });
                } else {
                    if (selectedFullDate < rangeStart) {
                        setRangeEnd(rangeStart);
                        setRangeStart(selectedFullDate);
                        onRangeChange?.({ start: selectedFullDate, end: rangeStart });
                    } else {
                        setRangeEnd(selectedFullDate);
                        onRangeChange?.({ start: rangeStart, end: selectedFullDate });
                    }
                    setIsOpen(false);
                }
            } else {
                setInputValue(format(selectedFullDate, dateFormat));
                onDateChange?.(selectedFullDate);
                setIsOpen(false);
            }
        }
    };

    const handleMouseEnter = (day: number) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        if (!isDateDisabled(day)) {
            const dayElement = document.querySelector(`.calendar-day:not(.weekday):not(.empty)[data-day="${day}"]`);
            if (dayElement) {
                (dayElement as HTMLElement).style.backgroundColor = hoverColor;
            }
        }
    };

    const handleMouseLeave = (day: number) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        if (!isDateDisabled(day)) {
            const dayElement = document.querySelector(`.calendar-day:not(.weekday):not(.empty)[data-day="${day}"]`);
            if (dayElement) {
                (dayElement as HTMLElement).style.backgroundColor = '';
            }
        }
    };

    const renderCalendar = () => {
        const days = [];
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        weekDays.forEach(day => {
            days.push(
                <div key={day} className="calendar-day weekday">
                    {day}
                </div>
            );
        });

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const disabled = isDateDisabled(day);
            const inRange = isDateInRange(day);
            const isStart = rangeStart?.getDate() === day && rangeStart?.getMonth() === currentDate.getMonth();
            const isEnd = rangeEnd?.getDate() === day && rangeEnd?.getMonth() === currentDate.getMonth();
            
            days.push(
                <div
                    key={day}
                    className={`calendar-day 
                        ${disabled ? 'disabled' : ''} 
                        ${inRange ? 'in-range' : ''} 
                        ${isStart ? 'range-start' : ''} 
                        ${isEnd ? 'range-end' : ''}`
                    }
                    data-day={day}
                    style={{ backgroundColor: inRange ? selectionColor : '' }}
                    onClick={() => !disabled && handleDateSelect(day)}
                    onMouseEnter={() => handleMouseEnter(day)}
                    onMouseLeave={() => handleMouseLeave(day)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    return (
        <div className={`datepicker-container ${className}`}>
            <input
                type="text"
                className="date-input"
                value={inputValue}
                placeholder={placeholder}
                onClick={() => setIsOpen(true)}
                readOnly
            />
            {isOpen && (
                <div className="calendar-wrapper" ref={calendarRef}>
                    <div className="calendar-container">
                        <div className="calendar-header">
                            <span>{format(currentDate, 'MMMM yyyy')}</span>
                            <div className="calendar-nav">
                                <button onClick={handlePrevMonth}>&lt;</button>
                                <button onClick={handleNextMonth}>&gt;</button>
                            </div>
                        </div>
                        <div className="calendar-grid">
                            {renderCalendar()}
                        </div>
                        <button className="close-button" onClick={() => setIsOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePicker;