import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "../features/auth/adminAuthSlice";
import userAuthReducer from "../features/auth/userAuthSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import votedReducer from "../features/voted/votedSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
const store = configureStore({
    reducer:{
        userAuth:userAuthReducer,
        adminAuth:adminAuthReducer,
        categories : categoriesReducer,
        voteds:votedReducer,
        dashboards : dashboardReducer
    }
})

export default store;