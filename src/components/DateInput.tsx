import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import '@css/searchbar.css';

import { searchUpdateFunctionType } from '@/types/customtypes';

export default function DateInput(props: {updateSearch:searchUpdateFunctionType}) {
    //States for handling dates.
    const [startDate, setStartDate] = useState(new Date("1970/01/01"));
    const [endDate, setEndDate] = useState(new Date());
    
    return (
        <span id="search_date" className="relative flex flex-col mb-4 z-0">
            <DatePicker
                selected={startDate}
                onChange={(date) => {
                    if (date != null) {
                        setStartDate(date);
                        props.updateSearch(undefined, undefined, undefined, date.toLocaleDateString(), undefined);
                    }
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="p-2 z-10"
            />
            <DatePicker
                selected={endDate}
                onChange={(date) => {
                    if (date != null) {
                        setEndDate(date);
                        props.updateSearch(undefined, undefined, undefined, undefined, date.toLocaleDateString());
                    }
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="p-2 z-10"
            />
        </span>
    );
}