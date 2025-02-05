import DeleteIcon from '@mui/icons-material/Delete'
import MenuIcon from '@mui/icons-material/Menu'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../features/slices/productSlice.js'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Link } from 'react-router-dom'

const ProductsPage = () => {
	const { products, loading, error } = useSelector(state => state.products)
	const dispatch = useDispatch()
	const [isOpen, setIsOpen] = useState(false)
	const [search, setSearch] = useState('')

	useEffect(() => {
		dispatch(fetchProducts())
	}, [])

	const filterProducts = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))

	if (error) return <div>Продукты не найдены</div>

	return (
		<>
			<TextField
				id='outlined-basic'
				label='Поиск...'
				variant='outlined'
				sx={{ width: 1440, marginTop: '40px', marginLeft: '40px' }}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-around',
				}}
			>
				{filterProducts.map(product =>
					loading ? (
						<Stack
							spacing={1}
							key={product.id}
							sx={{ width: 430, height: 400, marginTop: '40px' }}
						>
							<Skeleton variant='rounded' width={430} height={170} />
							<Skeleton variant='rectangular' width={310} height={30} />
							<Skeleton variant='rectangular' width={117} height={20} />
							<Skeleton variant='rectangular' width={430} height={30} />
						</Stack>
					) : (
						<Card
							sx={{
								width: 430,
								height: 500,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								marginTop: '40px',
								padding: '10px 0',
							}}
							key={product.id}
						>
							<CardMedia
								component='img'
								alt='green iguana'
								height='200'
								image={product.image}
								sx={{ objectFit: 'contain' }}
							/>
							<CardContent>
								<Typography gutterBottom variant='h5' component='div'>
									<Link to={`/details-product/${product.id}`}>
										{product.title}
									</Link>
								</Typography>
								<Typography
									variant='body2'
									sx={{ color: 'text.secondary', fontSize: '20px' }}
								>
									<strong>Price:</strong> {product.price}
								</Typography>
							</CardContent>
							<CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
								{isOpen ? (
									<>
										<Button
											variant='outlined'
											color='error'
											startIcon={<DeleteIcon />}
											sx={{marginRight: '15px'}}
										>
											Удалить
										</Button>
										<Button
											color='secondary'
											startIcon={<ModeEditOutlineIcon />}
										>
											Изменить
										</Button>
										<MenuOpenIcon sx={{ marginRight: '20px', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)} />
									</>
								) : (
									<MenuIcon sx={{ marginRight: '20px', cursor: 'pointer', marginBottom: '12px' }} onClick={() => setIsOpen(!isOpen)} />
								)}
							</CardActions>
						</Card>
					)
				)}
			</div>
		</>
	)
}

export default ProductsPage
