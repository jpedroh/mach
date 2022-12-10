import GeneralLayout from '../src/layouts/GeneralLayout';
import Lead from '../src/components/Lead';
import SearchFlightsForm from '../src/components/SearchFlightsForm';

export default function Page() {
    return <GeneralLayout>
        <Lead>To begin, fill at least one of the following fields.</Lead>
        <SearchFlightsForm />
    </GeneralLayout>
}