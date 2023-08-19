import { incidents } from "@data/incidents"
import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  //Get the query parameters.
  const { searchParams } = new URL(request.url);

  //Priority is given to searching for a single ID.
  //If the ID is found, the response will default to this.
  if (searchParams.has('id')) {
    var id = searchParams.get('id') as keyof typeof incidents;
    var incident = incidents[id];

    if (incident != null) {
      return NextResponse.json([[id, incident]], {status: 200});
    }
  }





  //Get categories to use in filtering.
  var categoriesStr = searchParams.get('cat');
  var categories = (categoriesStr != null && categoriesStr != '') ? categoriesStr.split('|') : [];

  //Get dates to use in filtering.
  var startDate:Date, endDate:Date;

  var startStr = searchParams.get('startDate');
  startDate = (startStr != null) ? new Date(startStr) : new Date(1970, 1, 1);
  var endStr = searchParams.get('endDate');
  endDate = (endStr != null) ? new Date(endStr) : new Date();


  //Get property to use in sorting.
  var sortBy = '';
  var sortByParam = searchParams.get('sort');
  if (sortByParam == null || !['id', 'category', 'title', 'date'].includes(sortByParam)) {
    sortBy = 'id';
  } else {
    sortBy = sortByParam;
  }




  //Loop through each incident.
  var result = Object.entries(incidents).filter(entry => {
    var incident = entry[1];

    //Allow searching by category.
    if (searchParams.has('cat')) {
      if (categories.length > 0 && !categories?.includes(incident.category)) {
        return false;
      }
    }

    //Allow searching by date.
    if (searchParams.has('startDate') || searchParams.has('endDate')) {
      var chkDate = new Date(incident.date);

      if (chkDate < startDate || chkDate > endDate) {
        return false;
      }
    }

    //Allow searching by keyword.
    var keyphrase = searchParams.get('key');
    if (keyphrase != null) {
      keyphrase = keyphrase.toLowerCase();

      if (!incident.title.toLowerCase().includes(keyphrase) &&
      !incident.description.toLowerCase().includes(keyphrase)) {
        return false;
      }
    }

    return true;
  })
  .sort((a, b) => {

    //Sort by ID.
    if (sortBy == 'id') {
      if (a[0] <= b[0]) {
        return -1;
      }
      else {
        return 1;
      }
    }
    //Sort by a property.
    else {
      if (a[1][sortBy] <= b[1][sortBy]) {
        return -1;
      }
      else {
        return 1;
      }
    }
  });

  

  //All else fails, return empty set.
  return NextResponse.json(result, {status: 200});
}
