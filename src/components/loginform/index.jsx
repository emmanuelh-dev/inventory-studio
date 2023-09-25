import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

export const LoginForm = (props) => {
    const { message, userAccount, handleInputChange, handleFormSubmit } = { ...props };
    return (
        <div className="flex align-content-center justify-content-center flex-wrap login-container">
            <Card className="login-card">
                <Messages ref={message} />
                <form onSubmit={handleFormSubmit} className="p-fluid formgrid grid">
                    <div className="field col-12">
                        <label>Nombre de usuario</label>
                        <InputText
                            type="email"
                            name="username"
                            className="p-inputtext-lg"
                            value={userAccount.username}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field col-12">
                        <label>Contraseña</label>
                        <Password
                            className="p-inputtext-lg"
                            name="password"
                            feedback={false}
                            value={userAccount.password}
                            onChange={handleInputChange}
                            toggleMask
                        />
                    </div>
                    <div className="field col-12">
                        <Button type="submit" label="Enviar" className="p-button" />
                    </div>
                </form>
            </Card>
        </div>
    );
};
