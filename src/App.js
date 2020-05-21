import React, { useState, useEffect } from "react";
import "./styles.css";
import usePagination from "./usePagination";
export default function App() {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [teacherclasses, setteacherclasses] = useState([
    { id: "ap001", name: "chris" },
    { id: "ap000", name: "allie" },
    { id: "ap002", name: "claire" },
    { id: "ap003", name: "michael" },
    { id: "ap004", name: "arsh" },
    { id: "ap005", name: "mohamed" },
    { id: "ap006", name: "sydney" },
    { id: "ap007", name: "ahmed" },
    { id: "ap008", name: "jean" },
    { id: "ap009", name: "jane" },
    { id: "ap010", name: "alan" },
    { id: "ap011", name: "jane" },
    { id: "ap012", name: "max" }
  ]);

  const [filteredClasses, setfilteredClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const changeClassPage = idx => {
    paginateClasses.jump(idx);
  };

  const nextClassPage = () => {
    paginateClasses.next();
  };

  const prevClassPage = () => {
    paginateClasses.prev();
  };

  const handleClassSelectAll = e => {
    if (selectedClasses.length === teacherclasses.length) {
      setSelectedClasses([]);
    } else {
      setSelectedClasses(() => {
        return teacherclasses.map(_class => _class.id);
      });
    }
  };

  const handleClassSelect = (selectedClass, e) => {
    var classes = [...selectedClasses];

    var index = classes.indexOf(selectedClass.id);

    if (index === -1) {
      classes.push(selectedClass.id);
    } else {
      classes.splice(index, 1);
    }

    setSelectedClasses(classes);
  };

  const handleChange = e => {
    paginateClasses.jump(1);
    setSearchTerm(e.currentTarget.value);
  };

  const paginateClasses = usePagination(filteredClasses, 10);

  useEffect(() => {
    var myteacherClasses = [...teacherclasses];
    var newTeacherClasses = myteacherClasses.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setfilteredClasses(newTeacherClasses);
  }, [searchTerm, teacherclasses]);

  return (
    <div className="App">
      <input type="text" onChange={handleChange} />
      <h3 className="w3-center">People</h3>
      <div className="w3-card-4 w3-animate-zoom w3-round">
        <div className="w3-bar w3-border w3-round w3-center w3-margin-bottom">
          <button onClick={prevClassPage} className="w3-button w3-border">
            &laquo;
          </button>
          {filteredClasses.map((_class, idx) =>
            idx % 10 === 0 && idx < 50 ? (
              <button
                key={"page" + _class.id}
                onClick={() => changeClassPage(idx / 10 + 1)}
                className="w3-button lendhand w3-border"
              >
                {idx / 10 + 1}
              </button>
            ) : null
          )}
          <button onClick={nextClassPage} className="w3-button w3-border">
            &raquo;
          </button>
        </div>
        <ul className="w3-ul w3-hoverable lendhand">
          <li className="w3-green" onClick={handleClassSelectAll}>
            <input
              onChange={handleClassSelectAll}
              className="w3-check"
              type="checkbox"
              checked={selectedClasses.length === teacherclasses.length}
            />
            <label className="w3-center">Select All</label>
          </li>

          {paginateClasses.currentData().map(_class => (
            <React.Fragment key={"class" + _class.id}>
              <li
                onClick={() => {
                  handleClassSelect(_class);
                }}
              >
                <input
                  key={"input" + _class.id}
                  onChange={() => {
                    handleClassSelect(_class);
                  }}
                  className="w3-check"
                  type="checkbox"
                  checked={selectedClasses.includes(_class.id)}
                />
                <label key={"label" + _class.id}>{_class.name}</label>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
