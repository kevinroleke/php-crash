import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export function Bet() {
    const [cashDisabled, setCashDisabled] = useState(true);
    const [betDisabled, setBetDisabled] = useState(true);
    useEffect(() => {
        axios.get(route('game')).then(d => {
            if (new Date(d.data.bet_deadline) > new Date()) {
                setCashDisabled(true);
                setBetDisabled(false);
            } else if (!d.data.done) {
                setCashDisabled(false);
                setBetDisabled(true);
            } else {
                setCashDisabled(true);
                setBetDisabled(true);
            }
        });

        //@ts-ignore
        window.Pusher = Pusher;
        let e = new Echo({
            broadcaster: 'reverb',
            key: import.meta.env.VITE_REVERB_APP_KEY,
            wsHost: import.meta.env.VITE_REVERB_HOST,
            wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
            wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
            forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
        });
        e.channel('game').listen('.NewGame', (c: any) => {
            setBetDisabled(false);
        });
        e.channel('game').listen('.GameEnd', (c: any) => {
            setCashDisabled(true);
        });
        e.channel('game').listen('.BetsClosed', (c: any) => {
            setBetDisabled(true);
            setCashDisabled(false);
        });
    }, []);
    const [amount, setAmount] = useState();

    const place = () => {
        setBetDisabled(true);
        axios.put(route('bet'), {amount})
    };

    const cash = () => {
        setCashDisabled(true);
        axios.post(route('bet'))
    };

    return (
        <div className="flex flex-col p-5 rounded-xl h-full">
            <Input min="1" type="number" placeholder="Amount" value={amount} onChange={e => setAmount(parseFloat(e.target.value))} />
            <Button className="mt-1" disabled={betDisabled} type='submit' onClick={place} variant={'secondary'}>Place Bet</Button>
            <Button className="mt-1" disabled={cashDisabled} variant={'secondary'} onClick={cash}>Cashout</Button>
        </div>
    );
}
