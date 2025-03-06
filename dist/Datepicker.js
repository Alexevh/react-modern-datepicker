"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var date_fns_1 = require("date-fns");
require("./DatePicker.css");
var DEFAULT_FORMAT = 'MM/dd/yyyy';
var DatePicker = function (_a) {
    var selectedDate = _a.selectedDate, onDateChange = _a.onDateChange, isRange = _a.isRange, onRangeChange = _a.onRangeChange, _b = _a.dateFormat, dateFormat = _b === void 0 ? DEFAULT_FORMAT : _b, _c = _a.placeholder, placeholder = _c === void 0 ? 'Select a date' : _c, _d = _a.selectionColor, selectionColor = _d === void 0 ? '#007bff' : _d, _e = _a.hoverColor, hoverColor = _e === void 0 ? '#0056b3' : _e, _f = _a.className, className = _f === void 0 ? '' : _f;
    var _g = (0, react_1.useState)(selectedDate || new Date()), currentDate = _g[0], setCurrentDate = _g[1];
    var _h = (0, react_1.useState)(null), rangeStart = _h[0], setRangeStart = _h[1];
    var _j = (0, react_1.useState)(null), rangeEnd = _j[0], setRangeEnd = _j[1];
    var _k = (0, react_1.useState)(false), isOpen = _k[0], setIsOpen = _k[1];
    var _l = (0, react_1.useState)(''), inputValue = _l[0], setInputValue = _l[1];
    var calendarRef = (0, react_1.useRef)(null);
    var today = (0, date_fns_1.startOfDay)(new Date());
    var daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    var firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    (0, react_1.useEffect)(function () {
        if (selectedDate) {
            if (!isRange) {
                setInputValue((0, date_fns_1.format)(selectedDate, dateFormat));
            }
        }
    }, [selectedDate, dateFormat, isRange]);
    (0, react_1.useEffect)(function () {
        if (isRange && rangeStart && rangeEnd) {
            var formattedStart = (0, date_fns_1.format)(rangeStart, dateFormat);
            var formattedEnd = (0, date_fns_1.format)(rangeEnd, dateFormat);
            setInputValue("".concat(formattedStart, " - ").concat(formattedEnd));
        }
    }, [rangeStart, rangeEnd, dateFormat, isRange]);
    (0, react_1.useEffect)(function () {
        var handleClickOutside = function (event) {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    var isDateDisabled = function (day) {
        var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return (0, date_fns_1.isBefore)(date, today);
    };
    var isDateInRange = function (day) {
        if (!isRange || !rangeStart || !rangeEnd)
            return false;
        var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return date >= rangeStart && date <= rangeEnd;
    };
    var handlePrevMonth = function () {
        var newDate = (0, date_fns_1.subMonths)(currentDate, 1);
        if (!(0, date_fns_1.isBefore)((0, date_fns_1.endOfMonth)(newDate), today)) {
            setCurrentDate(newDate);
        }
    };
    var handleNextMonth = function () {
        setCurrentDate(function (prev) { return (0, date_fns_1.addMonths)(prev, 1); });
    };
    var handleDateSelect = function (day) {
        if (!isDateDisabled(day)) {
            var selectedFullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            if (isRange) {
                if (!rangeStart || (rangeStart && rangeEnd)) {
                    setRangeStart(selectedFullDate);
                    setRangeEnd(null);
                    onRangeChange === null || onRangeChange === void 0 ? void 0 : onRangeChange({ start: selectedFullDate, end: null });
                }
                else {
                    if (selectedFullDate < rangeStart) {
                        setRangeEnd(rangeStart);
                        setRangeStart(selectedFullDate);
                        onRangeChange === null || onRangeChange === void 0 ? void 0 : onRangeChange({ start: selectedFullDate, end: rangeStart });
                    }
                    else {
                        setRangeEnd(selectedFullDate);
                        onRangeChange === null || onRangeChange === void 0 ? void 0 : onRangeChange({ start: rangeStart, end: selectedFullDate });
                    }
                    setIsOpen(false);
                }
            }
            else {
                setInputValue((0, date_fns_1.format)(selectedFullDate, dateFormat));
                onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange(selectedFullDate);
                setIsOpen(false);
            }
        }
    };
    var handleMouseEnter = function (day) {
        var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        if (!isDateDisabled(day)) {
            var calendarDays = document.querySelectorAll('.calendar-day');
            calendarDays.forEach(function (dayElement, index) {
                if (index + 1 === day) {
                    dayElement.style.backgroundColor = hoverColor;
                }
            });
        }
    };
    var handleMouseLeave = function (day) {
        var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        if (!isDateDisabled(day)) {
            var calendarDays = document.querySelectorAll('.calendar-day');
            calendarDays.forEach(function (dayElement, index) {
                if (index + 1 === day) {
                    dayElement.style.backgroundColor = '';
                }
            });
        }
    };
    var renderCalendar = function () {
        var days = [];
        var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        weekDays.forEach(function (day) {
            days.push(react_1.default.createElement("div", { key: day, className: "calendar-day weekday" }, day));
        });
        for (var i = 0; i < firstDayOfMonth; i++) {
            days.push(react_1.default.createElement("div", { key: "empty-".concat(i), className: "calendar-day empty" }));
        }
        var _loop_1 = function (day) {
            var disabled = isDateDisabled(day);
            var inRange = isDateInRange(day);
            var isStart = (rangeStart === null || rangeStart === void 0 ? void 0 : rangeStart.getDate()) === day && (rangeStart === null || rangeStart === void 0 ? void 0 : rangeStart.getMonth()) === currentDate.getMonth();
            var isEnd = (rangeEnd === null || rangeEnd === void 0 ? void 0 : rangeEnd.getDate()) === day && (rangeEnd === null || rangeEnd === void 0 ? void 0 : rangeEnd.getMonth()) === currentDate.getMonth();
            days.push(react_1.default.createElement("div", { key: day, className: "calendar-day \n                        ".concat(disabled ? 'disabled' : '', " \n                        ").concat(inRange ? 'in-range' : '', " \n                        ").concat(isStart ? 'range-start' : '', " \n                        ").concat(isEnd ? 'range-end' : ''), style: { backgroundColor: inRange ? selectionColor : '' }, onClick: function () { return !disabled && handleDateSelect(day); }, onMouseEnter: function () { return handleMouseEnter(day); }, onMouseLeave: function () { return handleMouseLeave(day); } }, day));
        };
        for (var day = 1; day <= daysInMonth; day++) {
            _loop_1(day);
        }
        return days;
    };
    return (react_1.default.createElement("div", { className: "datepicker-container ".concat(className) },
        react_1.default.createElement("input", { type: "text", className: "date-input", value: inputValue, placeholder: placeholder, onClick: function () { return setIsOpen(true); }, readOnly: true }),
        isOpen && (react_1.default.createElement("div", { className: "calendar-wrapper", ref: calendarRef },
            react_1.default.createElement("div", { className: "calendar-container" },
                react_1.default.createElement("div", { className: "calendar-header" },
                    react_1.default.createElement("span", null, (0, date_fns_1.format)(currentDate, 'MMMM yyyy')),
                    react_1.default.createElement("div", { className: "calendar-nav" },
                        react_1.default.createElement("button", { onClick: handlePrevMonth }, "<"),
                        react_1.default.createElement("button", { onClick: handleNextMonth }, ">"))),
                react_1.default.createElement("div", { className: "calendar-grid" }, renderCalendar()),
                react_1.default.createElement("button", { className: "close-button", onClick: function () { return setIsOpen(false); } }, "Close"))))));
};
exports.default = DatePicker;
