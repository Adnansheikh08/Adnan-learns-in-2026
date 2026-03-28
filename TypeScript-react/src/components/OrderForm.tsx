import React, { useState } from 'react'

interface OrderFormProps {
    onSubmit: (data: { name: string; quantity: number }) => void;
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
    const [name, setName] = useState<string>('Masala Dosa');
    const [quantity, setQuantity] = useState<number>(1);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ name, quantity });
    };
  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
            </label>
        </div>
        <div>
            <label>
                Quantity:
                <input
                    type="number"
                    value={quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(e.target.value) || 0)}
                />
            </label>
        </div>
        <button type="submit">Submit</button>
    </form>

  )
}
