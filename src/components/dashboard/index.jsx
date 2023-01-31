import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Navbar } from '@components/navbar';
export const Dashboard = (props) => {
    return (
        <div>
            <Splitter>
                <SplitterPanel size={20}>
                    <Navbar />
                </SplitterPanel>
                <SplitterPanel size={80}>{props.children}</SplitterPanel>
            </Splitter>
        </div>
    );
};
