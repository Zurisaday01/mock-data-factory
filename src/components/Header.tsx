import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Header = () => {
	return (
		<nav className='bg-white py-2 md:py-4'>
			<div className='container px-4 mx-auto flex justify-between items-center '>
				<div className='flex justify-between items-center'>
					<Link to='/' className='font-bold font-mont text-xl text-primary'>
						Mock
						<span className='text-secondary'>Data</span>
						Factory
					</Link>
				</div>

				<Button asChild variant='ghost'>
					<Link to='#' className='text-primary'>
						<Github />
					</Link>
				</Button>
			</div>
		</nav>
	);
};
export default Header;
