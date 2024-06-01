import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./store";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "./auth-provider";

const store = setupStore()

export const withRouter = (component: () => React.ReactNode) => () => (
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <NextUIProvider>
                    <AuthProvider>
                        {component()}
                    </AuthProvider>
                </NextUIProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
