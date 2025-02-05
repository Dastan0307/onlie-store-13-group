import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../features/slices/productSlice'
import GradeIcon from '@mui/icons-material/Grade';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material'

const DetailsProduct = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const { productById, loading, error } = useSelector((state) => state.products)

	useEffect(() => {
		dispatch(getProductById(id))
	}, [id])

	if (error) return <div>Продукт по ID не найден</div>

  return (
	<div style={{width: '1000px', padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
		<img src={productById.image} alt="error :)" width={300} />
		<div style={{marginLeft: '100px'}}>
			<h2>{productById.title}</h2>
			<h3 style={{marginTop: '20px'}}>Price: <span style={{color: '#ecb90d'}}>{productById.price}</span> сом</h3>
			<p style={{marginTop: '20px'}}>{productById.description}</p>

			<p style={{marginTop: '20px'}}>Категория: {productById.category}</p>
			<p style={{width: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<GradeIcon color='warning' />
				{productById.rating?.rate}
			</p>
			<Button variant="contained" endIcon={<ShoppingCartIcon />} sx={{padding: '10px 15px', marginTop: '30px'}}>
			 	Добавить в корзину
			</Button>
		</div>
	</div>
  )
}

export default DetailsProduct