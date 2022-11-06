import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/Authprovider';

const CheckOut = () => {
    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handlePlaceOrder = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        fetch('https://genius-car-server-beta-gold.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('Order placed successfully')
                    form.reset();
                }
            })
            .catch(er => console.error(er));
    }

    return (
        <form onSubmit={handlePlaceOrder}>
            <h4 className="text-4xl">You are about to Order: {title}</h4>
            <h4 className="text-3xl">Price: {price}</h4>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <input name='firstName' type="text" placeholder="First Name" className="input input-bordered w-full " />
                <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered w-full " />
                <input name='phone' type="text" placeholder="Your Phone" className="input input-bordered w-full " />
                <input name='email' type="text" placeholder="Your Email" defaultValue={user?.email} className="input input-bordered w-full" readOnly />
            </div>
            <textarea name='message' className="textarea textarea-bordered h-24 w-full" placeholder="Your Message"></textarea>
            <input className='btn btn-primary' type="submit" value="Place Your Order" />
        </form>
    );
};

export default CheckOut;