
const navItems=document.querySelectorAll('.nav-item');
const mainContentArea=document.getElementById('main_content');
const homeContent=document.getElementById('home-content').innerHTML;


navItems.forEach(item=>{

item.addEventListener('click',()=>{

    navItems.forEach(navitem=>navitem.classList.remove('active'))

    item.classList.add('active')

    if(item.innerText=='Home'){
        mainContentArea.innerHTML=homeContent;
       
       
    }

   else if(item.innerText=='Products'){
        
        const spinner=`<span class="loading loading-spinner loading-xl"></span>`
        mainContentArea.innerHTML=spinner;

        mainContentArea.innerHTML=`<div class="my-6">
            <div id='category-container' class='w-1/3 mx-auto flex justify-center mt-5 gap-2' > </div>
            <div id='product-container' class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-y-4 gap-x-3 mt-5 lg:px-40 sm:px-2 "></div>
        </div>`;
        productCategory();
         productItem();
       
    }
    else if(item.innerText=='About'){
        mainContentArea.innerHTML=''
        
    }
   else if(item.innerText=='Contact'){
        mainContentArea.innerHTML=''
    }
});

});


const productCategory=async()=>{

        const category = await fetch('https://fakestoreapi.com/products/categories')
        const data =await category.json()
         displayProductCategory(data)
     

}


const displayProductCategory = (categorys) => {
    
    const productcategory = document.getElementById('category-container');

    const allbtn = document.createElement('button');
    allbtn.className = 'btn btn-outline btn-primary activeP';
    allbtn.textContent = 'All';
    allbtn.addEventListener('click', () => {
         productcategory.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('activeP');
        });

        allbtn.classList.add('activeP');

        productItem('all')
        
    });
    productcategory.append(allbtn);

    categorys.forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.className = 'btn btn-outline btn-primary';
        categoryBtn.textContent = category;
        categoryBtn.addEventListener('click', () => {
              productcategory.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('activeP');
        });

        categoryBtn.classList.add('activeP');
            productItem(category)});
        productcategory.append(categoryBtn);
    });

   
};




const productItem=async(category='all')=>{

    if(category=="all"){
         const url=await fetch('https://fakestoreapi.com/products')
       const  data=await url.json()
       displayProduct(data)
    }

    else{
         const url=await fetch(`https://fakestoreapi.com/products/category/${category}`)
        const data=await url.json()
       displayProduct(data)
    }
     

       

};

const displayProduct=(data)=>{

    const productContainer=document.getElementById('product-container')
     productContainer.innerHTML=''
    const products=data;

    products.forEach(product => {

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
         productContainer.append(itemdiv)
// <button class="btn" onclick="my_modal_5.showModal()">open modal</button> 

        
    });
    
};


const productDetails=async(id)=>{
       const url=await fetch(`https://fakestoreapi.com/products/${id}`);
        const data=await url.json();
       displayDetails(data)
};

const displayDetails=(product)=>{
    
            const detaisContainer=document.getElementById('modal-content');
            const itemdiv=document.createElement('div');
            
             itemdiv.innerHTML=`<div class="card bg-base-100 w-auto shadow-sm p-4">
                                   
                                    <div class="card-body h-60">
                                        <div class="flex justify-between ">
                                            <span class="bg-purple-400 text-white border p-1 rounded-full"> ${product.category} </span>
                                            <span><i class="fa-solid fa-star" style="color: rgba(255, 212, 59, 1);"></i> ${product.rating.rate} (${product.rating.count}) </span>
                                        </div>
                                        <h2 class="card-title">${product.title}</h2>
                                        <p class="text-sm opacity-65">${product.description}</p>
                                        <p class="text-lg font-bold">$ ${product.price}</p>
                                        
                                    </div>
                                </div>`
         detaisContainer.append(itemdiv)




}




productDetails()
;

