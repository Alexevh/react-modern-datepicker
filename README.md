# React Modern Date Picker

## Description
A modern date picker component for React applications.

## Installation
To install the package, run:
```bash
npm install react-mdp
```

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


## Contributing
If you would like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License
This project is licensed under the MIT License.
