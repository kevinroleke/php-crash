import Countdown from './countdown';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';

export function Game() {
    const [multiplier, setMultiplier] = useState(100);
    const [multiplierColor, setMutliplierColor] = useState('text-stone-500');
    const [game, setGame] = useState<any>(null);

    useEffect(() => {
        axios.get(route('game')).then(d => {
            setGame(d.data);
            if (d.data.done) {
                setMultiplier(d.data.multiplier);
                setMutliplierColor('text-red-500');
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
            setGame(c);
            setMultiplier(100);
            setMutliplierColor('text-stone-500');
        });
        e.channel('game').listen('.GameEnd', (c: any) => {
            setMutliplierColor('text-red-500');
            setMultiplier(c.game.multiplier);
            setGame(c.game);
        });
        e.channel('game').listen('.BetsClosed', (c: any) => {
            setMultiplier(100);
        });
    }, []);

    useEffect(() => {
        const t = setInterval(() => {
            if (game == null) return;
            if (game.done) return;
            const ms = +(new Date()) - +(new Date(game!.bet_deadline));
            if (!ms) return;
            setMultiplier(100+ms/100);
        }, 100);

        return () => clearInterval(t);
    }, [game]);

    if (game == null) return;

    return (
        <div className="bg-background items-center justify-center flex flex-col p-5 rounded-xl h-full w-full">
            { new Date(game.bet_deadline) > new Date() ?
                <h1 style={{fontSize: '13rem'}}><Countdown targetDate={new Date(game.bet_deadline)} onFinish={() => {}} /></h1>
                :
                <h1 style={{fontSize: '13rem'}} className={multiplierColor}>{(multiplier/100).toFixed(2)}x</h1>
            }
        </div>
    );
}
