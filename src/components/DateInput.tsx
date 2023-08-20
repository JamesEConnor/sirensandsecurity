import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import '@css/searchbar.css';

import { searchUpdateFunctionType } from '@/types/customtypes';
import { PATH } from '@/types/envvars';

export default function DateInput(props: {updateSearch:searchUpdateFunctionType}) {
    //Tracks whether this is a client to handle hydration issues
    //with CSS styling.
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])

    //States for handling dates.
    const [startDate, setStartDate] = useState(new Date("1970/01/01"));
    const [endDate, setEndDate] = useState(new Date());
    
    return (
        <span id="search_date" className="relative flex flex-col mb-4 z-0">
            {isClient && <style>
                {`.react-datepicker__input-container:after {
                    background-image: url('${PATH("/icons/calendar.png")}');
                }`}
            </style>}
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