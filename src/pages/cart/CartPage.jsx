import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useSelector } from 'react-redux'
import './CartPage.css'

const CartPage = () => {
	const { items } = useSelector(state => state.cart)


	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Название</TableCell>
						<TableCell align='right'>Цена</TableCell>
						<TableCell align='right'>Категория</TableCell>
						<TableCell align='right'>Количество</TableCell>
						<TableCell align='right'>Рейтинг</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{items.map(row => (
						<TableRow
							key={row.name}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component='th' scope='row'>
								{row.title}
							</TableCell>
							<TableCell align='right'>{row.price}</TableCell>
							<TableCell align='right'>{row.category}</TableCell>
							<TableCell align='right'>{row.rating.count}</TableCell>
							<TableCell align='right'>{row.rating.rate}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
export default CartPage
