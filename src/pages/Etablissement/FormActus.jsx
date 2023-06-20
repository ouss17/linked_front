import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import CreSelect from "react-select/creatable";
import { AddCategory } from "../../Redux/actions/CategoryAction";

const FormActus = ({ action, inputData, inputChange, selectedActus, allCategories, setInputData,
  error }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [canFilter, setCanFilter] = useState(false);
  const [selected, setSelected] = React.useState([]);



  const emptySelected = () => {
    setSelected([]);
  };


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

  const dispatch = useDispatch();


  useMemo(() => {
    if (allCategories.length > 0) {
      setOptions(allCategories.map((categ) => {
        return {
          value: `apiLinked/categories/${categ.idCategory}`,
          label: categ.nameCategory,
        };
      }))
    }
  }, [allCategories.length])

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    dispatch(AddCategory({
      nameCategory: inputValue.toLowerCase()
        .charAt(0)
        .toUpperCase() +
        inputValue.slice(1).toLowerCase(),
      commentCategory: "",
    })).then((res) => {
      setTimeout(() => {
        setIsLoading(false);

        setSelected(`apiLinked/categories/${res.idDataCategory}`);
      }, 1000);
    })
  };
  const { titleActus, contentActus, mediaActus, activeActus, idCategory } =
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
    titleActus: false,
    contentActus: false,
    mediaActus: false,
    activeActus: false,
    idCategory: false,
  });

  const handleChange = (e) => {
    setSelected(e.value);
    setInputData({ ...inputData, idCategory: e.value })
  };

  if (action === 'deleteAll') {
    return (
      <div className="form-content">
        <ul>
          {selectedActus.map(actu => (
            <li style={{ display: "flex", justifyContent: "space-between" }} key={actu.idActus}>
              <div style={{ marginRight: "5px", marginBottom: "10px" }}>
                <p>{actu.titleActus.length > 20 ? actu.titleActus.substring(0, 20) + "..." : actu.titleActus}</p>
                <input
                  type="media"
                  id="mediaCategor"
                  readOnly
                  autoComplete="off"
                  style={{
                    background: "none",
                    pointerEvents: "none",
                  }}
                  value={actu.mediaActus}
                />
              </div>
              <div style={{ marginRight: "5px" }}>{actu.contentActus.length > 20 ? actu.contentActus.substring(0, 20) + "..." : actu.contentActus}</div>
            </li>
          ))}

        </ul>
      </div>
    )
  } else {
    return (
      <div className="form-content">
        <label htmlFor="titleActus">Label: </label>
        <div
          className={`form-elem w-100 ${showErrorMessage("titleActus") ? "input-error" : ""
            }`}
          isFocus={focus.titleActus}
          focusColor="var(--main-color)"
        >
          <input
            type="text"
            id="titleActus"
            autoComplete="off"
            // className="form-elem"
            name="titleActus"
            onFocus={() => setFocus({ ...focus, titleActus: true })}
            onBlur={() => setFocus({ ...focus, titleActus: false })}
            onChange={inputChange}
            value={titleActus}
          />
        </div>
        <label htmlFor="contentActus">Description: </label>
        <div className={`form-elem w-100 ${showErrorMessage("contentActus") ? "input-error" : ""
          }`}
          isFocus={focus.contentActus}
          focusColor="var(--main-color)">
          <input
            type="text"
            id="contentActus"
            autoComplete="off"
            // className="form-elem"
            name="contentActus"
            onFocus={() => setFocus({ ...focus, contentActus: true })}
            onBlur={() => setFocus({ ...focus, contentActus: false })}
            onChange={inputChange}
            value={contentActus}
          />
        </div>
        <label htmlFor="mediaActus">Média:</label>
        <div className="form-elem w-100" focusColor="var(--main-color)" isFocus={focus.mediaActus}>
          <input
            type="media"
            id="mediaActus"
            autoComplete="off"
            // className="form-elem"
            name="mediaActus"
            onFocus={() => setFocus({ ...focus, mediaActus: true })}
            onBlur={() => setFocus({ ...focus, mediaActus: false })}
            onChange={inputChange}
            value={mediaActus}
          />
        </div>
        <label htmlFor="idCategorie">Catégorie</label>
        <CreSelect
          isClearable
          isDisabled={isLoading}
          isLoading={isLoading}
          onCreateOption={handleCreate}
          focusColor="var(--main-color)"
          onFocus={() => setFocus({ ...focus, idCategorie: true })}
          onBlur={() => setFocus({ ...focus, idCategorie: false })}
          onChange={handleChange}
          formatCreateLabel={userInput => `Ajouter "${userInput}"`}
          className="w-100 selectChevron"
          options={options}
          name="idCategorie"
          // defaultValue={selected}
          value={selected.value}
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

export default FormActus;
