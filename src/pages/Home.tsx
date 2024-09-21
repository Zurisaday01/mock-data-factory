import { Button } from '@/components/ui/button';
import { CheckCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<section className='flex flex-col mt-20 gap-12'>
			<div className='flex flex-col items-center text-center gap-3'>
				<h1 className='text-5xl font-mont'>
					Welcome to Mock
					<span className='text-secondary'>Data</span>Factory
				</h1>
				<p className='text-secondary text-xl'>
					Generate realistic user data in seconds!{' '}
				</p>
				<p className='max-w-[900px] w-full'>
					MockDataFactory allows you to create customized random user data based
					on regions, including names, addresses, and phone numbers. Whether you
					need data for testing, development, or simulations.
				</p>
				<Button>
					<Link to='/generator'>Get Started</Link>
				</Button>
			</div>

			<div>
				<h2 className='text-3xl font-mont underline decoration-4 underline-offset-4 decoration-secondary mb-5'>
					Features
				</h2>
				<ul className='flex flex-col gap-3'>
					<li className='flex gap-2 items-center'>
						<CheckCheck className='w-8 text-secondary' />
						Select from multiple regions.
					</li>
					<li className='flex gap-2 items-center'>
						<CheckCheck className='w-8 text-secondary' />
						Adjust error rates to simulate real-world inaccuracies.
					</li>
					<li className='flex gap-2 items-center'>
						<CheckCheck className='w-8 text-secondary' />
						Seed-based random generation for consistent results.
					</li>
					<li className='flex gap-2 items-center'>
						<CheckCheck className='w-8 text-secondary' />
						Infinite scrolling for easy data navigation.
					</li>
					<li className='flex gap-2 items-center'>
						<CheckCheck className='w-8 text-secondary' />
						Export data in CSV format.
					</li>
				</ul>
			</div>
			<div>
				<h2 className='text-3xl font-mont underline decoration-4 underline-offset-4 decoration-secondary mb-4'>
					Errors logic
				</h2>
				<p className='mb-5'>
					The error logic defines how modifications are applied to user data
					based on a specified error rate.
				</p>

				<ul className='flex flex-col gap-3'>
					<li>
						<strong>0</strong>: No errors are introduced for any user. All data
						remains unchanged.
					</li>
					<li>
						<strong>0.5</strong>: Each user has a 50% chance of receiving an
						error. This means for each user, you randomly decide whether to
						apply an error or not. About half of the users will end up with an
						error.
					</li>
					<li>
						<strong>1</strong>: Each user will receive exactly one error. This
						means for every user, you will apply an error modification to one of
						their fields.
					</li>
					<li>
						<strong>1.5</strong>: Each user will receive one error, plus there’s
						a 50% chance of getting an additional error. After applying the
						first error, you check if you should apply a second one based on a
						random draw—if the draw passes (50% chance), the user will get one
						more error.
					</li>
					<li>
						<strong>2</strong>: Each user will receive exactly two errors. This
						means you will apply two error modifications to the user’s fields,
						regardless of any random factors.
					</li>
					<li>
						<strong>2.5</strong>: Each user will receive two errors, with a 50%
						chance of getting an additional error. After applying two errors,
						you again check if you should add a third error based on a random
						draw—if it passes, the user will get one more error.
					</li>
				</ul>
			</div>
			<div>
				<h2 className='text-3xl font-mont underline decoration-4 underline-offset-4 decoration-secondary mb-4'>
					Error Types
				</h2>
				<ul className='flex flex-col gap-3'>
					<li>
						<strong>Deletion</strong>: A character from the string is removed
						entirely.
					</li>
					<li>
						<strong>Addition</strong>: A random character is inserted into the
						string at a random position, based on the region.
					</li>
					<li>
						<strong>Swap</strong>: Two adjacent characters in the string are
						exchanged.
					</li>
				</ul>
			</div>
		</section>
	);
};
export default Home;
