import { Outlet } from 'react-router-dom';
import Header from './Header';
const AppLayout = () => {
	return (
		<div className='grid grid-rows-[auto_1fr] h-screen'>
			<Header />
			<main className='bg-secondary/20 h-full px-5 overflow-scroll'>
				<div className='max-w-[1400px] mx-auto mb-8'>
					<Outlet />
				</div>
			</main>
		</div>
	);
};
export default AppLayout;
