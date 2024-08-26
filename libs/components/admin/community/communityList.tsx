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
	Box,
	IconButton,
	Tooltip,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { REACT_APP_API_URL } from '@/libs/config';
import { Article } from '@/libs/types/article/article';
import { ArticleStatus } from '@/libs/enum/article.enu';
import { Delete, OpenInBrowserRounded } from '@mui/icons-material';
import Moment from "react-moment"

interface Data {
	articleId: string;
	title: string;
	category: string;
	writer: string;
	view: string;
	like: string;
	date: string;
	status: string;
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
		id: 'articleId',
		numeric: true,
		disablePadding: false,
		label: 'ARTICLE ID',
	},
	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'TITLE',
	},
	{
		id: 'category',
		numeric: false,
		disablePadding: false,
		label: 'CATEGORY',
	},
	{
		id: 'writer',
		numeric: true,
		disablePadding: false,
		label: 'WRITER',
	},
	{
		id: 'view',
		numeric: false,
		disablePadding: false,
		label: 'VIEW',
	},
	{
		id: 'like',
		numeric: false,
		disablePadding: false,
		label: 'LIKE',
	},
	{
		id: 'date',
		numeric: false,
		disablePadding: false,
		label: 'REGISTER DATE',
	},
	{
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'STATUS',
	},
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
						align={headCell.numeric ? 'left' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						style={{ color: "white" }}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface MemberPanelListType {
	articles: Article[];
	anchorEl: any;
	menuIconClickHandler: any;
	menuIconCloseHandler: any;
	updateArticleHandler: any;
	removeArticleHandler: any;
}

export const CommunityList = (props: MemberPanelListType) => {
	const { articles, anchorEl, menuIconClickHandler, menuIconCloseHandler, updateArticleHandler, removeArticleHandler } = props;

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{articles.length === 0 && (
							<TableRow>
								<TableCell align="center" colSpan={8} style={{ color: "white" }}>
									<span className={'no-data'}>data not found!</span>
								</TableCell>
							</TableRow>
						)}

						{articles.length !== 0 &&
							articles.map((article: Article, index: number) => {
								const member_image = article.articleImage
									? `${REACT_APP_API_URL}/${article.articleImage}`
									: '/img/profile/defaultUser.svg';
								return (
									<TableRow hover key={article?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell align="left">{article._id}</TableCell>
										<TableCell align="left">
											<Box component={'div'} fontSize={"13px"}>
												{article.articleTitle}
												{
													article.articleStatus === ArticleStatus.ACTIVE && (
														<Link
															href={`/community/detail?articleCategory=${article.articleCategory}&id=${article._id}`}
															className={'img_box'}
														>
															<IconButton className="btn_window">
																<Tooltip title={'Open window'}>
																	<OpenInBrowserRounded />
																</Tooltip>
															</IconButton>
														</Link>
													)
												}
											</Box>
										</TableCell>
										<TableCell align="left">{article.articleCategory}</TableCell>
										<TableCell align="left" className={'name'}>
											<Stack direction={'row'} alignItems={"center"}>
												<Link href={`/community?articleId=${article._id}`}>
													<div>
														<Avatar alt="Remy Sharp" src={member_image} sx={{ ml: '2px', mr: '10px' }} />
													</div>
												</Link>
												<Link href={`/comment?articleId=${article._id}`}>
													<div>{article.articleTitle}</div>
												</Link>
											</Stack>
										</TableCell>

										<TableCell align="center">{article.articleViews}</TableCell>
										<TableCell align="left">{article.articleLikes}</TableCell>
										<TableCell align="left">
											<Moment format={'DD.MM.YY HH:mm'}>{article.createdAt}</Moment>
										</TableCell>
										<TableCell align="center">
											{article.articleStatus === 'DELETE' ? (
												<Button
													sx={{ p: '3px', border: 'none', ':hover': { border: '1px solid #000000' } }}
													onClick={() => removeArticleHandler(article._id)}
												>
													<Delete fontSize="small" />
												</Button>
											) : (
												<>
													<Button onClick={(e: any) => menuIconClickHandler(e, index)} style={{ backgroundColor: "gray" }}>
														{article.articleStatus}
													</Button>

													<Menu
														className={'menu-modal'}
														MenuListProps={{
															'aria-labelledby': 'fade-button',
														}}
														anchorEl={anchorEl[index]}
														open={Boolean(anchorEl[index])}
														onClose={menuIconCloseHandler}
														TransitionComponent={Fade}
														sx={{ p: 1 }}
													>
														{Object.values(ArticleStatus)
															.filter((ele) => ele !== article.articleStatus)
															.map((status: string) => (
																<MenuItem
																	onClick={() => updateArticleHandler({ _id: article._id, articleStatus: status })}
																	key={status}
																>
																	<Typography variant={'subtitle1'} component={'span'}>
																		{status}
																	</Typography>
																</MenuItem>
															))}
													</Menu>
												</>
											)}
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
