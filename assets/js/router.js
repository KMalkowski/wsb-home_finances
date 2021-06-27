export default [
    {
        name: "App",
        path: "/",
        component: () =>
            import("./components/App"),
    },
    {
        name: "AddExpense",
        path: "/addExpense",
        component: () =>
            import("./components/AddExpense"),
    },
];