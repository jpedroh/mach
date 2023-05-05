import GeneralLayout from "../src/layouts/GeneralLayout";
import Lead from "../src/components/Lead";
import SearchFlightsForm from "../src/components/SearchFlightsForm";
import { fetchCompanies } from "../src/services/fetch-companies";
import { fetchAircraftIcaoCodes } from "../src/services/fetch-aircraft-icao-codes";
import { fetchAirports } from "../src/services/fetch-airports";

export const revalidate = 3600;

export const metadata = {
  title: 'Mach'
}

export default async function Page() {
  const companies = await fetchCompanies();
  const airports = await fetchAirports();
  const aircraftIcaoCodes = await fetchAircraftIcaoCodes();

  return (
    <GeneralLayout>
      <Lead>To begin, fill at least one of the following fields.</Lead>
      <SearchFlightsForm
        airports={airports}
        companies={companies}
        aircraftIcaoCodes={aircraftIcaoCodes}
      />
    </GeneralLayout>
  );
}
