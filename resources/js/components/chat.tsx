import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const nameColorMapping = {
    'a': 'text-red',
    'b': 'text-orange',
    'c': 'text-amber',
    'd': 'text-yellow',
    'e': 'text-lime',
    'f': 'text-green',
    'g': 'text-emerald',
    'h': 'text-teal',
    'i': 'text-cyan',
    'j': 'text-sky',
    'k': 'text-blue',
    'l': 'text-indigo',
    'm': 'text-violet',
    'n': 'text-purple',
    'o': 'text-fuchsia',
    'p': 'text-pink',
    'q': 'text-rose',
    'r': 'text-slate',
    's': 'text-gray',
    't': 'text-zinc',
    'u': 'text-pink',
    'v': 'text-neutral',
    'w': 'text-rose',
    'x': 'text-red',
    'y': 'text-fuchsia',
    'z': 'text-stone',
}

function getColorFromName(name: string) {
    //@ts-ignore
    let base: string = nameColorMapping[name.charAt(0).toLowerCase()]!;
    let ch = name.charAt(name.length-1);
    if (ch >= 'v') return `${base}-950`;
    if (ch >= 's') return `${base}-900`;
    if (ch >= 'p') return `${base}-800`;
    if (ch >= 'l') return `${base}-700`;
    if (ch >= 'k') return `${base}-600`;
    if (ch >= 'j') return `${base}-500`;
    if (ch >= 'h') return `${base}-400`;
    if (ch >= 'g') return `${base}-300`;
    if (ch >= 'e') return `${base}-200`;
    if (ch >= 'c') return `${base}-100`;
    if (ch >= 'a') return `${base}-50`;
}

export function Chat() {
    return (
        <div className="bg-background flex flex-col p-5 rounded-xl h-full">
            <div className="flex-1 overflow-y-scroll">
                <p className="mb-1"><span className={getColorFromName('aa')}>User:</span>wsg</p>
                <p className="mb-1"><span className={getColorFromName('aa')}>User:</span>wsg</p>
                <p className="mb-1"><span className={getColorFromName('aa')}>User:</span>wsg</p>
                <p className="mb-1"><span className={getColorFromName('aa')}>User:</span>wsg</p>
                <p className="mb-1"><span className={getColorFromName('aa')}>User:</span>wsg</p>
                <p className="mb-1"><span className={getColorFromName('aa')}>User:</span>wsg</p>
            </div>
            <div className="flex">
                <Input className="flex-1" type="text" placeholder="Chat Message" />
                <Button>Send</Button>
            </div>
        </div>
    );
}
