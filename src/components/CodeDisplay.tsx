'use client';

import { FC, useState, useEffect } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import dracula from 'prism-react-renderer/themes/dracula';
import github from 'prism-react-renderer/themes/github';
import cn from '@/utils/cn';
import { useTheme } from 'next-themes';
import Button from './global/Button';
import { Copy } from 'lucide-react';
import WithCopyBtn from '@/helpers/WithCopyBtn';

interface CodeDisplayProps {
    code: string;
    animationTime?: number;
    animationDelay?: number;
    isAnimate?: boolean;
}

const CodeDisplay: FC<CodeDisplayProps> = ({
    code,
    animationTime = 25,
    animationDelay = 150,
    isAnimate = true,
}) => {
    const [text, setText] = useState(isAnimate ? '' : code);
    const { theme } = useTheme();
    const themeValue = theme === 'dark' ? dracula : github;

    useEffect(() => {
        let timeOut: any;
        if (isAnimate) {
            let i = 1;
            timeOut = setTimeout(() => {
                const interval = setInterval(() => {
                    setText(code.slice(0, i));
                    i++;
                    if (i > code.length) {
                        clearInterval(interval);
                    }
                }, animationTime);

                return () => clearInterval(interval);
            }, animationDelay);
        }
        return () => timeOut && clearTimeout(timeOut);
    }, [animationDelay, animationTime, code, isAnimate]);

    return (
        <div className='relative'>
        <Highlight
            {...defaultProps}
            theme={themeValue}
            code={text}
            language="jsx"
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                    className={cn(
                        className,
                        'p-4 rounded-md shadow-sm !bg-slate-100 dark:!bg-slate-900 dark:border-white/20 transition-all border overflow-x-auto relative'
                    )}
                    style={style}
                >
                    {tokens.map((line, i) => {
                        const { key, ...rest } = getLineProps({ line, key: i });
                        return (
                            <div key={key} {...rest}>
                                <span>
                                    {line.map((token, key) => {
                                        const { key: tokenKey, ...rest } =
                                            getTokenProps({ token, key });
                                        return (
                                            <span key={tokenKey} {...rest} />
                                        );
                                    })}
                                </span>
                            </div>
                        );
                    })}
                </pre>
            )}
        </Highlight>
                    <WithCopyBtn value={code}>
                        <Button
                            variant="ghost"
                            className="absolute top-3 right-3 p-2 hover:bg-slate-200"
                        >
                            <Copy />
                        </Button>
                    </WithCopyBtn>
        </div>
    );
};

export default CodeDisplay;
