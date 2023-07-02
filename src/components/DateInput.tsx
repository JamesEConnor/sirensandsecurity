import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import '@/app/css/searchbar.css';

export default function DateInput() {
    //States for handling dates.
    const [startDate, setStartDate] = useState(new Date("1970/01/01"));
    const [endDate, setEndDate] = useState(new Date());
    
    return (
        <span id="search_date" className="relative flex flex-col mb-4 z-0">
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="p-2 z-10"
            />
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="p-2 z-10"
            />
        </span>
    );
}