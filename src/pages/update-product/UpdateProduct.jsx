import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import './UpdateProcut.css'
import { updateProduct } from '../../features/slices/productSlice'

const UpdateProduct = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const product = useSelector(state => state.products.products.find(product => product.id == id))

	const [image, setImage] = useState(product.image)
	const [title, setTitle] = useState(product.title)
	const [price, setPrice] = useState(product.price)
	const [description, setDescription] = useState(product.description)


	const handleUpdateProduct = () => {
		const newProduct = {
			id: product.id,
			image,
            title,
            price,
            description,
			category: product.category,
			rating: {
				count: 120,
				rate: 2.4
			}
		}

		dispatch(updateProduct(newProduct))
		navigate('/products')
	}
	

  return (
	<div className='block'>
		<TextField id="outlined-basic" label="Image" value={image} variant="outlined" onChange={(e) => setImage(e.target.value)} className='inp' />
		<TextField id="outlined-basic" label="Title" value={title} variant="outlined" onChange={(e) => setTitle(e.target.value)} className='inp' />
		<TextField id="outlined-basic" label="Price" value={price} variant="outlined" onChange={(e) => setPrice(e.target.value)} className='inp' />
		<TextField id="outlined-basic" label="Description" value={description} variant="outlined" onChange={(e) => setDescription(e.target.value)} className='inp' />
		<Button variant="contained" className='btn' onClick={handleUpdateProduct}>Изменить</Button>
	</div>
  )
}

export default UpdateProduct