import Incident from "@components/Incident";
import SearchBar from "./SearchBar";

export default function IncidentTable(props: {
    incidents:Array<Map<string, {}>>,
    updateSearch:(a?:string, b?:string, c?:string, d?:string)=>{},
    isLoading:boolean,
    error:boolean
}) {

    //For displaying anything other than the results.
    var content = null;

    //Show error, loading, or no results displays.
    if (props.error || props.isLoading || props.incidents.length <= 0) {

        var resultsClass = props.isLoading ? "no-results w-full inline-block p-8 pt-3 loading" : "no-results w-full inline-block p-8 pt-3";
        var resultsImgPath = props.isLoading ? "/icons/loading.png" : "/icons/frown.png";
        var resultsText = "No results found.";

        if (props.error) {
            resultsText = "Error occurred. Make sure you're connected to the internet.";
        } else if (props.isLoading) {
            resultsText = "Loading...";
        }

        content = (
            <tr className={ resultsClass } align="center">
                <td colSpan={5}>
                    <img src={ resultsImgPath } className="block mx-auto h-48" />
                    <p className="text-black text-center font-bold text-xl">{resultsText}</p>
                </td>
            </tr>
        );
    }
    //Show actual data otherwise
    else {
        
        //Create a list of incident elements by looping through
        //the data        
        content = props.incidents.map((entry, i) => {
            return (<Incident
                key={entry[0]}
                rowIdx={i}
                id={entry[0]}
                title={entry[1].title}
                date={entry[1].date}
                category={entry[1].category}
                description={entry[1].description}
                loc={entry[1].loc}
                media={entry[1].media}
            />);
        })
    }

    return (
        <div id="incidents" className="flex justify-around px-4 py-8">
            <SearchBar updateSearch={ props.updateSearch } />

            <table className="incidentTable block w-8/12">
                <thead className="w-full text-black text-left block" style={{backgroundColor: "rgb(var(--accent-rgb))"}}>
                    <tr className="block w-full">
                        <th className="inline-block p-3 w-1/5">ID</th>
                        <th className="inline-block p-3 w-1/5">Category</th>
                        <th className="inline-block p-3 w-1/5">Title</th>
                        <th className="inline-block p-3 w-1/5">Date</th>
                        <th className="inline-block p-3 w-1/5">Location</th>
                    </tr>
                </thead>
                <tbody className="inline-block w-full" style={{backgroundColor: "rgb(var(--light-background-rgb))"}}>
                    {content}
                </tbody>
            </table>
      </div>
    );
}