'use client'

import {useEffect} from 'react'

export function ViewportProvider({
                                     children,
                                 }: {
    children: React.ReactNode
}) {
    useEffect(() => {
        const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent)
        const viewport = document.querySelector('meta[name="viewport"]')

        if (isMobile && viewport) {
            viewport.setAttribute(
                'content',
                'width=device-width, initial-scale=0.73, maximum-scale=1.5, user-scalable=yes'
            )
        }
    }, [])

    return children
}



import {Toaster} from 'sonner';

export const ToastProvider = () => (
    <Toaster
        style={{
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '400px',
            minWidth: '220px',
            boxSizing: 'border-box',
        }}
        position="top-center" // 위치: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
        // className="toaster-center"
        expand={true} // 여러 토스트가 겹치지 않도록 확장 형태로 보여줌
        richColors={true} // success/error 등에 컬러 강조
        visibleToasts={3} // 최대 동시에 보여질 토스트 개수
        theme="light" // 또는 "dark", "system"
        toastOptions={{
            classNames: {
                toast: 'bg-gray border shadow-2xl font-extrabold text-sm px-4 py-3 rounded-lg',
                description: 'text-sm text-gray-600 mt-1',
                cancelButton: 'text-sm text-gray-600 font-semibold',
                title: 'font-bold',
                actionButton: 'text-sm text-white bg-red-500 rounded px-3 py-1',
            },
            duration: 3000,
            style: {
                background: 'white',
                color: 'darkslategray',
                border: '3px solid darkslategray',
            },
        }}
    />
);
