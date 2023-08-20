import { incidentType, incidentsResultType, loadFunctionProps, loadReturnFunction } from "@/types/customtypes"


//Loads incidents based on search parameters.
export function loadIncidents(
    search:loadFunctionProps,
    returnFunc:loadReturnFunction,
    errorFunc:(error:any)=>void
) {

    search.keyphrase = search.keyphrase.toLowerCase();
    var searchCats:Array<string> = search.category.split('|');
    var query_str = `${search.keyphrase}|${search.category}|${search.startDate}|${search.endDate}`;
    
    //Makes call to backend incidents API using search parameters.
    //To use debug entries, add "debug: 'true'" to end.
    fetch('/api/incidents')
    //Transforms response into JSON
    .then(res => res.json())
    .then(
      //When successful, updates a lot of state info.
      (result:Map<string, incidentType>) => {

        var finalResult:incidentsResultType = [];
        
        Object.entries(result).forEach((incident) => {
            console.log(incident);

            var id = incident[0];
            var details = incident[1] as incidentType;

            //Matching ID takes precedence.
            if (search.debug || !id.startsWith("9999")) {
              if (search.id != undefined && id == search.id) {
                  finalResult.push([id, details]);
              }
              else if(
                  (search.category == "" || searchCats.includes(details.category)) &&
                  (search.startDate == undefined || new Date(details.date) >= search.startDate) &&
                  (search.endDate == undefined || new Date(details.date) <= search.endDate) &&
                  (search.keyphrase == '' ||
                  details.title.toLowerCase().includes(search.keyphrase) ||
                  details.description.toLowerCase().includes(search.keyphrase))
              ) {
                  finalResult.push([id, details]);
              }
            }
        })

        //Return the final results.
        returnFunc(query_str, finalResult);
      },
      //When unsuccessful, displays an error screen (also by updating state)
      (error) => {
        errorFunc(error)
      }
    )
  }