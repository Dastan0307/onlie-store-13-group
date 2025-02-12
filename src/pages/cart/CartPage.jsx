import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, decrementQuantity, incrementQuantity, removeFromCart } from '../../features/slices/cartSlice'
import './CartPage.css'

const CartPage = () => {
	const { items } = useSelector(state => state.cart)
	const dispatch = useDispatch()

	let sum = items.reduce((prev, item) => prev + item.price * item.quantity, 0)
	

	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Фото</TableCell>
							<TableCell align='right'>Название</TableCell>
							<TableCell align='right'>Цена</TableCell>
							<TableCell align='right'>Категория</TableCell>
							<TableCell align='right'>Рейтинг</TableCell>
							<TableCell align='right'>Количество</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{items.map(item => (
							<TableRow
								key={item.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th' scope='row'>
									<img src={item.image} alt='error' style={{ width: '50px' }} />
								</TableCell>
								<TableCell align='right'>{item.title}</TableCell>
								<TableCell align='right'>{item.price}</TableCell>
								<TableCell align='right'>{item.category}</TableCell>
								<TableCell align='right'>{item.rating.rate}</TableCell>
								<TableCell align='right'>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'flex-end',
											alignItems: 'center',
											marginRight: '-75px',
										}}
									>
										<Button 
											sx={{ color: 'black', fontSize: '18px' }}
											onClick={() => dispatch(incrementQuantity(item.id))}
										>+</Button>
										<span style={{ fontSize: '17px' }}>{item.quantity}</span>
										<Button sx={{ color: 'black', fontSize: '18px' }}
										onClick={() => dispatch(decrementQuantity(item.id))}>-</Button>
									</div>
								</TableCell>
								<TableCell align='right'>
									<DeleteIcon
										color='error'
										style={{ cursor: 'pointer' }}
										onClick={() => dispatch(removeFromCart(item.id))}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{items.length > 0 && (
				<div
					style={{
						height: '60px',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '0 15px'
					}}
				>
					<p style={{fontSize: '20px', color: '18px'}}>
						Общая сумма: {Math.ceil(sum)} сом
					</p>
					<Button
						variant='outlined'
						color='error'
						startIcon={<DeleteIcon color='error' />}
						onClick={() => dispatch(clearCart())}
					>
						Очистить корзину
					</Button>
				</div>
			)}
		</>
	)
}
export default CartPage
