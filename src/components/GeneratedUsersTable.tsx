import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface GeneratedUsersTableProps {
	data: User[];
	fetchData: () => void;
	isEnd: boolean;
	resetScroll: boolean;
	loading: boolean;
}

const GeneratedUsersTable = ({
	data,
	fetchData,
	isEnd,
	resetScroll,
	loading,
}: GeneratedUsersTableProps) => {
	// Create a ref for the scrollable container
	const scrollRef = useRef<HTMLDivElement>(null);

	// Effect to reset scroll when resetScroll prop changes
	useEffect(() => {
		if (resetScroll && scrollRef.current) {
			scrollRef.current.scrollTo({ top: -10, behavior: 'smooth' });
		}
	}, [resetScroll]);
	return (
		<ScrollArea
			className='w-full whitespace-nowrap rounded-md border'
			ref={scrollRef}>
			<InfiniteScroll
				scrollThreshold={0}
				dataLength={data.length}
				next={fetchData}
				hasMore={!isEnd && !loading}
				className='overflow-x-auto'
				height={720}
				loader={<p className='w-full text-center mt-4'>Loading...</p>}
				endMessage={
					<p className='w-full text-center mt-4'>No more data to load.</p>
				}>
				<Table className='bg-white text-[12px]'>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px] font-bold'>ID</TableHead>
							<TableHead>Identifier</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Address</TableHead>
							<TableHead>Phone</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{data.map((user, index) => (
							<TableRow key={index + user.randomIdentifier}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{user.randomIdentifier}</TableCell>
								<TableCell
									style={{
										backgroundColor: user?.errorsFields?.includes('fullName')
											? 'rgb(254 202 202)'
											: 'transparent',
									}}>
									{user.fullName}
								</TableCell>
								<TableCell
									style={{
										backgroundColor: user?.errorsFields?.includes('address')
											? 'rgb(254 202 202)'
											: 'transparent',
									}}>
									{user.address}
								</TableCell>
								<TableCell
									style={{
										backgroundColor: user?.errorsFields?.includes('phone')
											? 'rgb(254 202 202)'
											: 'transparent',
									}}>
									{user.phone}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</InfiniteScroll>
		</ScrollArea>
	);
};
export default GeneratedUsersTable;
