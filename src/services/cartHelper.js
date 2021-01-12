export const addCartItem = (item, next) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
    }
    cart.push({
        ...item
    })

    localStorage.setItem('cart', JSON.stringify(cart));
    next();
}

export const getOrderBodyFromCart = () => {
    let cart = getCart();
    cart.forEach(item => {
        delete item.drinkName;
        item.drinkPriceId = item.drinkPriceId.id;
        item.toppingId = item.toppingId ? item.toppingId.id : null;
    });
    console.log(cart)
    return JSON.stringify(cart);
}


export const getCartLength = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }

    return 0;
}
export const getTotalPrice = () => {
    let cart;
    let total = 0;
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            cart.forEach(item => {
                total += item.quantity * item.drinkPriceId.price + (item.toppingId ? item.toppingId.price : 0);
            });
        }
        return total;
    }

    return 0;
}


export const updateItem = (productId, count) => {

    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count;
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
};

export const removeItem = productId => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1);
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
};

export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
};

export const emptyCart = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
        next();
    }
};

