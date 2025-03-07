import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';

export function Bet() {
    const [amount, setAmount] = useState(0);

    const place = () => {
        axios.put(route('bet'), {amount})
    };

    const cash = () => {
        axios.post(route('bet'))
    };

    return (
        <div className="flex flex-col p-5 rounded-xl h-full">
            <Input min="1" type="number" placeholder="Amount" value={amount} onChange={e => setAmount(parseFloat(e.target.value))} />
            <Button className="mt-1" type='submit' onClick={place} variant={'secondary'}>Place Bet</Button>
            <Button className="mt-1" variant={'secondary'} onClick={cash}>Cashout</Button>
        </div>
    );
}
