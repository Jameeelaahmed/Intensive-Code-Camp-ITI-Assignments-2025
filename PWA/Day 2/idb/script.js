//**
// create local DB
// create tables
// add data inside tanles
// retrieve data
// update data
// delete
// search */

//* create db
var dbPromise
document.getElementById('createDbBtn').addEventListener('click', event => {
    dbPromise = idb.open('store', 3, db => {
        if (!db.objectStoreNames.contains('Products')) {
            db.createObjectStore('Products', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('orders')) {
            db.createObjectStore('orders', { keyPath: 'id' })
        }
        const store = db.transaction.objectStore('Products');
        store.createIndex('name', 'name', { unique: true })
    }) //open or create db
})


document.getElementById('createTableBtn').addEventListener('click', event => {
    dbPromise.then(db => {
        var items = [
            {
                name: 'Couch',
                id: 'cch-blk-ma',
                price: 499.99,
                color: 'black',
                material: 'mahogany',
                description: 'A very comfy couch',
                quantity: 3
            },
            {
                name: 'Armchair',
                id: 'ac-gr-pin',
                price: 299.99,
                color: 'grey',
                material: 'pine',
                description: 'A plush recliner armchair',
                quantity: 7
            },
            {
                name: 'Stool',
                id: 'st-re-pin',
                price: 59.99,
                color: 'red',
                material: 'pine',
                description: 'A light, high-stool',
                quantity: 3
            },
            {
                name: 'Chair',
                id: 'ch-blu-pin',
                price: 49.99,
                color: 'blue',
                material: 'pine',
                description: 'A plain chair for the kitchen table',
                quantity: 1
            },
            {
                name: 'Dresser',
                id: 'dr-wht-ply',
                price: 399.99,
                color: 'white',
                material: 'plywood',
                description: 'A plain dresser with five drawers',
                quantity: 4
            },
            {
                name: 'Cabinet',
                id: 'ca-brn-ma',
                price: 799.99,
                color: 'brown',
                material: 'mahogany',
                description: 'An intricately-designed, antique cabinet',
                quantity: 11
            }
        ]
        const tx = db.transaction('Products', 'readwrite')
        const store = tx.objectStore('Products')
        Promise.all(items.map(item => {
            return store.add(item)
        })).then(() => {
            console.log('item added successfully')
        }).catch(err => {
            console.log(err);
            tx.abort()
        })
    })
})
document.getElementById('createOrderTableBtn').addEventListener('click', event => {
    dbPromise.then(db => {
        var orderItems = [
            {
                name: 'Cabinet',
                id: 'ca-brn-ma',
                price: 799.99,
                color: 'brown',
                material: 'mahogany',
                description: 'An intricately-designed, antique cabinet',
                quantity: 7
            },
            {
                name: 'Armchair',
                id: 'ac-gr-pin',
                price: 299.99,
                color: 'grey',
                material: 'pine',
                description: 'A plush recliner armchair',
                quantity: 3
            },
            {
                name: 'Couch',
                id: 'cch-blk-ma',
                price: 499.99,
                color: 'black',
                material: 'mahogany',
                description: 'A very comfy couch',
                quantity: 3
            }
        ];
        const Otx = db.transaction('orders', 'readwrite')
        const store2 = Otx.objectStore('orders')

        Promise.all(orderItems.map(item => {
            return store2.add(item)
        })).then(() => {
            console.log('item added successfully')
        }).catch(err => {
            console.log(err);
            Otx.abort()
        })
    })
})


document.getElementById('searchBtn').addEventListener('click', event => {
    var inputVal = document.getElementById('searchInput').value
    dbPromise.then(db => {
        var tx = db.transaction('Products', 'readonly')
        var productsStore = tx.objectStore('Products')
        var indexer = productsStore.index('name');
        return indexer.get(inputVal)
    }).then(obj => {
        console.log(obj);
        var p = document.createElement('p');
        p.innerHTML = "name: " + obj['name'] + '\n' + 'price: ' + obj['price'];
        document.body.appendChild(p);
    })
})

document.getElementById('displayOrders').addEventListener('click', event => {
    getOrders()
        .then(obj => {
            console.log(obj);
            var orderdiv = document.getElementById('orders');
            Promise.all(obj.map(order => {
                var p = document.createElement('p');
                p.innerHTML = order['name'] + '<br>'
                orderdiv.appendChild(p);
            }))
        })

})

function getOrders() {
    return dbPromise.then(db => {
        var tx = db.transaction('orders', 'readonly');
        var orders = tx.objectStore('orders')
        return orders.getAll()
    })
}

document.getElementById('appOrdBtn').addEventListener('click', event => {
    getOrders()
        .then(orders => {
            return processOrders(orders)
        }).then(listProducts => {
            UpdateProducts(listProducts)
        })
})

function processOrders(orders) {
    return dbPromise.then(db => {
        var tx = db.transaction('Products', 'readonly');
        var productStore = tx.objectStore('Products');
        return Promise.all(orders.map(order => {
            return productStore.get(order.id).then(product => {
                return checkQuantity(product, order)
            })
        })).catch(err => {
            tx.abort;
        })
    })
}

function checkQuantity(product, order) {
    return new Promise(function (resolve, reject) {
        var qItem = product.quantity - order.quantity;
        if (qItem < 0) {
            reject('out of stock')
        } else {
            var item = product;
            item.quantity = qItem;
            resolve(item)
        }
    })
}

function UpdateProducts(products) {
    dbPromise.then(db => {
        var tx = db.transaction(['Products', 'orders'], 'readwrite');
        var store = tx.objectStore('Products');
        var orderStore = tx.objectStore('orders');
        Promise.all(products.map((product) => {
            return store.put(product);
        })).catch(err => {
            tx.abort()
        }).then(() => {
            console.log('Product updated successfuly');
            // ! Clear Orders 
            return orderStore.clear();
        })
    })
}


