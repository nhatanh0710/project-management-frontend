'use client';

import styles from './styles.module.scss';

import { Avatar, Badge, Button, Input } from 'antd';

import {
    BellOutlined,
    PlusOutlined,
    SearchOutlined,
} from '@ant-design/icons';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
    clearAuth,
    getUser,
} from '@/utils/auth';

export default function AppHeader() {
    const router = useRouter();

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        setUser(getUser());
    }, []);

    const handleLogout = () => {
        clearAuth();
        router.push('/auth/login');
    };

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={styles.breadcrumb}>
                    Dashboard
                </div>
            </div>

            <div className={styles.center}>
                <Input
                    placeholder="Search workspace, project, task..."
                    prefix={<SearchOutlined />}
                    className={styles.search}
                />
            </div>

            <div className={styles.right}>
                <Badge count={3}>
                    <Button
                        type="text"
                        className={styles.iconButton}
                        icon={<BellOutlined />}
                    />
                </Badge>

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                >
                    Create
                </Button>

                <div className={styles.user}>
                    <Avatar size={38}>
                        {user?.name?.charAt(0)}
                    </Avatar>

                    <div>
                        <div className={styles.name}>
                            {user?.name}
                        </div>

                        <div className={styles.role}>
                            Workspace Owner
                        </div>
                    </div>
                </div>

                <Button
                    danger
                    type="text"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
        </header>
    );
}