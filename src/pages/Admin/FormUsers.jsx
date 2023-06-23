import React, { useEffect, useMemo, useState } from "react";
import CreSelect from "react-select";

const FormUsers = ({ action, inputData, inputChange, selectedActus, roles, etablissements, setInputData,
    error }) => {

    const [options, setOptions] = useState([]);
    const [selected, setSelected] = React.useState([]);

    const [optionsEtablissement, setOptionsEtablissement] = useState([]);
    const [selectedEtablissement, setSelectedEtablissement] = React.useState([]);


    const style = {
        option: (styles, state) => ({
            ...styles,
            backgroundColor: state.isSelected ? "var(--main-color)" : "none",
            "&:hover": {
                color: "#FFF",
                backgroundColor: "var(--main-color)",
            },
        }),
        control: (styles, state) => ({
            ...styles,
            boxShadow: "none",
            borderColor: state.isFocused ? "var(--main-color)" : "#CED4DA",
            "&:hover": {
                borderColor: state.isFocused ? "var(--main-color)" : "#CED4DA",
            },
        }),
    };

    useEffect(() => {
        if (roles.length > 0) {
            setOptions(roles.map((role) => {
                return {
                    value: `apiLinked/roles/${role.idRole}`,
                    label: role.nameRole == "ROLE_ADMIN" ? "Admin" : role.nameRole == "ROLE_GERANT" ? "Gérant" : role.nameRole == "ROLE_USER" && "Utilisateur",
                };
            }))
        }
    }, [roles.length])

    useEffect(() => {
        if (etablissements.length > 0) {
            setOptionsEtablissement(etablissements.map((etablissement) => {
                return {
                    value: `apiLinked/etablissements/${etablissement.idEtablissement}`,
                    label: etablissement.nameEtablissement,
                };
            }))
        }
    }, [etablissements.length])

    const { nameUser, username, idRole, } =
        inputData;

    // const ovh = useOvhStorageCredentials();

    const showErrorMessage = (name) => {
        if (error.length > 0) {
            let index = error.findIndex((obj) => obj.name == name);
            let current = error[index];
            if (current) {
                return current;
            }
        }
        return null;
    };

    const [focus, setFocus] = useState({
        nameUser: false,
        username: false,
        idRole: false,
        idEtablissement: false,
    });

    const handleChange = (e) => {
        setSelected(e.value);
        setInputData({ ...inputData, idRole: e.value })
    };

    const handleChangeEtablissement = (e) => {
        setSelectedEtablissement(e.value);
        setInputData({ ...inputData, idEtablissement: e.value })
    };

    if (action === 'deleteAll') {
        return (
            <div className="form-content">
                <ul>
                    {selectedActus.map(actu => (
                        <li style={{ display: "flex", justifyContent: "space-between" }} key={actu.idActus}>
                            <div style={{ marginRight: "5px", marginBottom: "10px" }}>
                                <p>{actu.nameUser.length > 20 ? actu.nameUser.substring(0, 20) + "..." : actu.nameUser}</p>
                                <input
                                    type="media"
                                    id="mediaCategor"
                                    readOnly
                                    autoComplete="off"
                                    style={{
                                        background: "none",
                                        pointerEvents: "none",
                                    }}
                                    value={actu.idRole}
                                />
                            </div>
                            <div style={{ marginRight: "5px" }}>{actu.username.length > 20 ? actu.username.substring(0, 20) + "..." : actu.username}</div>
                        </li>
                    ))}

                </ul>
            </div>
        )
    } else {
        return (
            <div className="form-content">
                <label htmlFor="nameUser">Pseudo: </label>
                <div
                    className={`form-elem w-100 ${showErrorMessage("nameUser") ? "input-error" : ""
                        }`}
                    isFocus={focus.nameUser}
                    focusColor="var(--main-color)"
                >
                    <input
                        type="text"
                        id="nameUser"
                        autoComplete="off"
                        // className="form-elem"
                        name="nameUser"
                        onFocus={() => setFocus({ ...focus, nameUser: true })}
                        onBlur={() => setFocus({ ...focus, nameUser: false })}
                        onChange={inputChange}
                        value={nameUser}
                    />
                </div>
                <label htmlFor="username">Email: </label>
                <div className={`form-elem w-100 ${showErrorMessage("username") ? "input-error" : ""
                    }`}
                    isFocus={focus.username}
                    focusColor="var(--main-color)">
                    <input
                        type="text"
                        id="username"
                        autoComplete="off"
                        // className="form-elem"
                        name="username"
                        onFocus={() => setFocus({ ...focus, username: true })}
                        onBlur={() => setFocus({ ...focus, username: false })}
                        onChange={inputChange}
                        value={username}
                    />
                </div>

                <label htmlFor="idRole">Rôle</label>
                <CreSelect
                    focusColor="var(--main-color)"
                    onFocus={() => setFocus({ ...focus, idRole: true })}
                    onBlur={() => setFocus({ ...focus, idRole: false })}
                    onChange={handleChange}
                    className="w-100 selectChevron"
                    options={options}
                    name="idRole"
                    // defaultValue={selected}
                    value={selected.value}
                    isMulti={false}
                    styles={style}
                />
                <div style={{ margin: "25px" }}></div>
                <label htmlFor="idEtablissement">Etablissement</label>
                <CreSelect
                    focusColor="var(--main-color)"
                    onFocus={() => setFocus({ ...focus, idEtablissement: true })}
                    onBlur={() => setFocus({ ...focus, idEtablissement: false })}
                    onChange={handleChangeEtablissement}
                    className="w-100 selectChevron"
                    options={optionsEtablissement}
                    name="idEtablissement"
                    // defaultValue={selected}
                    value={selectedEtablissement.value}
                    isMulti={false}
                    styles={style}
                />
                <div style={{ margin: "25px" }}></div>
                <style jsx="true">
                    {`
            border-radius: 5px;
            border: 1px solid
              ${(props) => (props.isFocus ? props.focusColor : "rgb(0 0 0 / 20%)")};
            padding: 10px 16px;
            display: flex;
            align-items: center;
            label {
              margin: 0 10px;
              margin-left: 10px;
            }
            label:first-of-type {
              margin-left: 0;
            }

            input {
              width: 100%;
              background-media: transparent;
            }
          `}
                </style>
            </div>
        );
    }
};

export default FormUsers;
