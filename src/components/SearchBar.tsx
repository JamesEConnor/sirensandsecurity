import Select from 'react-select';

import categories from "@data/categories";
import DateInput from '@components/DateInput';

import '@css/searchbar.css';

//Search/Filter by:
//Keyword (This will look for keywords in the title, description, and location name)
//Category
//Date

export default function SearchBar(props: { updateSearch:(id?:string, key?:string, cat?:string, startDate?:string, endDate?:string)=>{} }) {
    //Get all of the available category names.
    var catOptions = Object.keys(categories).map(key => {
        var category = categories[key as keyof typeof categories];
        return {"value":key, "label":category.name}
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
                style={{ backgroundColor: "rgb(var(--accent-rgb))" }}
            >Search</h1>

            { /* The keyword search input */ }
            <div id="search_key" className="relative my-4">
                <input
                    name="search_key"
                    placeholder="Type to search..."
                    className="w-full p-2 rounded bg-white text-black"
                    onChange={ e => props.updateSearch(undefined, e.target.value, undefined, undefined, undefined) }
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
                onChange={ cats => props.updateSearch(undefined, undefined, cats.join('|'), undefined, undefined) }
            />

            { /* The start and end date inputs. */ }
            <label className="text-black mb-1 mt-4">Start Date / End Date</label>
            <DateInput updateSearch={ props.updateSearch } />
        </form>
    );
}