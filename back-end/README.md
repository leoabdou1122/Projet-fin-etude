# back-end

# user API's

to create a user => http://localhost:3001/user/register
for log in => http://localhost:3001/user/login
authentication => http://localhost:3001/user/authentication
gett all users => http://localhost:3001/user/allUsers

# Products API's

create a product => http://localhost:3001/Products //data in the body
get all products => http://localhost:3001/Products
get Product by id => http://localhost:3001/Products/${id}
get Product by category => http://localhost:3001/Products/category/${category}
get product Sorted => http://localhost:3001/products/sorted/order?sort=${sort}&order=${order}
update a product =>http://localhost:3001/Products/${id} //data in the body
delete a product => http://localhost:3001/Products/${id}

# Category API's

get all categories => http://localhost:3001/category
get a category by id => http://localhost:3001/category/${id}
get category sorted => http://localhost:3001/category/sorted/order?order=${order} 'ASC or DESC'
create a category => http://localhost:3001/category //data in the body
to delete a category => http://localhost:3001/category/${id}
to update a category => http://localhost:3001/category/${id} //data in the body

# Cart API's

get the user cart => http://localhost:3001/cart/${userID}
delete from cart by productID and userID => http://localhost:3001/cart/${productID}/${userID}
add to the cart => http://localhost:3001/cart
