import Incident from "@components/Incident";
import SearchBar from "./SearchBar";

export default function IncidentTable(props: {
    incidents:Array<Map<string, {}>>,
    updateSearch:(a?:string, b?:string, c?:string, d?:string)=>{}
}) {
    return (
        <div id="incidents" className="flex justify-around px-4 py-8">
            <SearchBar updateSearch={ props.updateSearch } />

            <table id="incidentTable" className="block w-8/12">
                <thead className="text-black text-left" style={{backgroundColor: "rgb(var(--accent-rgb))"}}>
                    <tr>
                    <th className="p-3 w-1/5">ID</th>
                    <th className="p-3 w-1/5">Category</th>
                    <th className="p-3 w-1/5">Title</th>
                    <th className="p-3 w-1/5">Date</th>
                    <th className="p-3 w-1/5">Location</th>
                    </tr>
                </thead>
                <tbody style={{backgroundColor: "rgb(var(--light-background-rgb))"}}>
                    {
                    //Create a list of incident elements by looping through
                    //the data.
                    props.incidents.map((entry, i) => {
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
                    })}
                </tbody>
            </table>
      </div>
    );
}