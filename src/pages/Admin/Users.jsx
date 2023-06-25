import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import useModal from '../../components/Modal/useModal';
import { Pen, Trash } from '../../assets/Svg/Svg';
import ReactTable from '../../components/ReactTable';
import Modal from '../../components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { AddActu, DeleteActu, GetAllActusByEtablissement, UpdateActu } from '../../Redux/actions/ActusAction';
import MetaData from '../../components/MetaData';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router';
import { GetRoles } from '../../Redux/actions/RolesAction';
import { GetEtablissements } from '../../Redux/actions/EtablissementAction';
import { DeleteUser, GetUsers, UpdateUser } from '../../Redux/actions/UserAction';
import FormUsers from './FormUsers';
import { Player } from "@lottiefiles/react-lottie-player";
import lottiePlayer from "../../assets/ressources/lotties/98891-insider-loading.json";

const Users = () => {

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
        idEtablissement: ``,
        idRole: ``,
        userEmail: "",
        nameUser: "",
    });

    const [lottieShowContent, setLottieShowContent] = useState(true);
    const lottieRef = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetRoles(userLog.token)).then(() => {
            dispatch(GetEtablissements()).then(() => {
                dispatch(GetUsers()).then(() => {
                    setLottieShowContent(false)
                });
            })
        })
    }, [])

    const roles = useSelector((state) => state.RolesReducer);
    const users = useSelector((state) => state.UsersReducer);
    const etablissements = useSelector((state) => state.EtablissementsReducer);


    const [error, setError] = useState({ name: "", message: "" });

    const { isShowing, dragDown, dragUp, topModal, opacityOverlay } = useModal();
    const emptyValue = () => {
        setInputState({
            idEtablissement: ``,
            idRole: ``,
            userEmail: "",
            nameUser: "",
        });
    };

    const isEmpty = (value) => {
        if (value === "" || value === undefined || value === null) return true;
        return false;
    };

    const [selectedUsers, setSelectedUsers] = useState([])
    const [selectedAppear, setSelectedAppear] = useState(false)
    const [rightSelected, setRightSelected] = useState(-400)
    const [pointerSelected, setPointerSelected] = useState("none")
    const [opacitySelected, setOpacitySelected] = useState(0)
    const [message, setMessage] = useState("")


    const onRowClick = (row) => {
        return {
            onClick: e => {
                if (e.target.tagName.toLowerCase() !== 'path' && e.target.tagName.toLowerCase() !== 'svg' && e.target.tagName.toLowerCase() !== 'img' && e.target.tagName.toLowerCase() !== 'div' && e.target.innerHTML.toLowerCase() !== 'fermer') {
                    if (selectedUsers.some((e) => e.idUser === row.original.idUser)) {
                        setSelectedUsers(selectedUsers.filter(el => el.idUser !== row.original.idUser));
                        if (selectedUsers.length == 1) {
                            setSelectedAppear(false)
                        }
                    } else {
                        setSelectedUsers([...selectedUsers, row.original])
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
        if (selectedUsers.length == 0) {
            setSelectedAppear(false)
        }
    }, [selectedUsers.length])


    const showModalUpdate = (cell) => {
        setState({
            ...state,
            action: "update",
            labelButton: "Modifier",
            labelTitre: "Modifier l'utilisateur",
        });
        setInputState({
            ...inputState,
            idUser: cell.row.original.idUser,
            idEtablissement: cell.row.original.idEtablissement,
            idCategory: cell.row.original.idCategory,
            userEmail: cell.row.original.userEmail,
            nameUser: cell.row.original.nameUser,
            idRole: cell.row.original.idRole
        });
        setError([])
        dragDown();
    };


    const showModalDelete = (cell) => {
        setState({
            ...state,
            action: "delete",
            labelButton: "Supprimer",
            labelTitre: `Etes-vous sûr de vouloir supprimer l'utilisateur' 
      ${cell.row.original.nameUser} ?`
        });
        setInputState({
            ...inputState,
            idUser: cell.row.original.idUser,
            idEtablissement: cell.row.original.idEtablissement,
            idCategory: cell.row.original.idCategory,
            userEmail: cell.row.original.userEmail,
            nameUser: cell.row.original.nameUser,
        });

        dragDown();
    };

    const showModalDeleteAll = (cell) => {
        setState({
            ...state,
            action: "deleteAll",
            labelButton: "Supprimer",
            labelTitre: `Êtes-vous sûr de vouloir supprimer ${selectedUsers.length > 1 ? "ces" : "cet"} ${selectedUsers.length > 1 ? selectedUsers.length : ""} personne${selectedUsers.length > 1 ? "s" : ""} ?`
        });

        setInputState(cell);
        dragDown();
    };

    const handleChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputState({ ...inputState, [name]: value });
    };

    const configUser = () => {
        if (state.action == "update") {

            dispatch(UpdateUser({ ...inputState, roles: inputState.idRole == "apiLinked/roles/1" ? ["ROLE_ADMIN"] : inputState.idRole == "apiLinked/roles/2" ? ["ROLE_USER"] : ["ROLE_GERANT"] }, userLog.token));
            emptyValue();
            dragUp();

        } else if (state.action == "deleteAll") {
            var bar = new Promise((resolve, reject) => {
                inputState.forEach((act, index, array) => {
                    setTimeout(() => {
                        dispatch(DeleteUser(act, userLog.token))
                    }, 400);
                    if (index === array.length - 1) resolve();
                })
            }).then(() => {
                setMessage(`Les publications ont bien été supprimées`)
            });
        } else {
            setSelectedUsers(old => {
                let updateTab = [...old];
                const objWithIdIndex = updateTab.findIndex((obj) => obj.idUser === inputState.idUser);
                updateTab.splice(objWithIdIndex, 1);
                return updateTab;
            });
            dispatch(DeleteUser(inputState, userLog.token));
            emptyValue();
            dragUp();
        }
    };

    const defaultColumn = useMemo(() => ({
        minWidth: 65,
    }));


    const data = useMemo(
        () => users,
        [users]
    )

    useMemo(() => {
        if (message.length > 0) {
            setTimeout(() => {
                dragUp();
                setSelectedUsers([]);
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
                        background: selectedUsers.some((e) => e.idUser === row.idUser) ? "var(--main-color)" : "white",
                        width: "18px",
                        height: "18px",
                        border: "1px solid var(--main-color)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "4px",
                    }}>
                        {
                            selectedUsers.some((e) => e.idUser === row.idUser) &&
                            <span className="check-selected"></span>
                        }
                    </span>
                </span>,
                minWidth: 20,
                width: 20
            },
            {
                Header: 'Email',
                accessor: 'userEmail',
            },
            {
                Header: 'Pseudo',
                accessor: 'nameUser',
            },
            {
                Header: 'Etablissement',
                accessor: 'idEtablissement.nameEtablissement',
            },
            {
                Header: 'Role',
                accessor: 'idRole.nameRole',
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
        [selectedUsers.length]
    )

    return (
        <>
            <MetaData title={`Gestion Publications - Linked`} index="false" />
            <div className='button-div'>
                <Modal
                    title={state.labelTitre}
                    modalBody={
                        state.action != "delete" ? (
                            <FormUsers
                                action={state.action}
                                inputData={inputState}
                                setInputData={setInputState}
                                inputChange={handleChangeInput}
                                selectedUsers={selectedUsers}
                                roles={roles}
                                etablissements={etablissements}
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
                        configUser();
                    }}
                />
            </div>

            <p className="selected-values" style={{ right: `${rightSelected}px`, pointerEvents: `${pointerSelected}`, opacity: `${opacitySelected}` }}>
                {selectedUsers.length} catégorie{selectedUsers.length > 1 && "s"} sélectionnée{selectedUsers.length > 1 && "s"} :
                <span onClick={() => showModalDeleteAll(selectedUsers)}>
                    <Trash />
                </span>
            </p>
            {
                lottieShowContent
                    ?
                    <Player
                        ref={lottieRef} // set the ref to your class instance
                        autoplay={true}
                        loop={true}
                        controls={false}
                        src={lottiePlayer}
                        style={{ height: "300px", width: "300px" }}
                    ></Player>
                    :
                    <ReactTable
                        data={data}
                        columns={columns}
                        isResizable
                        defaultColumn={defaultColumn}
                        getRowProps={onRowClick}
                    />
            }
        </>
    )
}

export default Users