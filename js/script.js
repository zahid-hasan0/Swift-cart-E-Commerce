
const navItems = document.querySelectorAll('.nav-item');
const mainContentArea = document.getElementById('main_content');
const homeContent = document.getElementById('home-content').innerHTML;


navItems.forEach(item => {

    item.addEventListener('click', () => {

        navItems.forEach(navitem => navitem.classList.remove('active'))

        item.classList.add('active')

        if (item.innerText == 'Home') {
            mainContentArea.innerHTML = homeContent;


        }

        else if (item.innerText == 'Products') {



            mainContentArea.innerHTML = `<div class="my-6">
            <div id='category-container' class='w-full lg:w-1/3 mx-auto flex flex-wrap justify-center mt-5 gap-2' > </div>
            <div id='product-container' class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-y-4 gap-x-3 mt-5 lg:px-40 px-2 "></div>
        </div>`;
            productCategory();
            productItem();

        }
        else if (item.innerText == 'About') {
            mainContentArea.innerHTML = `
                 <div class="bg-sky-100 w-11/12 lg:w-2/4 h-96 flex justify-center items-center flex-col my-20 mx-auto rounded-xl p-4">
                 <i class="fa-solid fa-circle-info fa-2xl " style="color: rgba(211, 16, 16, 1.00);"></i>
            <h1 class="text-3xl text-center my-8">About page under construction </h1>
            <p>Plese select some other  tab to visit </p>
         </div>

        
        `

        }
        else if (item.innerText == 'Contact') {
            mainContentArea.innerHTML = `
        
        <div class="flex flex-col items-center justify-center my-16 h-fit">

        <h1 class="text-4xl my-2 text-violet-500"> Please contact Us</h1>
        
                    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-sm h-auto border p-10 ">

                    <label class="label">Email</label>
                    <input type="email" class="input" placeholder="Email" />

                    <label class="label">Password</label>
                    <input type="password" class="input" placeholder="Password" />

                    <button class="btn btn-neutral mt-4">submit</button>
                    </fieldset>
        </div>
         
        
        `
        }
    });

});


const productCategory = async () => {
    const category = await fetch('https://fakestoreapi.com/products/categories')
    const data = await category.json()
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
            productItem(category)
        });
        productcategory.append(categoryBtn);
    });


};




const productItem = async (category = 'all') => {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = `
        <div class="flex justify-center items-center h-40 col-span-4">
            <span class="loading loading-spinner loading-lg"></span>
        </div>
    `;

    if (category == "all") {
        const url = await fetch('https://fakestoreapi.com/products')
        const data = await url.json()
        displayProduct(data)
    }

    else {
        const url = await fetch(`https://fakestoreapi.com/products/category/${category}`)
        const data = await url.json()
        displayProduct(data)
    }




};

const displayProduct = (data) => {

    const productContainer = document.getElementById('product-container')
    productContainer.innerHTML = ''
    const products = data;

    products.forEach(product => {

        const itemdiv = document.createElement('div');

        itemdiv.innerHTML = `<div class="card bg-base-100 p-2 h-auto w-full sm:w-96 shadow-sm">
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
                                        <button class="btn btn-outline btn-primary" onclick="productDetails('${product.id}')"> <i class="fa-solid fa-eye"></i>  Details</button>
                                        
                                        <button class="btn btn-primary add-to-cart" > <i class="fa-solid fa-cart-shopping text-white"></i> Add to cart</button>
                                    </div>
                                </div>
                                </div>`
        itemdiv.querySelector('.add-to-cart').addEventListener('click', () => {
            addToCArt(product);
        });

        productContainer.append(itemdiv)



    });

};


const productDetails = async (id) => {
    my_modal_5.showModal();
    document.getElementById('modal-content').innerHTML = `
        <div class="flex justify-center items-center h-40">
            <span class="loading loading-spinner loading-lg"></span>
        </div>
    `;

    const url = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await url.json();
    displayDetails(data)
};

const displayDetails = (product) => {

    const detaisContainer = document.getElementById('modal-content');
    detaisContainer.innerHTML = '';
    const itemdiv = document.createElement('div');
    detaisContainer.innerHTML = ''
    itemdiv.innerHTML = `<div class="card bg-base-100 w-auto shadow-sm p-4">
                                   
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





let cart = [];
const addToCArt = (product) => {

    let existid = cart.find(item => item.id === product.id);
    console.log(existid);

    if (!existid) {
        cart.push(product);
        alert("Item added Successfully")
    }
    else {
        alert("item already added cart please check")
    }
    const badgeCount = document.getElementById('badge-cart');
    badgeCount.innerText = cart.length;


};


const displayCart = () => {


    const cartContainer = document.createElement('div')
    cartContainer.classList = 'grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-y-4 gap-x-3 mt-5 lg:px-40 px-2'

    mainContentArea.innerHTML = '';
    if (cart.length === 0) {
        mainContentArea.innerHTML = `

         <div class="bg-sky-100 w-2/4 h-96 flex justify-center items-center flex-col my-14 mx-auto rounded-xl">
            <h1 class="text-3xl text-center">No Item Found </h1>
            <p>Plese select some item to cart and order </p>
         </div>
         
         
         `
    }
    else {

        const header = document.createElement('h1');
        header.className = 'text-4xl text-purple-500 text-center my-5';
        header.innerText = 'My Cart';
        mainContentArea.append(header);
        cart.forEach(product => {
            const itemdiv = document.createElement('div');

            itemdiv.innerHTML = `<div class="card bg-base-100 p-2 h-auto w-full sm:w-96 shadow-sm">
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
                                        <button class="btn btn-outline btn-primary w-full" onclick="productDetails('${product.id}')"> <i class="fa-solid fa-eye"></i>  Details</button>
                                        
                                    </div>
                                </div>
                                </div>`
            cartContainer.append(itemdiv);
            mainContentArea.append(cartContainer);



        })

    }




}


