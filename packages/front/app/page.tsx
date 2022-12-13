import GeneralLayout from '../src/layouts/GeneralLayout';
import Lead from '../src/components/Lead';
import SearchFlightsForm from '../src/components/SearchFlightsForm';
import { fetchCompanies } from '../src/services/fetch-companies';

export default async function Page() {
    const companies = await fetchCompanies()

    return <GeneralLayout>
        <Lead>To begin, fill at least one of the following fields.</Lead>
        <SearchFlightsForm companies={companies} />
    </GeneralLayout>
}