import { Outlet } from 'react-router';
import Navbar from './../components/Navbar/Navbar';
import Footer from './../components/Footer/Footer';
import { auth, db } from './../config/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import useCartStore from '../store/cartStore';

const Root = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [balance, setBalance] = useState(0);
    const [canteenOpen, setCanteenOpen] = useState(true);
    const cartCount = useCartStore((state) => state.getCartCount?.() || 0);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setIsLoggedIn(true);
                setUser(currentUser);
                
                // Fetch user data from Firestore including balance
                try {
                    const userRef = doc(db, 'users', currentUser.uid);
                    
                    // Real-time listener for user data
                    const unsubscribeSnapshot = onSnapshot(userRef, (doc) => {
                        if (doc.exists()) {
                            const userData = doc.data();
                            setBalance(userData.balance || 500);
                            setIsAdmin(userData.isAdmin || false);
                        } else {
                            // Default balance if user doc doesn't exist yet
                            setBalance(500);
                            setIsAdmin(false);
                        }
                    });

                    return () => unsubscribeSnapshot();
                } catch (err) {
                    console.error('Error fetching user data:', err);
                    setBalance(500);
                }
            } else {
                setIsLoggedIn(false);
                setUser(null);
                setIsAdmin(false);
                setCartCount(0);
                setBalance(0);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className='mx-auto'>
            <Navbar 
                isLoggedIn={isLoggedIn} 
                isAdmin={isAdmin} 
                cartCount={cartCount} 
                balance={balance} 
                canteenOpen={canteenOpen}
                user={user}
            />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;