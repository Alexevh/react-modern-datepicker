# React Modern Date Picker

## Description
A modern date picker component for React applications.

## Installation
To install the package, run:
```bash
npm install react-mdp
```

### Peer Dependencies
This package has the following peer dependencies:
```
react: ^16.8.0 || ^17.0.0 || ^18.0.0
react-dom: ^16.8.0 || ^17.0.0 || ^18.0.0
```
Make sure these are installed in your project.

![image](https://github.com/user-attachments/assets/b32480d8-f591-43ec-a2e9-3f35d80b826d)

![image](https://github.com/user-attachments/assets/3fca99cc-104b-4682-86a0-2b53ca26002a)


## Usage
Here is a simple example of how to use the date picker in your React component:
```javascript
import React from 'react';
import DatePicker from 'react-mdp';

const App = () => {
    return (
        <div>
            <h1>Select a Date</h1>
            <DatePicker />
        </div>
    );
};

export default App;
```

You can also pass the date or range to control

```javascript
 const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null
  });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleSingleDateChange = (date: Date | null) => {
    setSingleDate(date);
    console.log('Selected date:', date);
  };

  const handleRangeChange = (range: { start: Date | null; end: Date | null }) => {
    setDateRange(range);
    console.log('Selected range:', range);
  };

   <h3>Single Date Picker</h3>
          <DatePicker
            selectedDate={singleDate || undefined}
            onDateChange={handleSingleDateChange}
            dateFormat="MM/dd/yyyy"
            placeholder="Select date..."
          />
        </div>

        <div>
          <h3>Range Date Picker</h3>
          <DatePicker
            isRange={true}
            onRangeChange={handleRangeChange}
            dateFormat="MM/dd/yyyy"
            placeholder="Select date range..."
          />
        </div>
```

## DatePicker Component Properties

The `DatePicker` component accepts the following properties:

- **selectedDate** (`Date | undefined`): The date that is currently selected. If not provided, it defaults to the current date.
- **onDateChange** (`(date: Date | null) => void`): Callback function that is called when the date is changed. It receives the selected date as an argument.
- **isRange** (`boolean`): If true, the date picker allows selection of a date range. Defaults to false.
- **onRangeChange** (`(range: { start: Date | null; end: Date | null }) => void`): Callback function that is called when the date range is changed. It receives the start and end dates as an argument.
- **dateFormat** (`string`): The format in which the date is displayed. Defaults to 'MM/dd/yyyy'.
- **placeholder** (`string`): Placeholder text for the input field. Defaults to 'Select a date'.
- **selectionColor** (`string`): The color used to highlight the selected date. Defaults to '#007bff'.
- **hoverColor** (`string`): The color used when hovering over a date. Defaults to '#0056b3'.
- **className** (`string`): Additional CSS classes to apply to the date picker component.
- **allowPastDate** (`boolean`): If true, the date picker allows selection of past dates. Defaults to false.

## Contributing
If you would like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License
This project is licensed under the MIT License.
