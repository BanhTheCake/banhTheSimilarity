const revokeApiKey = async () => {
    const res = await fetch('api/key/revoke', {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data);
    }

    return data as string;
};

export default revokeApiKey;
