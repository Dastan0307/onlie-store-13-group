import { Routes, Route } from 'react-router-dom'
import MainPage from '../pages/main/MainPage'
import ProductsPage from '../pages/products/ProductsPage'
import NotFoundPage from '../pages/not-found/NotFoundPage'
import CartPage from '../pages/cart/CartPage'
import DetailsProduct from '../pages/details-products/DetailsProduct'
import UpdateProduct from '../pages/update-product/UpdateProduct'

const routes = [
	{
		id: 1,
		path: '/',
		element: <MainPage />
	},
	{
		id: 2,
		path: 'products',
		element: <ProductsPage />
	},
	{
		id: 3,
		path: 'cart',
		element: <CartPage />
	},
	{
		id: 4,
		path: 'details-product/:id',
		element: <DetailsProduct />
	},
	{
		id: 5,
		path: 'update-product/:id',
		element: <UpdateProduct />
	},
	{
		id: 6,
		path: '*',
		element: <NotFoundPage />
	}
]

const RoutesApp = () => {
  return (
	<Routes>
		{routes.map(route => (
			<Route key={route.id} path={route.path} element={route.element} />
		))}
	</Routes>
  )
}

export default RoutesApp

