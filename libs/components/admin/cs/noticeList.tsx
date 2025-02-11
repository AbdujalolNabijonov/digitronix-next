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
import { Trash } from 'phosphor-react';
import moment from 'moment';
import { Notice } from '@/libs/types/notice/notice';

interface Data {
	order: string;
	id: string;
	title: string;
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
		label: 'NO',
	},
	{
		id: 'id',
		numeric: true,
		disablePadding: false,
		label: 'ID',
	},
	{
		id: 'title',
		numeric: false,
		disablePadding: false,
		label: 'TITLE',
	},
	{
		id: 'date',
		numeric: true,
		disablePadding: false,
		label: 'DATE',
	},
	{
		id: 'action',
		numeric: true,
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
						align={"center"}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						style={{ color: "white" }}
						colSpan={headCell.label === "TITLE" ? 2 : 1}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

export const NoticeList = (props: any) => {
	const { notices,deleteTargetNoticeHandler } = props
	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{notices.map((notice: Notice, index: number) => {
							return (
								<TableRow hover key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align="center">{index+1}</TableCell>
									<TableCell align="center">{notice._id}</TableCell>
									<TableCell align="center" colSpan={2}>{notice.noticeContent}</TableCell>
									<TableCell align="center">{moment(notice.createdAt).format("DD MMMM, YYYY")}</TableCell>
									<TableCell align="center">
										<IconButton onClick={(e:any)=>deleteTargetNoticeHandler(notice._id)}>
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
