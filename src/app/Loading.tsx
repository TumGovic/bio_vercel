'use client';
import { useEffect, useState } from 'react';

const Loading = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const [crashed, setCrashed] = useState(false);

    useEffect(() => {
        const logMessages = [
            'SYSTEM LOADING...',
            '> Initializing kubernetes cluster...',
            '> Loading system dependencies...',
            '> Checking node status: OK',
            '> Starting control plane...',
            '> Initializing etcd cluster...',
            '> Starting API server...',
            '> Configuring network policies...',
            '> Setting up service mesh...',
            '> Deploying core components...',
            '> Checking pod status: Running',
            '> Validating cluster health...',
            '> Configuring auto-scaling...',
            '> Setting resource quotas...',
            '> Deploying monitoring stack...',
            '> WARNING: Memory usage spike detected',
            '> ALERT: Node pressure increasing',
            'ERROR: Memory corruption detected in node pool',
            'ERROR: Pod eviction threshold exceeded',
            'CRITICAL: Node pool unresponsive',
            'CRITICAL: Kernel panic - not syncing: Fatal exception',
            'CRITICAL: Memory address fault at 0x0000ffff',
            'SYSTEM FAILURE'
        ];

        let currentIndex = 0;
        const logInterval = setInterval(() => {
            if (currentIndex < logMessages.length) {
                setLogs(prev => [...prev, logMessages[currentIndex]]);
                currentIndex++;
            }
            if (currentIndex === logMessages.length - 1) {
                setTimeout(() => {
                    setCrashed(true);
                }, 100);
                clearInterval(logInterval);
            }
        }, 120); // Уменьшили интервал до 120мс

        return () => clearInterval(logInterval);
    }, []);

    return (
        <div className="fixed inset-0 bg-black flex items-start justify-start p-4 font-mono text-sm overflow-hidden">
            {crashed && (
                <div className="system-failure">SYSTEM FAILURE</div>
            )}
            <div className={`flex flex-col ${crashed ? 'old-lcd-crash' : 'old-lcd'}`}>
                {logs.map((log, index) => (
                    <div
                        key={index}
                        className={`text-[#39ff14] ${
                            log.includes('WARNING') ? 'text-yellow-500' :
                                log.includes('ALERT') ? 'text-orange-500' :
                                    log.includes('ERROR') ? 'text-red-500' :
                                        log.includes('CRITICAL') ? 'text-red-600 font-bold' : ''
                        }`}
                    >
                        {log}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Loading;
