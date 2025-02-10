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
import { REACT_APP_API_URL } from '@/libs/config';
import { Product } from '@/libs/types/product/product';
import { ProductStatus } from '@/libs/enum/product.enum';
import { numberSplitterHandler } from '@/libs/features/splitter';
import { useRouter } from 'next/router';

interface Data {
	label: string;
	id: string;
	title: string;
	price: string;
	retailer: string;
	category: string;
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
		id: 'label',
		numeric: false,
		disablePadding: false,
		label: 'LABEL',
	},
	{
		id: 'id',
		numeric: true,
		disablePadding: false,
		label: 'PRODUCT ID',
	},
	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'TITLE',
	},
	{
		id: 'price',
		numeric: true,
		disablePadding: false,
		label: 'PRICE',
	},
	{
		id: 'retailer',
		numeric: false,
		disablePadding: false,
		label: 'RETAILER',
	},
	{
		id: 'category',
		numeric: false,
		disablePadding: false,
		label: 'CATEGORY',
	},
	{
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'STATUS',
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
	products: Product[];
	anchorEl: any;
	menuIconClickHandler: any;
	menuIconCloseHandler: any;
	updateProductHandler: any;
}

export const ProductList = (props: MemberPanelListType) => {
	const { products, anchorEl, menuIconClickHandler, menuIconCloseHandler, updateProductHandler } = props;
	const router = useRouter()
	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{products.length === 0 && (
							<TableRow>
								<TableCell align="center" colSpan={8} style={{ color: "white" }}>
									<span className={'no-data'}>data not found!</span>
								</TableCell>
							</TableRow>
						)}
						{products.length !== 0 &&
							products.map((product: Product, index: number) => {
								const member_image = product.productImages[0]
									? `${REACT_APP_API_URL}/${product.productImages[0]}`
									: '/img/profile/defaultUser.svg';
								return (
									<TableRow hover key={product?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell align="center">{product.productLabel ?? "-"}</TableCell>
										<TableCell align="left">{product._id}</TableCell>

										<TableCell align="left" className={'name'}>
											<Stack direction={'row'} alignItems={"center"}>
												<Button onClick={()=>{
													router.push(`/products/detail?id=${product?._id}`)
												}} disabled={!(product.productStatus===ProductStatus.ACTIVE)}>
													<div>
														<Avatar alt="Remy Sharp" src={member_image} sx={{ ml: '2px', mr: '10px' }} />
													</div>
												</Button>
												<div>{product.productName}</div>
											</Stack>
										</TableCell>

										<TableCell align="center">{numberSplitterHandler(product.productPrice, 3, ",")}₩</TableCell>
										<TableCell align="left">{product.memberData?.memberNick}</TableCell>
										<TableCell align="left">{product.productCategory}</TableCell>
										<TableCell align="center">
											<Button onClick={(e: any) => menuIconClickHandler(e, index)} style={{ backgroundColor: 'gray' }}>
												{product.productStatus}
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
												{Object.values(ProductStatus)
													.filter((ele) => ele !== product?.productStatus)
													.map((status: string) => (
														<MenuItem
															onClick={() => updateProductHandler({ _id: product?._id, productStatus: status })}
															key={status}
														>
															<Typography variant={'subtitle1'} component={'span'}>
																{status}
															</Typography>
														</MenuItem>
													))}
											</Menu>
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
