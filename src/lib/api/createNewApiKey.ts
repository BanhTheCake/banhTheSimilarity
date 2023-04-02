import { ApiKeyT } from '@/types/key';

const createNewApiKey = async () => {
    const res = await fetch('api/key/create', {
        method: 'post',
        headers: {
            'content-type': 'application/json',
            accept: 'application/json',
        },
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data);
    }

    return data as ApiKeyT;
};

export default createNewApiKey;
