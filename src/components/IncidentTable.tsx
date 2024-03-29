import IncidentTableRow, { IncidentDetails } from "@/components/IncidentTableRow";
import SearchBar from "./SearchBar";
import { incidentType, searchUpdateFunctionType } from "@/types/customtypes";
import Image from "next/image";
import { PATH } from "@/types/envvars";
import { Fragment } from "react";

export default function IncidentTable(props: {
    incidents:Array<Array<string|{}>>,
    updateSearch:searchUpdateFunctionType,
    isLoading:boolean,
    error:boolean
}) {

    //For displaying anything other than the results.
    var content = null;

    //Show error, loading, or no results displays.
    if (props.error || props.isLoading || props.incidents.length <= 0) {

        var resultsClass = "no-results w-full inline-flex flex-col justify-center items-center p-8 pt-3"
        if (props.isLoading) { resultsClass += " loading" }
        var resultsImgPath = props.isLoading ? "/icons/loading.png" : "/icons/frown.png";
        var resultsText = "No results found.";

        if (props.error) {
            resultsText = "Error occurred. Make sure you're connected to the internet.";
        } else if (props.isLoading) {
            resultsText = "Loading...";
        }

        content = (
            <tr key="table-non-results" className={ resultsClass }>
                <td colSpan={5}>
                    <Image
                        src={ PATH(resultsImgPath) }
                        alt=""
                        width={192}
                        height={192}
                        className="block mx-auto h-48"
                    />
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

            var id = entry[0] as string;
            var details = entry[1] as incidentType;

            //The content row.
            var rowEl = (<IncidentTableRow
                rowIdx={i}
                id={id}
                incident={details}
                updateSearch={ props.updateSearch } 
            />);

            //If this is the only element, show some details as well.
            var detailsEl = (props.incidents.length == 1 ?
                <IncidentDetails
                    rowIdx={i}
                    id={id}
                    incident={details}
                    updateSearch={ props.updateSearch } 
                /> : null);

            //Return both elements.
            return (
                <Fragment key={"fragment-" + id + "-" + i}>
                    {rowEl}
                    {detailsEl}
                </Fragment>
            )
        })
    }


    var tBodyClasses = "inline-block w-full";
    if (props.incidents.length == 1) {
        tBodyClasses += " rounded-md"
    }

    return (
        <div id="incidents" className="relative flex justify-around px-4 py-8">
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
                <tbody className={tBodyClasses} style={{backgroundColor: "rgb(var(--light-background-rgb))"}}>
                    {content}
                </tbody>
            </table>
      </div>
    );
}