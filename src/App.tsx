import { BrowserRouter, Routes, Route } from 'react-router-dom';

// LAYOUT
import AppLayout from './components/AppLayout';

// PAGE
import Home from './pages/Home';
import Generator from './pages/Generator';
import PageNotFound from './pages/PageNotFound';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AppLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/generator' element={<Generator />} />
				</Route>
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
