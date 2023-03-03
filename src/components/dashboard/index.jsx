import { Navbar } from '@components/navbar';
export const Dashboard = ({ children }) => {
    return (
        <div className="grid">
            <div className="col-2">
                <Navbar />
            </div>
            <div className="col-10">{children}</div>
        </div>
    );
};
