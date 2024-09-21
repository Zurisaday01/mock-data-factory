import { Button } from '@/components/ui/button';
import { useMoveBack } from '@/hooks/use-move-back';

const PageNotFound = () => {
	const moveBack = useMoveBack();
	return (
		<section className='bg-secondary/20 h-screen flex flex-col gap-3 items-center justify-center text-center p-4'>
			<h1 className='text-2xl font-mont'>
				The page you are looking for could not be found
			</h1>
			<img src='/not-found.png' alt='Page not found' />
			<Button onClick={moveBack}>Go back</Button>
		</section>
	);
};
export default PageNotFound;
