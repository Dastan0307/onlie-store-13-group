import DeleteIcon from '@mui/icons-material/Delete'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
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
import { Link } from 'react-router-dom'
import { deleteProduct, fetchProducts } from '../../features/slices/productSlice.js'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const ITEMS_PER_PAGE = 5

const ProductsPage = () => {
	const { products, loading, error } = useSelector(state => state.products)
	const dispatch = useDispatch()
	const [isOpen, setIsOpen] = useState(false)
	const [search, setSearch] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		dispatch(fetchProducts())
	}, [])

	const filterProducts = products.filter(product =>
		product.title.toLowerCase().includes(search.toLowerCase())
	)

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
	const endIndex = startIndex + ITEMS_PER_PAGE
	const currentProducts = filterProducts.slice(startIndex, endIndex)

	const totalPages = Math.ceil(filterProducts.length / ITEMS_PER_PAGE)

	if (error) return <div>Продукты не найдены</div>

	return (
		<>
			<TextField
				id='outlined-basic'
				label='Поиск...'
				variant='outlined'
				sx={{ width: 1440, marginTop: '40px', marginLeft: '40px' }}
				onChange={e => setSearch(e.target.value)}
			/>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-around',
				}}
			>
				{currentProducts.map(product =>
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
									<Link
										to={`/details-product/${product.id}`}
										style={{ textDecoration: 'none', color: 'black' }}
									>
										{product.title}
									</Link>
								</Typography>
								<Typography
									variant='body2'
									sx={{ color: 'text.secondary', fontSize: '20px' }}
								>
									<strong>Цена:</strong>{' '}
									<span
										style={{
											color: 'orange',
											fontSize: '20px',
											fontWeight: '500',
										}}
									>
										{product.price}
									</span>{' '}
									сом
								</Typography>
							</CardContent>
							<CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
								{isOpen ? (
									<>
										<Button
											variant='outlined'
											color='error'
											startIcon={<DeleteIcon />}
											sx={{ marginRight: '15px' }}
											onClick={() => dispatch(deleteProduct(product.id))}
										>
											Удалить
										</Button>
										<Link to={`/update-product/${product.id}`}>
											<Button
												color='secondary'
												startIcon={<ModeEditOutlineIcon />}
											>
												Изменить
											</Button>
										</Link>
										<MenuOpenIcon
											sx={{ marginRight: '20px', cursor: 'pointer' }}
											onClick={() => setIsOpen(!isOpen)}
										/>
									</>
								) : (
									<MenuIcon
										sx={{
											marginRight: '20px',
											cursor: 'pointer',
											marginBottom: '12px',
										}}
										onClick={() => setIsOpen(!isOpen)}
									/>
								)}
							</CardActions>
						</Card>
					)
				)}
			</div>
			<div style={{width: '130px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '50px auto'}}>
				<button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}><KeyboardDoubleArrowLeftIcon /></button>
				<span>{currentPage} / {totalPages}</span>
				<button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}><KeyboardDoubleArrowRightIcon /></button>
			</div>
		</>
	)
}

export default ProductsPage
