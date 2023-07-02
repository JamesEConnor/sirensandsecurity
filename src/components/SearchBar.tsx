import Select from 'react-select';

import categories from "@/data/categories.json";
import DateInput from './DateInput';

import '@/app/css/searchbar.css';

//Search/Filter by:
//Keyword (This will look for keywords in the title, description, and location name)
//Category
//Date

export default function SearchBar() {
    //Get all of the available category names.
    var catOptions = Object.keys(categories).map(key => {
        var category = categories[key as keyof typeof categories];
        return {"value":category.name, "label":category.name}
    });

    return (
        <form
            onSubmit={ () => { return false } }
            id="search-bar"
            className="w-3/12 inline-flex flex-col items-center bg-white relative p-2"
            style={{ paddingTop: "calc(1.75em + 1rem)" }}
        >
            { /* Header text */ }
            <h1
                className="absolute top-0 left-0 py-2 px-4 text-black font-bold w-full"
                style={{ backgroundColor: "rgba(var(--emphasis-rgb), 0.5)" }}
            >Search</h1>

            { /* The keyword search input */ }
            <div id="search_key" className="relative my-4">
                <input
                    name="search_key"
                    placeholder="Type to search..."
                    className="w-full p-2 rounded bg-white text-black"
                />
            </div>

            { /* The category search input */ }
            <label className="text-black mb-1">Categories</label>
            <Select
                name="search_cats"
                options={ catOptions }
                isMulti
                className="w-3/12 text-black"
                classNamePrefix="select"
                placeholder="Select category..."
                styles={{
                    control: (baseStyle, state) => ({
                        ...baseStyle,
                        borderColor: !state.isFocused ? 'hsl(0,0%,80%)' : 'black !important',
                        boxShadow: 'none'
                    }),
                }}
            />

            { /* The start and end date inputs. */ }
            <label className="text-black mb-1 mt-4">Start Date / End Date</label>
            <DateInput />
        </form>
    );
}