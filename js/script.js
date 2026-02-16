
const navItems=document.querySelectorAll('.nav-item');
const mainContentArea=document.getElementById('main_content');
const homeContent=document.getElementById('home-content').innerHTML;


navItems.forEach(item=>{

item.addEventListener('click',()=>{

    navItems.forEach(navitem=>navitem.classList.remove('active'))


    item.classList.add('active')
    // console.log(item)

    if(item.innerText=='Home'){
        mainContentArea.innerHTML=homeContent;
       
       
    }

   else if(item.innerText=='Products'){
        
        const spinner=`<span class="loading loading-spinner loading-xl"></span>`
        mainContentArea.innerHTML=spinner;

        mainContentArea.innerHTML=`<div>
            <div id='category' class='w-1/3 mx-auto flex justify-center mt-5 gap-2'></div>
            <div id='product-container' class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-y-4 gap-x-3 mt-5 lg:px-40 sm:px-2 "></div>
        </div>`;
        productItem()
    }
    else if(item.innerText=='About'){
        mainContentArea.innerHTML=''
        
    }
   else if(item.innerText=='Contact'){
        mainContentArea.innerHTML=''
    }


})


})

const productCategory=()=>{

     const url=('https://fakestoreapi.com/products/categories')

        fetch(url)
        .then(res=>res.json())
        .then(data=>displayProductCategory(data))

}

const displayProductCategory=(categorys)=>{

    const productcategory=document.getElementById('category')

          categorys.map(category => {
            console.log(category)
        const productContainer=document.getElementById('product-container')

        const categoryheader=document.createElement('div');

        categoryheader.innerHTML=` <button id='' class="btn btn-outline btn-primary">   ${category} </button>`

         productcategory.append(categoryheader)

        
    });

}





const productItem=()=>{

        const url=('https://fakestoreapi.com/products')

        fetch(url)
        .then(res=>res.json())
        .then(data=>displayProduct(data))

}




const displayProduct=(data)=>{

    


    const products=data;

     productCategory()

    products.forEach(product => {

        const productContainer=document.getElementById('product-container')

        const itemdiv=document.createElement('div');

        itemdiv.innerHTML=`<div class="card bg-base-100 p-2 h-auto w-96 shadow-sm">
                                <figure class="bg-orange-50">
                                    <img class="h-56 w-56 p-2"
                                    src="${product.image}"
                                    alt="Shoes" />
                                </figure>
                                <div class="card-body h-60">
                                    <div class="flex justify-between ">
                                        <spnan class="bg-purple-400 text-white border p-1 rounded-full"> ${product.category} </spnan>
                                        <span><i class="fa-solid fa-star" style="color: rgba(255, 212, 59, 1);"></i> ${product.rating.rate} (${product.rating.count}) </span>
                                    </div>
                                    <h2 class="card-title">${product.title}</h2>
                                    <p>$ ${product.price}</p>
                                    <div class="card-actions justify-between">
                                        <button class="btn btn-outline btn-primary"> <i class="fa-solid fa-eye"></i>  Detailse </button>
                                        <button class="btn btn-primary">Buy Now</button>
                                    </div>
                                </div>
                                </div>`
         productContainer.append(itemdiv)

        
    });




    

    
}
