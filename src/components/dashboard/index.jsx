import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
//custom components
import { Navbar } from '@components/navbar';
import { Userbar } from '@components/userbar';
//components
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';

export const Dashboard = ({ children }) => {
    const router = useRouter();
    const { status, data: session } = useSession();
    if (status === 'loading') {
        return (
            <div className="flex justify-content-center flex-wrap">
                <ProgressSpinner animationDuration=".5s" />
            </div>
        );
    }

    if (status === 'unauthenticated') {
        router.push('/login');
        return;
    }

    return (
        <div className="">
            <Card>
                <Navbar />
            </Card>
            <Card className="col-12">{children}</Card>
        </div>
    );
};
