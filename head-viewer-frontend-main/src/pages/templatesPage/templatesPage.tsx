import { AppHeader, TemplatesTable } from 'widgets';
import { CreateTemplate } from 'futures';

import './styles.scss'

export default function TemplatesPage() {
    return <div className='templates'>
        <AppHeader headerTitle={"Шаблоны"}>
            <CreateTemplate/>
        </AppHeader>
        <TemplatesTable/>
    </div>
}