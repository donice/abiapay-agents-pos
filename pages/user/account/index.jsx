import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { CustomHeader } from '@/src/components/common/header';
import { isBrowser } from '@/src/utils/isBrowser';
import { PiUserCircleDuotone } from 'react-icons/pi';

const MyAccountPage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (isBrowser) {
            const data = window.sessionStorage.getItem("USER_DATA");
            if (data) {
                try {
                    setUserData(JSON.parse(data));
                } catch (e) {
                    console.error("Error parsing user data", e);
                }
            }
        }
    }, []);

    return (
        <div className="identity">
            <Head>
                <title>My Account - ABIAPAY</title>
            </Head>
            <CustomHeader title="My Account" desc="Manage your profile information" />

            <div className="identity_container" style={{ padding: '2rem' }}>
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '500px',
                    margin: '0 auto'
                }}>
                    <PiUserCircleDuotone style={{ fontSize: '80px', color: '#9ca3af', marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>
                        {userData?.name || 'User Profile'}
                    </h2>
                    <p style={{ color: '#6b7280', marginBottom: '2rem' }}>{userData?.user_cat || 'Account Type'}</p>

                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
                            <span style={{ fontWeight: '500', color: '#374151' }}>Email</span>
                            <span style={{ color: '#6b7280' }}>{userData?.email || 'N/A'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
                            <span style={{ fontWeight: '500', color: '#374151' }}>Phone</span>
                            <span style={{ color: '#6b7280' }}>{userData?.phone || 'N/A'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
                            <span style={{ fontWeight: '500', color: '#374151' }}>LGA</span>
                            <span style={{ color: '#6b7280' }}>{userData?.lga || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccountPage;
