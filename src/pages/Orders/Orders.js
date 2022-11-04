import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/Authprovider';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5500/orders?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [user?.email]);

    return (
        <div>
            <h2 className="text-5xl">You have {orders.length} orders</h2>
        </div>
    );
};

export default Orders;