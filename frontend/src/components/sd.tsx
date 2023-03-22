function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route element={(<NavBar />)}>
                        <Route path="/componenta" element={<ComponentA />} />
                        <Route path="/componentb" element={<ComponentB />} />
                    </Route>
                    ... other routes without navbar
                </Routes>
            </div>
        </Router>
    );
}