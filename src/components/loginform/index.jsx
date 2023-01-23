import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export const LoginForm = (props) => {
    return (
        <Card className="p-fluid formgrid grid">
            <div className="field col-12">
                <label>Nombre de usuario</label>
                <InputText type="email" className="p-inputtext-lg" value="" />
            </div>
            <div className="field col-12">
                <label>Contraseña</label>
                <InputText type="password" className="p-inputtext-lg" value="" />
            </div>
            <div className="field col-12">
                <Button type="submit" label="Enviar" className="p-button-lg " />
            </div>
        </Card>
    );
};
