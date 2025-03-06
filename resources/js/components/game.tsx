import Countdown from './countdown';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export function Game() {
    const [multiplier, setMultiplier] = useState(100);
    const [multiplierColor, setMutliplierColor] = useState('text-stone-500');
    const [countdown, setCountdown] = useState<Date | null>(null);
    const [tick, setTick] = useState(false);

    useEffect(() => {
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
            setMultiplier(100);
            setMutliplierColor('text-stone-500');
            setCountdown(new Date(c.bet_deadline));
        });
        e.channel('game').listen('.GameEnd', (c: any) => {
            setMutliplierColor('text-red-500');
            setMultiplier(c.game.multiplier);
            setTick(false);
        });
        e.channel('game').listen('.BetsClosed', (c: any) => {
            setCountdown(null);
            setMultiplier(100);
            setTick(true);
        });
    }, []);

    useEffect(() => {
        if (tick) {
            const t = setInterval(() => {
                setMultiplier(prev => prev + 1);
            }, 100);

            return () => clearInterval(t);
        }
    }, [tick]);

    return (
        <div className="bg-background items-center justify-center flex flex-col p-5 rounded-xl h-full w-full">
            { countdown !== null ?
                <h1 style={{fontSize: '13rem'}}><Countdown targetDate={countdown} onFinish={() => setCountdown(null)} /></h1>
                :
                <h1 style={{fontSize: '13rem'}} className={multiplierColor}>{(multiplier/100).toFixed(2)}x</h1>
            }
        </div>
    );
}
