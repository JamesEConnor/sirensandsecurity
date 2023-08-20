import { incidents } from "@data/incidents"
import { NextResponse } from "next/server";


export async function GET(request: Request, response: Response) {
  return NextResponse.json(incidents, {status: 200});
}