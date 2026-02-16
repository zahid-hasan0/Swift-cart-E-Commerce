// Repository: Create your own public repository and submit the link. 🛍️ API Endpoints Get 🛍️ All Products https://fakestoreapi.com/products 
// Get 🛍️ All Categories https://fakestoreapi.com/products/categories Get
//  🛍️ Products by Category https://fakestoreapi.com/products/category/${category}
//  Example: https://fakestoreapi.com/products/category/jewelery
//  Get 🛍️ Single Product Detail https://fakestoreapi.com/products/${id} 
// Example: https://fakestoreapi.com/products/1



const trendingProducts=async()=>{

        const category = await fetch('https://fakestoreapi.com/products/category/jewelery')
        const data =await category.json()
         displayTrending(data)
     

}
 const displayTrending=(trends)=>{
    const products=trends;
    const trendContainer=document.getElementById('trendin-container')
    products.forEach(product=>{
  const itemdiv=document.createElement('div');

        itemdiv.innerHTML=`<div class="card bg-base-100 p-2 h-auto w-96 shadow-sm">
                                <figure class="bg-orange-50">
                                    <img class="h-56 w-56 p-2"
                                    src="${product.image}"
                                    alt="Shoes" />
                                </figure>
                                <div class="card-body h-60">
                                    <div class="flex justify-between ">
                                        <span class="bg-purple-100 text-purple-500 border py-1 px-2 rounded-full"> ${product.category} </span>
                                        <span><i class="fa-solid fa-star" style="color: rgba(255, 212, 59, 1);"></i> ${product.rating.rate} (${product.rating.count}) </span>
                                    </div>
                                    <h2 class="card-title">${product.title}</h2>
                                    <p class="text-lg font-bold">$ ${product.price}</p>
                                    <div class="card-actions justify-between">
                                        <button class="btn btn-outline btn-primary" onclick="my_modal_5.showModal(); productDetails('${product.id}')"> <i class="fa-solid fa-eye"></i>  Details</button>
                                        
                                        <button class="btn btn-primary" onclick="productDetails('${product.id}"> <i class="fa-solid fa-cart-shopping text-white"></i> Add</button>
                                    </div>
                                </div>
                                </div>`

                                trendContainer.append(itemdiv)

    })
   
 }

 trendingProducts();