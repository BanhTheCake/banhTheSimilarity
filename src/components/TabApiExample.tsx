'use client';

import { FC } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import CodeDisplay from './CodeDisplay';
import { nodejs, python } from '@/utils/documetation-code';

interface TabApiExampleProps {}

const TabApiExample: FC<TabApiExampleProps> = ({}) => {
    return (
        <Tabs.Root
            defaultValue="tab1"
            className="w-[700px] max-w-full flex flex-col "
        >
            <Tabs.List className="bg-slate-100 dark:bg-slate-800 rounded-sm shadow-sm p-[4px] w-fit flex gap-0.5 mb-3">
                <Tabs.Trigger
                    className="animate-in text-[15px] px-6 py-1 rounded-sm  text-slate-900 dark:text-white dark:data-[state=active]:bg-slate-900 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all font-[500]"
                    value="tab1"
                >
                    Node JS
                </Tabs.Trigger>
                <Tabs.Trigger
                    className="animate-in text-[15px] px-6 py-1 rounded-sm  text-slate-900 dark:text-white dark:data-[state=active]:bg-slate-900 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all font-[500]"
                    value="tab2"
                >
                    Python
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1" className="w-full">
                <CodeDisplay code={nodejs} />
            </Tabs.Content>
            <Tabs.Content value="tab2">
                <CodeDisplay code={python} />
            </Tabs.Content>
        </Tabs.Root>
    );
};

export default TabApiExample;
