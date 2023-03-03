import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
//custom components
import { Navbar } from '@components/navbar';
//components
import { ProgressSpinner } from 'primereact/progressspinner';
export const Dashboard = ({ children }) => {
    const router = useRouter();
    const { status } = useSession();
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
        <div className="grid">
            <div className="col-2">
                <Navbar />
            </div>
            <div className="col-10">{children}</div>
        </div>
    );
};
