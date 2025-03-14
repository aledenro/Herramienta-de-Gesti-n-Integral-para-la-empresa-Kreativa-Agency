import React, { useState } from "react";
import { Form, Alert, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const AgregarPaquete = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [paquete, setPaquete] = useState({
        nombre: "",
        descripcion: "",
        nivel: "",
        duracion: "",
        beneficios: [""],
        precio: "",
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("danger");
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaquete((prevPaquete) => ({ ...prevPaquete, [name]: value }));
    };

    const handleBeneficioChange = (index, value) => {
        const nuevosBeneficios = [...paquete.beneficios];
        nuevosBeneficios[index] = value;
        setPaquete((prevPaquete) => ({
            ...prevPaquete,
            beneficios: nuevosBeneficios,
        }));
    };

    const agregarBeneficio = () => {
        setPaquete((prevPaquete) => ({
            ...prevPaquete,
            beneficios: [...prevPaquete.beneficios, ""],
        }));
    };

    const eliminarBeneficio = (index) => {
        if (paquete.beneficios.length > 1) {
            const nuevosBeneficios = paquete.beneficios.filter(
                (_, i) => i !== index
            );
            setPaquete((prevPaquete) => ({
                ...prevPaquete,
                beneficios: nuevosBeneficios,
            }));
        }
    };

    const handleFocus = (index) => {
        if (index === paquete.beneficios.length - 1) {
            agregarBeneficio();
        }
    };

    const handleSubmit = async () => {
        const paqueteData = {
            ...paquete,
            precio: parseFloat(paquete.precio),
        };

        try {
            const res = await axios.put(
                `http://localhost:4000/api/servicios/${id}/nuevoPaquete`,
                paqueteData
            );
            console.log(res.data);
            setAlertMessage("Paquete agregado exitosamente");
            setAlertVariant("success");
            setShowAlert(true);
            setShowModal(false);

            setTimeout(() => {
                navigate(`/servicio/${id}`);
            }, 2000);
        } catch (error) {
            console.error("Error al agregar el paquete: ", error.message);
            setAlertMessage("Hubo un error al agregar el paquete");
            setAlertVariant("danger");
            setShowAlert(true);
            setShowModal(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="section-title text-center">
                    <h2>Agregar Paquete</h2>
                </div>
                <div className="mx-auto align-items-center justify-content-center d-flex">
                    <div className="col-xl-8">
                        {showAlert && (
                            <Alert
                                variant={alertVariant}
                                onClose={() => setShowAlert(false)}
                                dismissible
                            >
                                {alertMessage}
                            </Alert>
                        )}
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setShowModal(true);
                            }}
                            className="paquete_form"
                        >
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">
                                        Nombre del paquete
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        className="form_input"
                                        value={paquete.nombre}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <label className="form-label">Nivel</label>
                                    <input
                                        type="text"
                                        name="nivel"
                                        className="form_input"
                                        value={paquete.nivel}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">
                                        Duración
                                    </label>
                                    <input
                                        type="text"
                                        name="duracion"
                                        className="form_input"
                                        value={paquete.duracion}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <label className="form-label">Precio</label>
                                    <input
                                        type="number"
                                        name="precio"
                                        className="form_input"
                                        value={paquete.precio}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">
                                        Descripción
                                    </label>
                                    <textarea
                                        name="descripcion"
                                        className="form_input form_textarea"
                                        rows="3"
                                        value={paquete.descripcion}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">
                                        Beneficios
                                    </label>
                                    {paquete.beneficios.map(
                                        (beneficio, index) => (
                                            <div
                                                key={index}
                                                className="d-flex align-items-center mb-2"
                                            >
                                                <input
                                                    type="text"
                                                    className="form_input"
                                                    value={beneficio}
                                                    onChange={(e) =>
                                                        handleBeneficioChange(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    onFocus={() =>
                                                        handleFocus(index)
                                                    }
                                                    required
                                                />
                                                {index > 0 && (
                                                    <button
                                                        type="button"
                                                        className="icon-btn"
                                                        onClick={() =>
                                                            eliminarBeneficio(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faX}
                                                        />
                                                    </button>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <button
                                    type="submit"
                                    className="thm-btn form-btn"
                                >
                                    Agregar
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Agregado</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Seguro que desea agregar este paquete?</Modal.Body>
                <Modal.Footer>
                    <button
                        className="thm-btn-2 thm-btn-small"
                        onClick={() => setShowModal(false)}
                    >
                        No
                    </button>
                    <button
                        className="thm-btn thm-btn-small"
                        onClick={handleSubmit}
                    >
                        Sí
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AgregarPaquete;
