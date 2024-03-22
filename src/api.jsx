import { collection, getDocs, limit, getAggregateFromServer, getCountFromServer, sum, orderBy, query, where, updateDoc, setDoc, doc, startAfter, endBefore, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';


//navbar product and category
export const fetchProducts = async (key) => {
    let q;
    if (key.length === 0) {
       q = query(
        collection(db, "products"),
        orderBy("name", "asc"),
        limit(18)
      );
    } else {
       q = query(
        collection(db, "products"),
        orderBy("name", "asc"),
        where("category", "==", key.toLowerCase()),
        limit(18)
      );
    }
    
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      ...doc.data()
    }));
    
    return data;
  }
  
export const fetchCategories = async () => {
    const q = query(
      collection(db, "categories"),
      orderBy("name", "asc")
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      ...doc.data()
    }));
    return data;
  }

// cart update product stock and add to cart
export const updateToCart = async (state) => {
  
  const {cart,discount,subTotal,total,payment,user} = state;

  const id = uuidv4();
  const docRef = doc(db, "cart", id);
  try {
    // Save cart details to Firestore
    await setDoc(docRef, {
      id: id,
      cartItems: cart,
      discount: parseFloat(discount),
      subTotal: parseFloat(subTotal),
      payment: payment,
      total: parseFloat(total),
      user: user.username,
      createdAt: Date.now()
    });

    const updateStockPromises = cart.map(async (cartItem) => {
      const productId = cartItem.item.id;
      const updatedStock = parseInt(cartItem.item.stock) - parseInt(cartItem.qty);
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, { stock: updatedStock });
    });
    
    await Promise.all(updateStockPromises);

    const dataToStore = {
      id: id,
      cartItems: cart,
      discount: parseFloat(discount),
      subTotal: parseFloat(subTotal),
      payment: payment,
      total: parseFloat(total),
      user: user.username,
      createdAt: Date.now()
    };
    localStorage.setItem('printData', JSON.stringify(dataToStore));
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error; 
  }
 };

//product page
export const fetchProductWithPagination = async (btn, sortField, sortDir,snapShot,pageSize) => {

  let q;
  if ( btn == "next" && snapShot  ) {
    const lastVisible = snapShot.docs[snapShot.docs.length-1]
    q = query(
      collection(db, "products"),
      orderBy(sortField, sortDir),
      startAfter(lastVisible),
      limit(pageSize)
    );
  }else if(btn == "back" && snapShot){
    const lastVisible = snapShot.docs[0];
    console.log(snapShot.docs.length,pageSize);
    q = query(
      collection(db, "products"),
      orderBy(sortField, sortDir),
      endBefore(lastVisible),
      limit(pageSize)
    );
  }else {
    q = query(
      collection(db, "products"),
      orderBy(sortField, sortDir),
      limit(pageSize)
    );
  }

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map(doc => ({
    ...doc.data(),querySnapshot:querySnapshot
  }));
  return data;
}
 
export const createNewProduct = async (state) => {
  const {name,image,price,cost,discount,category,stock} = state;
      const id = uuidv4();
        try {
          await setDoc(doc(db, "products", id), {
            id: id,
            name: name.toLowerCase(),
            image : image,
            price : parseFloat(price),
            cost : parseFloat(cost),
            discount : parseFloat(discount),
            category : category.toLowerCase(),
            stock : parseInt(stock),
            createdAt: Date.now()
          });
          } catch (error) {
            console.log(error);
        }
}

export const createCategory = async (state) => {
  const {id,categoryName} = state;
  await setDoc(doc(db, "categories", id), {
    id: id,
    name: categoryName,
    createdAt: Date.now(),
  });
}

export const deleteCategory = async (state)=>{
  const {id} = state;
  await deleteDoc(doc(db, "categories", id));
} 
  
export const deleteProduct = async (state)=>{
  const {id} = state;
  await deleteDoc(doc(db, "products", id));
}

export const getProductById = async (id)=>{
  const productRef = doc(db, "products", id); // Reference to the product document
  const productSnap = await getDoc(productRef);
  return productSnap.data();
}

export const updateProductById = async (state)=>{
  const {id,name,image,price,cost,stock,discount,category} =state;
  await updateDoc(doc(db, "products", id), {
    name: name,
    image: image,
    price: parseFloat(price),
    cost: parseFloat(cost),
    stock: parseInt(stock),
    discount: parseFloat(discount),
    category: category.toLowerCase(),
    createdAt : Date.now(),
  })
}

//dashnboard count
export const countProduct = async ()=>{
    const coll = collection(db, "products");
    const q = query(coll);
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  }
  
export const countCategory = async ()=>{
    const coll = collection(db, "categories");
    const q = query(coll);
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  }
  
export const countOrder = async ()=>{
    const coll = collection(db, "cart");
    const q = query(coll);
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  }
  
export const countTodayOrder = async () => {
    const coll = collection(db, "cart");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();
  
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowTimestamp = tomorrow.getTime();
  
    const q = query(coll, where('createdAt',">=", todayTimestamp), where('createdAt',"<=", tomorrowTimestamp));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  }
  
export const countTodayIncome = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowTimestamp = tomorrow.getTime();
    
    const coll = collection(db, "cart");
    const q = query(coll,where('createdAt',">=", todayTimestamp), where('createdAt',"<=", tomorrowTimestamp));
    const snapshot = await getAggregateFromServer(q, {
      totalPrice: sum('total')
    });
    return snapshot.data().totalPrice;
  }
  
export const totalIncome = async ()=>{
    const coll = collection(db, 'cart');
    const q = query(coll);
    const snapshot = await getAggregateFromServer(q, {
      totalPrice: sum('total')
    });
    return snapshot.data().totalPrice;
  }