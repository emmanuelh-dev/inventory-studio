import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';

import { useRouter } from 'next/router';
const Homepage = () => {
    const router = useRouter();
    const toLogin = () => {
        router.push('/login');
    };

    return (
        <div>
            <header className="flex justify-content-center m-5">
                <div className="p-fluid">
                    <h1 className="text-center col-12 m-0 p-0">Inventory Studio</h1>
                    <h3 className="text-center col-12 font-light m-0">Alfa Version</h3>
                </div>
            </header>
            <div className="grid gap-3 flex flex-wrap justify-content-center">
                <Card className="col-3" title="1 - Articulos" subTitle="">
                    <p>
                        El primer paso es crear Articulos (un par de articulos ya fueron agregados).
                    </p>
                </Card>
                <Card className="col-3" title="2 - Almacenes" subTitle="">
                    <p>Agrega almacenes donde los articulos seran guardados.</p>
                </Card>
                <Card className="col-3" title="3 - Docs. de entrada" subTitle="">
                    <p>
                        Existen dos tipos de documentos de entrada, estos documentos permiten
                        ingresar articulos al algun almacen.
                    </p>
                </Card>
                <Card className="col-3" title="4 - Libera el documento" subTitle="">
                    <p>
                        Liberar el documento significa que los articulos quedaran registrados en el
                        almacen.
                    </p>
                </Card>
                <Card className="col-3" title="5 - Genera  tus etiquetas" subTitle="">
                    <p>
                        Las etiquetas con codigos de barra te permiten hacer un seguimiento de los
                        articulos.
                    </p>
                </Card>
                <Card className="col-3" title="6 - Imprime  tus etiquetas" subTitle="">
                    <p>
                        Utiliza hojas tipo <a href="https://acortar.link/npaN15">OD5160</a>. No
                        necesitas una impresora especial.
                    </p>
                </Card>
                <Card className="col-3" title="7 - Aprovecha tus hojas" subTitle="">
                    <p>
                        No desperdicies etiquetas utiliza el boton perzonalizar etiquetas para
                        elegir en que lugar de la hoja imprimir.
                    </p>
                </Card>
                <Card className="col-3" title="8 - Docs. de salida" subTitle="">
                    <p>
                        Registra la salida de los artiuclos de tu inventario. Existe dos tipos:
                        salida por devolucion o venta.
                    </p>
                </Card>
                <Card className="col-3" title="8 - Revisa tu inventario" subTitle="">
                    <p>
                        Conoce cuantos articulos hay en cada almacen y cual es el valor de acuerdo
                        al metodo de promedio ponderado.
                    </p>
                </Card>
            </div>
            <div className="card m-3">
                <div
                    className="flex flex-column card-container border-round"
                    style={{ backgroundColor: '#1e1e1e' }}
                >
                    <div className="flex align-items-center justify-content-center h-4rem">
                        <h2> Datos de Acceso</h2>
                    </div>
                    <div className="flex align-items-center justify-content-center h-4rem">
                        <p>
                            <strong>Usuario: </strong> beta@republicofdevs.com
                            <br />
                            <strong>Password: </strong> superpasword
                        </p>
                    </div>
                    <div className="flex align-items-center justify-content-center h-4rem m-3">
                        <Button
                            label="Ingresar"
                            className="p-button-info col-4"
                            onClick={toLogin}
                        />
                    </div>
                </div>
            </div>

            <div className="card m-3 ">
                <div
                    className="flex flex-column card-container border-round p-3"
                    style={{ backgroundColor: '#1e1e1e' }}
                >
                    <h2>Notas Importantes</h2>
                    <ul>
                        <li>Todos los datos seran eliminados cada dos semanas</li>
                        <li>Las siguientes funcionalidades no estan completas</li>
                        <ul>
                            <li>
                                Las etiquetas no estan bien alineadas, habra errores en la impresion
                            </li>
                            <li>
                                La accion de eliminar articulos, almacenes o documentos desde las
                                tablas no funcionan.
                            </li>
                            <li>La sesion dura 24 hrs, falta mejorar la vida util del token</li>

                            <li>
                                Es posible que la funcionalidad de cerrar sesion no funncione
                                correctamente
                            </li>
                        </ul>
                    </ul>
                    <h3>
                        Cualquier error o pregunta favor de enviar un correo a
                        soporte@republicofdevs.com
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
