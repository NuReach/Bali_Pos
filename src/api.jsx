import { collection, getDocs, limit, getAggregateFromServer, getCountFromServer, sum, orderBy, query, where } from 'firebase/firestore';
import { db } from './firebase';

export const fetchProducts = async (key) => {
    let q;
    console.log(key);
    if (key.length === 0) {
      console.log("no key");
       q = query(
        collection(db, "products"),
        orderBy("name", "asc"),
        limit(18)
      );
    } else {
      console.log(" key");
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
    console.log(data);
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