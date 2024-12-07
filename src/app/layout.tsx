'use client'
// layouts.tsx
import './globals.css';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import Head from 'next/head';

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Симуляция загрузки данных
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3500); // Задержка в 2 секунды для примера

        return () => clearTimeout(timer);
    }, []);

    return (
        <html lang="en">
        <Head>
            <title>TumGov - Retro Game Bio</title>
            <meta name="description" content="A retro game-style bio for TumGov, the AI master." />
        </Head>
        <body>
        {loading ? <Loading /> : children}
        </body>
        </html>
    );
}
