import React from 'react';
import Link from 'next/link';
import {
	TableCell,
	TableHead,
	TableBody,
	TableRow,
	Table,
	TableContainer,
	Button,
	Menu,
	Fade,
	MenuItem,
	IconButton,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { Member, MemberStatus, MemberType } from '../../../types/member/member';
import { REACT_APP_API_URL } from '@/libs/config';
import { FaqObj } from '@/libs/types/faq/faq';
import moment from 'moment';
import { Trash } from 'phosphor-react';

interface Data {
	order: string;
	id: string;
	question: string;
	category: string;
	date: string;
	action: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = 'asc' | 'desc';

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'order',
		numeric: true,
		disablePadding: false,
		label: 'No',
	},
	{
		id: 'id',
		numeric: true,
		disablePadding: false,
		label: 'ID',
	},
	{
		id: 'question',
		numeric: false,
		disablePadding: false,
		label: 'QUESTION',
	},
	{
		id: 'category',
		numeric: false,
		disablePadding: false,
		label: 'CATEGORY',
	},
	{
		id: 'date',
		numeric: true,
		disablePadding: false,
		label: 'DATE',
	},
	{
		id: 'action',
		numeric: false,
		disablePadding: false,
		label: 'ACTION',
	}
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { onSelectAllClick } = props;

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						style={{ color: "white" }}
						colSpan={headCell.label === "QUESTION" ? 2 : 1}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}


export const FaqList = (props: any) => {
	const { faqList, deleteTargetFaqHandler } = props;

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{faqList.map((faq: FaqObj, index: number) => {
							return (
								<TableRow hover key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align="center">
										{index + 1}
									</TableCell>
									<TableCell align="center">
										{faq._id}
									</TableCell>
									<TableCell align="center" colSpan={2}>
										{faq.faqQuestion}
									</TableCell>
									<TableCell align="center">
										{faq.faqCategory}
									</TableCell>
									<TableCell align="center">
										{moment(faq.createdAt).format("DD MMMM, YYYY")}
									</TableCell>
									<TableCell align="center">
										<IconButton onClick={(e: any) => deleteTargetFaqHandler(e, faq._id)}>
											<Trash />
										</IconButton>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
