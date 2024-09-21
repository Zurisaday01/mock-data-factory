import Form from '@/components/Form';
import GeneratedUsersTable from '@/components/GeneratedUsersTable';
import { Button } from '@/components/ui/button';
import { generateUserData } from '@/lib/utils';
import { allLocales } from '@faker-js/faker';
import { FileDown } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { CSVLink } from 'react-csv';

const Generator = () => {
	const [data, setData] = useState<User[]>([]);
	// use to store the users options
	const [region, setRegion] = useState('');
	const [error, setError] = useState([0]);
	const [seed, setSeed] = useState('');
	// states
	const [isEnd, setIsEnd] = useState(false);
	const [resetScroll, setResetScroll] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isNewData, setIsNewData] = useState(false);
	const [areErrorsApplied, setAreErrorsApplied] = useState(false);

	const fetchInitialData = useCallback(() => {
		// Clear the previous data and fetch new data (20 rows initially)
		const newData = generateUserData(
			region as keyof typeof allLocales,
			error[0],
			+seed,
			20 // Initial number of rows
		);
		setData(newData); // Reset data with the new set
		setIsEnd(false); // Reset the end state in case you want to fetch more
		setResetScroll(true); // Reset the scroll position
		setAreErrorsApplied(false);
		setLoading(false);
	}, [region, error, seed]);

	// Infinite scroll - Fetch more data (e.g., 10 rows at a time)
	const handleFetchMoreData = useCallback(() => {
		setAreErrorsApplied(false);
		setTimeout(() => {
			if (!loading) {
				setData(prevData => [
					...prevData,
					...generateUserData(
						region as keyof typeof allLocales,
						error[0],
						+seed,
						10
					),
				]);
				if (data.length >= 1000) setIsEnd(true);
			}
		}, 3000);
	}, [loading, data.length, region, error, seed]);

	useEffect(() => {
		if (region && seed) {
			setTimeout(() => {
				fetchInitialData();
				setTimeout(() => {
					setIsNewData(false);
				}, 500);
			}, 3000);
		}
	}, [region, error, seed, fetchInitialData]);

	useEffect(() => {
		setResetScroll(true);
		if (error[0] > 0 && data.length > 0) {
			setAreErrorsApplied(true);
		}

		if (error[0] === 0 && data.length > 0) {
			setAreErrorsApplied(false);
		}
	}, [data.length, error]);

	useEffect(() => {
		setResetScroll(true);
		if (region && seed) {
			setIsNewData(true);
		}
	}, [region, seed]);

	const handleReset = () => {
		// Clear data as well
		setData([]);
		setRegion('');
		setError([0]);
		setSeed('');

		//reset states
		setIsEnd(false);
		setAreErrorsApplied(false);
		setResetScroll(false);
		setLoading(false);
		setIsNewData(false);
	};

	const csvData = [
		['ID', 'Identifier', 'Name', 'Address', 'Phone'],
		...data.map((user: User, index: number) => [
			index + 1,
			user.randomIdentifier,
			user.fullName,
			user.address,
			user.phone,
		]),
	];

	return (
		<section className='mt-4 flex flex-col gap-2'>
			<div className='flex flex-col items-start sm:flex-row sm:items-center w-full justify-between gap-3'>
				<Form
					setData={setData}
					region={region}
					setRegion={setRegion}
					error={error}
					setError={setError}
					seed={seed}
					setSeed={setSeed}
					setIsEnd={setIsEnd}
					handleReset={handleReset}
				/>
				<Button disabled={loading || isNewData || data.length === 0}>
					<CSVLink
						className='flex items-center gap-2'
						filename='users.csv'
						data={csvData}>
						<FileDown />
						Export to CSV
					</CSVLink>
				</Button>
			</div>

			{data.length === 0 && !isNewData && (
				<div className='flex flex-col justify-center items-center text-center'>
					<p>
						Select your region, adjust the error settings to introduce errors if
						desired, and enter a seed value to start generating your data.
					</p>
					<img
						src='/start-generating.png'
						alt='Start generating'
						className='w-[500px]'
					/>
				</div>
			)}
			{data.length > 0 && !isNewData && (
				<GeneratedUsersTable
					data={data}
					fetchData={handleFetchMoreData}
					isEnd={isEnd}
					resetScroll={resetScroll}
					loading={loading}
				/>
			)}

			{isNewData && <p className='w-full text-center'>Loading new data...</p>}
			{areErrorsApplied && !isEnd && (
				<p className='w-full text-center'>Applying errors...</p>
			)}
		</section>
	);
};
export default Generator;
