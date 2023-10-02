import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';

import { useRouter } from 'next/router';
import { Accordion, AccordionTab } from 'primereact/accordion';
import Image from 'next/image';

const CARDS = [
    {
        title: '1 - Articulos',
        description: 'El primer paso es crear Articulos (un par de articulos ya fueron agregados).',
    },
    {
        title: '2 - Almacenes',
        description: 'Agrega almacenes donde los articulos seran guardados.',
    },
    {
        title: '3 - Docs. de entrada',
        description:
            'Existen dos tipos de documentos de entrada, estos documentos permiten ingresar articulos al algun almacen.',
    },
    {
        title: '4 - Libera el documento',
        description:
            'Liberar el documento significa que los articulos quedaran registrados en el almacen.',
    },
    {
        title: '5 - Genera  tus etiquetas',
        description:
            'Las etiquetas con codigos de barra te permiten hacer un seguimiento de los articulos.',
    },
    {
        title: '6 - Imprime  tus etiquetas',
        description: 'Utiliza hojas tipo OD5160. No necesitas una impresora especial.',
    },
    {
        title: '7 - Aprovecha tus hojas',
        description:
            'No desperdicies etiquetas utiliza el boton perzonalizar etiquetas para elegir en que lugar de la hoja imprimir.',
    },
    {
        title: '8 - Docs. de salida',
        description:
            'Registra la salida de los artiuclos de tu inventario. Existe dos tipos: salida por devolucion o venta.',
    },
    {
        title: '8 - Revisa tu inventario',
        description:
            'Conoce cuantos articulos hay en cada almacen y cual es el valor de acuerdo al metodo de promedio ponderado.',
    },
];

const Homepage = () => {
    const router = useRouter();
    const toLogin = () => {
        router.push('/login');
    };

    return (
        <>
            <div className="grid grid-nogutter surface-0 text-800" style={{ maxWidth: '100rem', margin: 'auto', padding: '200px 0 0 0 '}}>
                <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                    <section>
                        <span className="block text-6xl font-bold mb-1">Inventory Studio</span>
                        <div className="text-6xl text-primary font-bold mb-3">
                            Admin, dispatch and more...
                        </div>
                        <p className="mt-0 mb-4 text-700 line-height-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua.
                        </p>

                        <Button label="Learn More" type="button" className="mr-3 p-button-raised" />
                        <Button
                            onClick={() => router.push('/login')}
                            label="Live Demo"
                            type="button"
                            className="p-button-outlined"
                        />
                    </section>
                </div>
                <div className="col-12 md:col-6 overflow-hidden">
                    <Image
                        src="/hero.png"
                        alt="hero-1"
                        width={900}
                        height={500}
                        className="md:ml-auto block md:h-full"
                        style={{
                            clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)',
                            margin: '50 50 50 50',
                        }}
                    />
                </div>
            </div>

            <div className="surface-0 text-center " style={{ maxWidth: '100rem', margin: 'auto', padding: '200px 0 0 0 '}}>
                <div className="mb-3 font-bold text-3xl">
                    <span className="text-900">One Product, </span>
                    <span className="text-blue-600">Many Solutions</span>
                </div>
                <div className="text-700 mb-6">
                    Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.
                </div>
                <div className="grid">
                    {CARDS.map((card, index) => (
                        <div className="col-12 md:col-4 mb-4 px-5" key={index}>
                            <span
                                className="p-3 shadow-2 mb-3 inline-block"
                                style={{ borderRadius: '10px' }}
                            >
                                <i className="pi pi-desktop text-4xl text-blue-500"></i>
                            </span>
                            <div className="text-900 text-xl mb-3 font-medium">{card.title}</div>
                            <span className="text-700 line-height-3">{card.description}</span>
                        </div>
                    ))}
                </div>
            </div>

            <header className="flex justify-content-center m-5" >
                <div className="p-fluid">
                    <h1 className="text-center col-12 m-0 p-0">Inventory Studio</h1>
                    <h3 className="text-center col-12 font-light m-0">Alfa Version</h3>
                </div>
            </header>


<Card className="m-3" >
    <div className="flex flex-column card-container border-round">
        <div className="flex align-items-center justify-content-center h-4rem">
            <h2>Datos de Acceso</h2>
        </div>
        <div className="flex align-items-center justify-content-center h-4rem">
            <p>
                <strong>Usuario: </strong> beta@republicofdevs.com
                <br />
                <strong>Password: </strong> superpassword
            </p>
        </div>
        <div className="flex align-items-center justify-content-center h-4rem m-3">
            <Button label="Ingresar" className="p-button-info col-4" onClick={toLogin} />
        </div>
    </div>
</Card>

<Card className="m-3">
    <div className="flex flex-column card-container border-round p-3">
        <h2>Notas Importantes</h2>
        <Accordion multiple>
            <AccordionTab header="Datos Importantes">
                <ul>
                    <li>Todos los datos serán eliminados cada dos semanas</li>
                    <li>Las siguientes funcionalidades no están completas</li>
                    <ul>
                        <li>Las etiquetas no están bien alineadas, habrá errores en la impresión</li>
                        <li>La acción de eliminar artículos, almacenes o documentos desde las tablas no funciona</li>
                        <li>La sesión dura 24 hrs, falta mejorar la vida útil del token</li>
                        <li>Es posible que la funcionalidad de cerrar sesión no funcione correctamente</li>
                    </ul>
                </ul>
            </AccordionTab>
        </Accordion>
        <h3>
            Cualquier error o pregunta favor de enviar un correo a soporte@republicofdevs.com
        </h3>
    </div>
</Card>

        </>
    );
};

export default Homepage;
