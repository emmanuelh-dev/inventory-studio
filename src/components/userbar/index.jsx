import { Menubar } from 'primereact/menubar';
import { LogOutButton } from '@components/logoutbutton';
export const Userbar = (props) => {
    return <Menubar model={[]} end={<LogOutButton />} />;
};
