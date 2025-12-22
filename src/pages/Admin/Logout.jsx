import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Loader2 } from 'lucide-react';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear auth data (simulated)
        const performLogout = async () => {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            // In actual implementation:
            // localStorage.removeItem('token');
            // authContext.logout();
            navigate('/login');
        };

        performLogout();
    }, [navigate]);

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8fafc',
            fontFamily: 'system-ui, sans-serif'
        }}>
            <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '24px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                maxWidth: '400px',
                width: '90%'
            }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    background: '#fee2e2',
                    color: '#ef4444',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px'
                }}>
                    <LogOut size={32} />
                </div>
                <h2 style={{ margin: '0 0 8px', color: '#1e293b' }}>Logging out...</h2>
                <p style={{ margin: '0 0 24px', color: '#64748b' }}>Please wait while we secure your session and redirect you to the login page.</p>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563eb',
                    gap: '10px',
                    fontWeight: 600
                }}>
                    <Loader2 size={24} className="animate-spin" />
                    <span>Processing</span>
                </div>
            </div>

            {/* Simple spin animation for the loader */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            `}} />
        </div>
    );
};

export default Logout;
