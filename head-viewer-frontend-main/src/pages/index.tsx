import { Route, Routes } from "react-router-dom";
import { AppLayout } from "app/layouts";

import IndexPage from "./indexPage";
import AuthPage from "./authPage/authPage";
import AnalyticsPage from "./analyticsPage/analyticsPage";
import OptionsPage from "./optionsPage/optionsPage";
import CandidatePage from "./candidatePage/candidatePage";
import TemplatesPage from "./templatesPage/templatesPage";

export const Routing = () => {
    return (
        <Routes>
            <Route index Component={AuthPage} />
            <Route path="application" Component={AppLayout}>
                <Route index Component={IndexPage} />
                <Route path="analytics" Component={AnalyticsPage} />
                <Route path="options" Component={OptionsPage} />
                <Route path="templates" Component={TemplatesPage} />
                <Route path="candidate/:id" Component={CandidatePage} />
            </Route>
        </Routes>
    );
}