import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import axios from 'axios';

export function Bet() {
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex flex-col p-5 rounded-xl h-full">
            <Input type="number" placeholder="Amount" />
            <Button className="mt-1" variant={'secondary'}>Place Bet</Button>
            <Button className="mt-1" variant={'secondary'}>Cashout</Button>
        </div>
    );
}
