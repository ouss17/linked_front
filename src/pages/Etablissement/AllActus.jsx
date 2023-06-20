import React, { useContext, useEffect, useMemo, useState } from 'react'
import useModal from '../../components/Modal/useModal';
import { Pen, Trash } from '../../assets/Svg/Svg';
import ReactTable from '../../components/ReactTable';
import Modal from '../../components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { AddActu, DeleteActu, GetAllActusByEtablissement, UpdateActu } from '../../Redux/actions/ActusAction';
import MetaData from '../../components/MetaData';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router';
import FormActus from './FormActus';
import { GetCategories } from '../../Redux/actions/CategoryAction';

const AllActus = () => {

    const { userLog, setUserLog } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userLog.isLogged) {
            navigate("/");
        }
    }, [userLog]);

    const [state, setState] = useState({
        isModalOpen: false,
        action: "add",
        labelButton: "",
        labelTitre: "",
    });

    const [inputState, setInputState] = useState({
        idEtablissement: `/apiLinked/etablissements/1`,
        titleActus: "",
        contentActus: "",
        mediaActus: "",
        activeActus: true,
    });

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetCategories()).then(() => {
            dispatch(GetAllActusByEtablissement(1, userLog.token));
        })
    }, [])

    const allCategories = useSelector((state) => state.CategoriesReducer);
    const allActus = useSelector((state) => state.AllActusByEtablissementReducer);


    const [error, setError] = useState({ name: "", message: "" });

    const { isShowing, dragDown, dragUp, topModal, opacityOverlay } = useModal();
    const emptyValue = () => {
        setInputState({
            idEtablissement: `/apiLinked/etablissements/1`,
            titleActus: "",
            contentActus: "",
            mediaActus: "",
            activeActus: true,
        });
    };

    const isEmpty = (value) => {
        if (value === "" || value === undefined || value === null) return true;
        return false;
    };

    const [selectedActus, setSelectedActus] = useState([])
    const [selectedAppear, setSelectedAppear] = useState(false)
    const [rightSelected, setRightSelected] = useState(-400)
    const [pointerSelected, setPointerSelected] = useState("none")
    const [opacitySelected, setOpacitySelected] = useState(0)
    const [message, setMessage] = useState("")


    const onRowClick = (row) => {
        return {
            onClick: e => {
                if (e.target.tagName.toLowerCase() !== 'path' && e.target.tagName.toLowerCase() !== 'svg' && e.target.tagName.toLowerCase() !== 'img' && e.target.tagName.toLowerCase() !== 'div' && e.target.innerHTML.toLowerCase() !== 'fermer') {
                    if (selectedActus.some((e) => e.idActus === row.original.idActus)) {
                        setSelectedActus(selectedActus.filter(el => el.idActus !== row.original.idActus));
                        if (selectedActus.length == 1) {
                            setSelectedAppear(false)
                        }
                    } else {
                        setSelectedActus([...selectedActus, row.original])
                        setSelectedAppear(true)
                    }
                }
            }
        }
    }

    useMemo(() => {
        if (selectedAppear) {
            setRightSelected(0)
            setPointerSelected("auto")
            setOpacitySelected(1)
        } else {
            setRightSelected(-400)
            setPointerSelected("none")
            setTimeout(() => {
                setOpacitySelected(0)
            }, 300);
        }
    }, [selectedAppear])

    useMemo(() => {
        if (selectedActus.length == 0) {
            setSelectedAppear(false)
        }
    }, [selectedActus.length])

    const showModalAdd = () => {
        emptyValue();
        setState({
            ...state,
            action: "add",
            labelButton: "Ajouter",
            labelTitre: "Ajouter une publication",
        });
        setError([])
        dragDown();
    };

    const showModalUpdate = (cell) => {
        setState({
            ...state,
            action: "update",
            labelButton: "Modifier",
            labelTitre: "Modifier la publication",
        });
        setInputState({
            ...inputState,
            idActus: cell.row.original.idActus,
            idEtablissement: cell.row.original.idEtablissement,
            idCategory: cell.row.original.idCategory,
            titleActus: cell.row.original.titleActus,
            contentActus: cell.row.original.contentActus,
            mediaActus: cell.row.original.mediaActus,
            activeActus: cell.row.original.activeActus,
        });
        setError([])
        dragDown();
    };


    const showModalDelete = (cell) => {
        setState({
            ...state,
            action: "delete",
            labelButton: "Supprimer",
            labelTitre: `Etes-vous sûr de vouloir supprimer la publication 
      ${cell.row.original.titleActus} ?`
        });
        setInputState({
            ...inputState,
            idActus: cell.row.original.idActus,
            idEtablissement: cell.row.original.idEtablissement,
            idCategory: cell.row.original.idCategory,
            titleActus: cell.row.original.titleActus,
            contentActus: cell.row.original.contentActus,
            mediaActus: cell.row.original.mediaActus,
        });

        dragDown();
    };

    const showModalDeleteAll = (cell) => {
        setState({
            ...state,
            action: "deleteAll",
            labelButton: "Supprimer",
            labelTitre: `Êtes-vous sûr de vouloir supprimer ${selectedActus.length > 1 ? "ces" : "cet"} ${selectedActus.length > 1 ? selectedActus.length : ""} élément${selectedActus.length > 1 ? "s" : ""} ?`
        });

        setInputState(cell);
        dragDown();
    };

    const handleChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputState({ ...inputState, [name]: value });
    };

    const saveActu = () => {
        if (state.action == "add") {

            dispatch(AddActu(inputState, userLog.token)).then((res) => {
                if (res.status !== 201) {

                } else {
                    // if (inputState.idCategory == "/apiLinked/categories/1") {

                    //     const options = {
                    //         method: 'POST',
                    //         headers: {
                    //             accept: 'application/json',
                    //             'Content-Type': 'application/json',
                    //             Authorization: 'Basic YjFmMjQ0ODctZWQwNS00ODRhLTllNDItNGRkYzEwYjQyMjc3',
                    //         },
                    //         body: JSON.stringify({
                    //             app_id: 'a3e4c38d-9275-4c55-a9fb-b32bc9de8f3c',
                    //             included_segments: ['Subscribed Users'],
                    //             contents: { en: 'new publication', fr: 'Nouvelle publication' },
                    //             name: 'Event Notif',
                    //         })
                    //     };

                    //     fetch('https://onesignal.com/api/v1/notifications', options)
                    //         .then(response => response.json())
                    //         .then(response => console.log(response))
                    //         .catch(err => console.error(err));
                    // }
                }
            });
            emptyValue();
            dragUp();

        } else if (state.action == "update") {

            dispatch(UpdateActu(inputState, userLog.token));
            emptyValue();
            dragUp();

        } else if (state.action == "deleteAll") {
            var bar = new Promise((resolve, reject) => {
                inputState.forEach((act, index, array) => {
                    setTimeout(() => {
                        dispatch(DeleteActu(act, userLog.token))
                    }, 400);
                    if (index === array.length - 1) resolve();
                })
            }).then(() => {
                setMessage(`Les publications ont bien été supprimées`)
            });
        } else {
            setSelectedActus(old => {
                let updateTab = [...old];
                const objWithIdIndex = updateTab.findIndex((obj) => obj.idActus === inputState.idActus);
                updateTab.splice(objWithIdIndex, 1);
                return updateTab;
            });
            dispatch(DeleteActu(inputState, userLog.token));
            emptyValue();
            dragUp();
        }
    };

    const defaultColumn = useMemo(() => ({
        minWidth: 65,
    }));


    const data = useMemo(
        () => allActus,
        [allActus]
    )

    useMemo(() => {
        if (message.length > 0) {
            setTimeout(() => {
                dragUp();
                setSelectedActus([]);
                setMessage("");
            }, 1000);
        }
    }, [message.length])

    const columns = useMemo(
        () => [
            {
                Header: ' ',
                accessor: (row) => <span style={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <span style={{
                        background: selectedActus.some((e) => e.idActus === row.idActus) ? "var(--main-color)" : "white",
                        width: "18px",
                        height: "18px",
                        border: "1px solid var(--main-color)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "4px",
                    }}>
                        {
                            selectedActus.some((e) => e.idActus === row.idActus) &&
                            <span className="check-selected"></span>
                        }
                    </span>
                </span>,
                minWidth: 20,
                width: 20
            },
            {
                Header: 'Titre',
                accessor: 'titleActus',
            },
            {
                Header: 'Description',
                accessor: 'contentActus',
            },
            {
                Header: 'Média',
                accessor: 'mediaActus',
            },
            {
                Header: 'Catégorie',
                accessor: 'idCategory.nameCategory',
            },
            {
                Header: 'Actions',
                Cell: actu => (
                    <>
                        <span onClick={() => showModalUpdate(actu)}>
                            <Pen />
                        </span>
                        <span onClick={() => showModalDelete(actu)}>
                            <Trash />
                        </span>
                    </>
                )
            },
        ],
        [selectedActus.length]
    )

    return (
        <>
            <MetaData title={`Gestion Publications - Linked`} index="false" />
            <div className='button-div'>
                <div></div>
                <button
                    className="modal-toggle justify-self-end"
                    onClick={showModalAdd}
                >
                    Ajouter une publication
                </button>
                <Modal
                    title={state.labelTitre}
                    modalBody={
                        state.action != "delete" ? (
                            <FormActus
                                action={state.action}
                                inputData={inputState}
                                setInputData={setInputState}
                                inputChange={handleChangeInput}
                                selectedActus={selectedActus}
                                allCategories={allCategories}
                                error={error}
                            />
                        ) : <></>
                    }
                    isShowing={isShowing}
                    showGreen={state.action !== "see" ? true : false}
                    showRed={true}
                    hide={dragUp}
                    topModal={topModal}
                    opacityOverlay={opacityOverlay}
                    redContent={state.action !== "see" ? "Annuler" : "Fermer"}
                    greenContent={state.labelButton}
                    message={message}
                    func={() => {
                        saveActu();
                    }}
                />
            </div>

            <p className="selected-values" style={{ right: `${rightSelected}px`, pointerEvents: `${pointerSelected}`, opacity: `${opacitySelected}` }}>
                {selectedActus.length} catégorie{selectedActus.length > 1 && "s"} sélectionnée{selectedActus.length > 1 && "s"} :
                <span onClick={() => showModalDeleteAll(selectedActus)}>
                    <Trash />
                </span>
            </p>
            <ReactTable
                data={data}
                columns={columns}
                isResizable
                defaultColumn={defaultColumn}
                getRowProps={onRowClick}
            />
        </>
    )
}

export default AllActus