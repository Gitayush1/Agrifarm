import { useLocation } from 'react-router-dom';

export const Bag = () => {
  const location = useLocation();
  
  // Retrieve cart and quantities from location state
  const cart = location.state?.cart || [];
  const quantities = location.state?.quantities || {};

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, crop) => total + crop.price * (quantities[crop.id] || 1), 0);
    return subtotal + 5; // Adding delivery charge
  };

  return (
    <div className="w-full lg:w-2/5 lg:ml-6 mt-8 lg:mt-0">
      <h2 className="text-green-600 text-2xl font-bold mb-4">Your Bag</h2>
      <ul className="divide-y divide-gray-300">
        {cart.map((crop) => (
          <li key={crop.id} className="py-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{crop.name}</h4>
                <p className="text-sm text-gray-500">
                  Quantity: {quantities[crop.id] || 1} | Price: {crop.price} each
                </p>
              </div>
              <p className="font-semibold">
                {crop.price * (quantities[crop.id] || 1)}/-
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <p className="text-lg font-semibold">
          Delivery Charge: <span>5/-</span>
        </p>
        <p className="text-xl font-bold mt-2">
          Total Amount: <span>{calculateTotal()}/-</span>
        </p>
      </div>
    </div>
  );
};
