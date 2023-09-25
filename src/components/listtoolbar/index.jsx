import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
export const ListToolbar = (props) => {
    const { creationPath } = { ...props };

    const constrols = (
        <React.Fragment>
            <NewButton redirection={creationPath} />
        </React.Fragment>
    );

    return <Toolbar left={constrols} />;
};

const NewButton = (props) => {
    const router = useRouter();

    const handleNewClick = async (event) => {
        router.push(`/${props.redirection}`);
    };

    return <Button label="Nuevo" icon="pi pi-plus" className="" onClick={handleNewClick} />;
};
