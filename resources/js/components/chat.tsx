import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';

const nameColorMapping = {
    'a': 'text-red-50',
    'b': 'text-red-100',
    'c': 'text-red-200',
    'd': 'text-red-400',
    'e': 'text-red-600',
    'f': 'text-red-700',
    'g': 'text-green-600',
    'h': 'text-blue-300',
    'i': 'text-blue-700',
    'j': 'text-blue-800',
    'k': 'text-gray-100',
    'l': 'text-gray-200',
    'm': 'text-gray-300',
    'n': 'text-gray-400',
    'o': 'text-gray-500',
    'p': 'text-gray-600',
    'q': 'text-gray-700',
    'r': 'text-gray-800',
    's': 'text-zinc-900',
    't': 'text-neutral-100',
    'u': 'text-neutral-200',
    'v': 'text-neutral-300',
    'w': 'text-neutral-400',
    'x': 'text-neutral-500',
    'y': 'text-neutral-600',
    'z': 'text-white: #fff',
}

function getColorFromName(name: string) {
    //@ts-ignore
    return nameColorMapping[name.charAt(0).toLowerCase()]!;
}

type ChatForm = {
    message: string;
};

type Message = {
  author: string,
  message: string,
  date: Date,
  id: number,
  isCroupier: boolean,
};

export function Chat() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ChatForm>>({
        message: '',
    });

    const [messages, setMessages] = useState<Message[]>([]);
    const msgBox = useRef(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        axios.post(route('chat'), data).then(() => {
          reset('message');
        });
    };

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
        e.channel('chat').listen('.ChatMessage', (c: any) => {
          setMessages(prevMessages => [...prevMessages, {
              id: c.chat.id,
              author: c.chat.user.name,
              message: c.chat.message,
              date: c.chat.done,
              isCroupier: false,
          }]);
        });
        e.channel('chat').listen('.UpdateBet', (b: any) => {
            if (!b.bet.done) {
              setMessages(prevMessages => [...prevMessages, {
                  id: Math.random(),
                  author: 'Croupier',
                  message: `${b.bet.user.name} placed a bet for $${b.bet.amount}`,
                  date: new Date(),
                  isCroupier: true,
              }]);
            } else {
              setMessages(prevMessages => [...prevMessages, {
                  id: Math.random(),
                  author: 'Croupier',
                  message: `${b.bet.user.name} cashed at ${(b.bet.multiplier/100).toFixed(2)} for $${(b.bet.amount*(b.bet.multiplier/100)).toFixed(2)}`,
                  date: new Date(),
                  isCroupier: true,
              }]);
            }
        });
    }, []);

    useEffect(() => {
      if (msgBox.current) {
          msgBox.current.scrollTop = msgBox.current.scrollHeight;
      }
    }, [messages]);

    return (
        <div className="flex flex-col p-5 rounded-xl h-1000">
            <div ref={msgBox} className="flex-1 overflow-y-scroll">
                { messages.map(msg => (
                  <p key={msg.id} className="mb-1"><span className={getColorFromName(msg.author)}>{msg.author}: </span>{msg.message}<span className="block text-sm text-gray-500">{msg.date.toLocaleString()}</span></p>
                ))}
            </div>
            <form onSubmit={submit} className="flex">
                <Input value={data.message} disabled={processing} onChange={(e) => setData('message', e.target.value)} className="flex-1" type="text" placeholder="Chat Message" />
                <Button type="submit" disabled={processing}>Send</Button>
            </form>
        </div>
    );
}
