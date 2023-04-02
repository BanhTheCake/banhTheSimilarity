'use client';

import { ApiKeyT } from '@/types/key';
import React, { useState } from 'react';

type Props = {
    apiKey: ApiKeyT;
};

const DashboardInput = ({ apiKey }: Props) => {
    const [value, setValue] = useState(apiKey.key);

    return (
        <div>
            <p>Your api key: </p>
            <input type="text" value={value} readOnly />
        </div>
    );
};

export default DashboardInput;
