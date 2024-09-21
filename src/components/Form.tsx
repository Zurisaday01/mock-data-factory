import { Label } from './ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

interface FormProps {
	setData: React.Dispatch<React.SetStateAction<User[]>>;
	region: string;
	setRegion: React.Dispatch<React.SetStateAction<string>>;
	error: number[];
	setError: React.Dispatch<React.SetStateAction<number[]>>;
	seed: string;
	setSeed: React.Dispatch<React.SetStateAction<string>>;
	setIsEnd: React.Dispatch<React.SetStateAction<boolean>>;
	handleReset: () => void;
}

const Form = ({
	region,
	setRegion,
	error,
	setError,
	seed,
	setSeed,
	handleReset,
}: FormProps) => {

	// HANDLERS
	const handleRegionChange = (value: string) => setRegion(value);
	const handleErrorChange = (value: number[]) => setError(value);
	const handleSeedChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setSeed(event.target.value);



	return (
		<form className='flex flex-col sm:flex-row gap-4 flex-1 w-full'>
			{/* REGION */}
			<div className='flex-1'>
				<Label htmlFor='region'>Region</Label>
				<Select name='region' value={region} onValueChange={handleRegionChange}>
					<SelectTrigger className='w-full mt-2'>
						<SelectValue placeholder='Select a region' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='es_MX'>Mexico</SelectItem>
						<SelectItem value='fr'>France</SelectItem>
						<SelectItem value='ru'>Russia</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* ERROR */}
			<div className='flex-1'>
				<Label htmlFor='error'>Error</Label>

				<div className='flex items-center gap-2'>
					<Slider
						onValueChange={handleErrorChange}
						className='mt-2'
						value={error}
						max={10}
						step={0.5}
					/>
					<span className='mt-2 w-[25px]'>{error}</span>
				</div>
			</div>

			{/* SEED  */}
			<div className='flex-1'>
				<Label htmlFor='seed'>Seed</Label>
				<Input
					className='w-full mt-2'
					type='number'
					id='seed'
					name='seed'
					placeholder='Enter seed (e.g., 42)'
					value={seed}
					onChange={handleSeedChange}
				/>
			</div>

			<div className='self-center'>
				<Button
					type='reset'
					className='flex items-center justify-center'
					variant='ghost'
					onClick={handleReset}>
					<RotateCcw className='w-8' />
				</Button>
			</div>
		</form>
	);
};
export default Form;
