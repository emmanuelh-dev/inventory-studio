import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export const LoginForm = (props) => {
    const { credentials, handleInputChange, handleFormSubmit } = { ...props };
    return (
        <Card className="p-fluid formgrid grid">
            <form onSubmit={handleFormSubmit}>
                <div className="field col-12">
                    <label>Nombre de usuario</label>
                    <InputText
                        type="email"
                        name="username"
                        className="p-inputtext-lg"
                        value={credentials.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="field col-12">
                    <label>Contraseña</label>
                    <InputText
                        type="password"
                        name="password"
                        className="p-inputtext-lg"
                        value={credentials.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="field col-12">
                    <Button type="submit" label="Enviar" className="p-button" />
                </div>
            </form>
        </Card>
    );
};
